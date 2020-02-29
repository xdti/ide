import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dal from 'dal';
import Header from './header';
import ObjectSelector from './object-selector';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  content: {
    display: 'flex',
    flexGrow: 1
  }
}));

export default function TransformationEditor(props) {
  const classes = useStyles();
  const [transformation, setTransformation] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(setTransformation).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <Header name={transformation.name} />
      <div className={classes.content}>
        <ObjectSelector />
        <div className={classes.editors}>
        </div>
      </div>
    </div>
  );
};
