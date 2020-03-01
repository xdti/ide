import React from 'react';
import merge from 'lodash/merge';
import omitByDeep from 'helpers/omitByDeep';
import isNull from 'lodash/isNull';
import cloneDeep from 'lodash/cloneDeep';
import { makeStyles } from '@material-ui/core/styles';
import dal from 'dal';
import Header from './header';
import ObjectSelector from './object-selector';
import Windows from './windows';
/* TODO:
   1. Make variable list re-orderable
   2. Add editor tooltips
   3. Make vars deletable
   4. Add input validation
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

  const addWindow = (id, type, data) => {
    let newWindows = merge({}, windows, { [id]: { type, data } });
    setWindows(newWindows);
    setSelectedWindow(id);
  }
  const updateWindow = (id, updates) => {
    let newWindows = merge({}, windows, { [id]: { data: updates }});
    setWindows(newWindows);
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
    var: (id, updates) => updateStagingArea({ variables: { [id]: updates }})
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
          update={(id, type, updates) => {
            updateWindow(id, updates)
            stagingUpdaters[type](id, updates)
          }}
          varTypes={varTypes}
        />
      </div>
    </div>
  );
};
