import React from 'react';
import mergeWith from 'lodash/mergeWith';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import { makeStyles } from '@material-ui/core/styles';
import dal from 'dal';
import Header from './header';
import ObjectSelector from './object-selector';
import Windows from './windows';

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

  const addWindow = (id, obj) => {
    let newWindows = mergeWith({}, windows, { [id]: obj });
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
    let newStagingArea = mergeWith({}, stagingArea, updates);
    setStagingArea(newStagingArea);
  }

  React.useEffect(() => {
    let newStagedTransformation = mergeWith({}, transformation, stagingArea);
    setStagedTransformation(newStagedTransformation);
  }, [transformation, stagingArea]);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(setTransformation).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <Header name={transformation.name} />
      <div className={classes.content}>
        <ObjectSelector transformation={stagedTransformation} update={updateStagingArea} select={addWindow}/>
        <Windows
          windows={windows}
          selectedWindow={selectedWindow}
          selectWindow={selectWindow}
          closeWindow={closeWindow}
        />
      </div>
    </div>
  );
};
