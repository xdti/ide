import React from 'react';
import mergeWith from 'lodash/mergeWith';
import omitByDeep from 'helpers/omitByDeep';
import isNull from 'lodash/isNull';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { makeStyles } from '@material-ui/core/styles';
import variableCompleter from 'completers/variables'
import pluginCompleter from 'completers/plugins'
import configCompleter from 'completers/config'
import templateCompleter from 'completers/templates'
import Header from './header';
import ObjectSelector from './object-selector';
import Windows from './windows';
import VersionControl from './version-control';
import Footer from './footer';
import dal from 'dal';
import 'ace-builds/webpack-resolver';
import langTools from "ace-builds/src-noconflict/ext-language_tools";

const merge = (...args) => mergeWith.apply(null, args.concat((val, src) => {
  if (Array.isArray(val)){
    return src;
  }
}));

/* TODO:
   1. Add version control
    c. undo button for each diff
    f. resolve conflicts
   2. Add editor tooltips
   3. Add input validation
*/
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden'
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'auto'
  }
}));

export default function TransformationEditor(props) {
  const classes = useStyles();
  const [transformation, setTransformation] = React.useState({});
  const [versions, setVersions] = React.useState([]);
  const [stagingArea, setStagingArea] = React.useState({});
  const [stagedTransformation, setStagedTransformation] = React.useState({});
  const [windows, setWindows] = React.useState({});
  const [selectedWindow, setSelectedWindow] = React.useState(null);
  const [previouslySelectedWindow, setPreviouslySelectedWindow] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [varTypes, setVarTypes] = React.useState([]);
  const [configTypes, setConfigTypes] = React.useState([]);
  const [showVersionControl, setShowVersionControl] = React.useState(false);
  const [supportedFormats, setSupportedFormats] = React.useState([]);

  React.useEffect(() => {
    langTools.addCompleter(variableCompleter(stagedTransformation.variables));
    langTools.addCompleter(pluginCompleter(stagedTransformation.plugins));
    langTools.addCompleter(configCompleter(stagedTransformation.config));
    langTools.addCompleter(templateCompleter(stagedTransformation.templates, stagedTransformation.output));
    return () => langTools.setCompleters([
      langTools.snippetCompleter,
      langTools.textCompleter,
      langTools.keyWordCompleter
    ]);
  }, [stagedTransformation]);

  const addWindow = (id, type) => {
    let newWindows = merge({}, windows, { [id]: { type } });
    setWindows(newWindows);
    setSelectedWindow(id);
  }

  const closeWindow = (id) => {
    let newWindows = cloneDeep(windows);
    delete newWindows[id];
    if (id === selectedWindow){
      if (previouslySelectedWindow in newWindows){
        setSelectedWindow(previouslySelectedWindow);
      } else {
        setSelectedWindow(Object.keys(newWindows)[0]);
      }
    }
    setWindows(newWindows);
  }
  const selectWindow = (id) => {
    setPreviouslySelectedWindow(selectedWindow);
    setSelectedWindow(id);
  }
  const updateStagingArea = (updates) => {
    let newStagingArea = merge({}, stagingArea, updates);
    setStagingArea(newStagingArea);
  }
  const stagingUpdaters = {
    var: (updates) => updateStagingArea({ variables: updates }),
    template: (updates) => updateStagingArea({ templates: updates }),
    plugin: (updates) => updateStagingArea({ plugins: updates }),
    config: (updates) => updateStagingArea({ config: updates }),
    generalConfig: (updates) => updateStagingArea({ generalConfig: updates }),
    metadata: (updates) => updateStagingArea(updates)
  }
  const commit = async (message) => {
    let newVersion = await dal.transformations.commit(stagedTransformation, message);
    versions.push(newVersion);
    setVersions(versions);
    setTransformation(newVersion);
    setStagingArea({});
  }
  const pull = async () => {
    let newVersions = await dal.transformations.pull(props.transformationId, transformation.version);
    setVersions(versions.concat(newVersions));
    setTransformation(versions[versions.length - 1]);
  }

  React.useEffect(() => {
    let merged = merge({}, transformation, stagingArea);
    let newStagedTransformation = omitByDeep(merged, isNull);
    setStagedTransformation(newStagedTransformation);
  }, [transformation, stagingArea]);

  React.useEffect(() => {
    dal.formats.getVarTypesByFormat(transformation.input).then(setVarTypes).catch(setError)
  }, [transformation.input]);

  React.useEffect(() => {
    dal.transformations.getConfigTypes().then(setConfigTypes).catch(setError)
  }, [transformation.input]);

  React.useEffect(() => {
    dal.formats.getSupprotedFormats().then(setSupportedFormats).catch(setError)
  }, [transformation.input]);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(t => {
      setTransformation(t.versions[t.versions.length - 1]);
      setVersions(t.versions);
    }).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <Header
        name={stagedTransformation.name}
        description={stagedTransformation.description}
        supportedFormats={supportedFormats}
        input={stagedTransformation.input}
        output={stagedTransformation.output}
        metadata={stagedTransformation.metadata}
        owner={stagedTransformation.owner}
        update={(id, type, updates) => {
          stagingUpdaters[type]({[id]: updates})
        }}
      />
      <div className={classes.content}>
        <ObjectSelector
          transformation={stagedTransformation}
          updaters={stagingUpdaters}
          select={addWindow}
          varTypes={varTypes}
        />
        <Windows
          windows={windows}
          selectedWindow={selectedWindow}
          selectWindow={selectWindow}
          closeWindow={closeWindow}
          update={(id, type, updates) => {
            stagingUpdaters[type]({[id]: updates})
          }}
          transformation={stagedTransformation}
          varTypes={varTypes}
          configTypes={configTypes}
          small={showVersionControl}
        />
        {
          showVersionControl ? (
            <VersionControl close={() => setShowVersionControl(false)} versions={versions} stagingArea={stagingArea} transformation={transformation}/>
          ) : ""
        }
      </div>
      <Footer
        showVersionControl={() => setShowVersionControl(!showVersionControl)}
        commit={commit}
        pull={pull}
        canCommit={!isEqual(transformation, stagedTransformation)}
      />
    </div>
  );
};
