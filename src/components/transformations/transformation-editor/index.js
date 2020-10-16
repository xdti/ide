import React from 'react';
import merge from 'lodash/merge';
import omitByDeep from 'helpers/omitByDeep';
import isNull from 'lodash/isNull';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
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
/* TODO:
   1. In plugin config pane, change input type according to config value type specified in plugin config
   2. In general config, allow to change config value type
   3. Add version control
    c. undo button for each diff
    d. commit new version
    e. pull new version
    f. resolve conflicts
   4. Edit transformation metadata
   5. Add editor tooltips
   6. Add input validation
*/
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
  const [showVersionControl, setShowVersionControl] = React.useState(false);

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
    config: (updates) => updateStagingArea({ config: updates })
  }

  React.useEffect(() => {
    let newStagedTransformation = omitByDeep(merge({}, transformation, stagingArea), isNull);
    setStagedTransformation(newStagedTransformation);
  }, [transformation, stagingArea]);

  React.useEffect(() => {
    dal.transformations.getVarTypesByInput(transformation.input).then(setVarTypes).catch(setError)
  }, [transformation.input]);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(t => {
      setTransformation(t.versions[t.versions.length - 1]);
      setVersions(t.versions);
    }).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <Header name={transformation.name} />
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
      />
    </div>
  );
};
