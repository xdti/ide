import React from 'react';
import merge from 'lodash/merge';
import omitByDeep from 'helpers/omitByDeep';
import isNull from 'lodash/isNull';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import { makeStyles } from '@material-ui/core/styles';
import dal from 'dal';
import Header from './header';
import ObjectSelector from './object-selector';
import Windows from './windows';
import 'ace-builds/webpack-resolver';
import langTools from "ace-builds/src-noconflict/ext-language_tools";
/* TODO:
   1. Add editor tooltips
   3. Add input validation
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
  const [stagingArea, setStagingArea] = React.useState({});
  const [stagedTransformation, setStagedTransformation] = React.useState({});
  const [windows, setWindows] = React.useState({});
  const [selectedWindow, setSelectedWindow] = React.useState(null);
  const [previouslySelectedWindow, setPreviouslySelectedWindow] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [varTypes, setVarTypes] = React.useState([]);

  React.useEffect(() => {
    langTools.addCompleter({
      name: 'variables-completer',
      identifierRegexps: [/[^\s]+/],
      getCompletions: (editor, session, pos, prefix, callback) => {
        let current = editor.container.id;
        let vars = sortBy(Object.values(stagedTransformation.variables || {}), ['order']);
        let varNames = vars.map(v => v.name);
        let isVar = varNames.includes(current);
        callback(
          null,
          varNames
            .filter(v => {
              return v.includes(prefix) && (!isVar || varNames.indexOf(v) < varNames.indexOf(current))
            })
            .map(value => ({ value, meta: "variable" }))
        );
      }
    });
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
  }, [transformation]);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(setTransformation).catch(setError)
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
          update={(id, type, updates) => stagingUpdaters[type]({[id]: updates})}
          transformation={stagedTransformation}
          varTypes={varTypes}
        />
      </div>
    </div>
  );
};
