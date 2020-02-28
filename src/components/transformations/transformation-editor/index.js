import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import dal from 'dal';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1
  }
}));

export default function TransformationEditor(props) {
  const classes = useStyles();
  const [transformation, setTransformation] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    dal.transformations.get(props.transformationId).then(setTransformation).catch(setError)
  }, [props.transformationId]);

  return (
    <div className={classes.container}>
      <AppBar position="relative" color="default">
        <ToolBar>
          <Typography variant="h6">{transformation.name}</Typography>
        </ToolBar>
      </AppBar>
    </div>
  );
};
