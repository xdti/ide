import React from 'react';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import { makeStyles } from '@material-ui/core/styles';
import dal from 'dal';
import Header from './header';
import ObjectSelector from './object-selector';

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
  const [error, setError] = React.useState(null);

  const updateStagingArea = (updates) => {
    let newStagingArea = mergeWith({}, stagingArea, updates, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });
    setStagingArea(newStagingArea);
  }

  React.useEffect(() => {
    let newStagedTransformation = mergeWith({}, transformation, stagingArea, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    })
    setStagedTransformation(newStagedTransformation);
  }, [transformation, stagingArea]);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(setTransformation).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <Header name={transformation.name} />
      <div className={classes.content}>
        <ObjectSelector transformation={stagedTransformation} update={updateStagingArea}/>
        <div className={classes.editors}>
        </div>
      </div>
    </div>
  );
};
