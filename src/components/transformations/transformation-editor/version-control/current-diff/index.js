import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import calculateDiff from 'helpers/calculateDiff';
import Diff from './diff';

const useStyles = makeStyles(theme => ({
  container: {
    height: '50%',
    overflow: 'auto',
    padding: '0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  }
}));

/*
TODO:
  2. Calculate diff for every part of transformation
  4. Add undo button
*/

export default function CurrentDiff(props) {
  const classes = useStyles();

  const [diff, setDiff] = React.useState([]);

  React.useEffect(() => {
    let stagingArea = props.stagingArea;
    let transformation = props.transformation;

    setDiff(calculateDiff(stagingArea, transformation));
  }, [props.stagingArea, props.transformation]);


  return (
    <div className={classes.container}>
     {
       diff.map((d) => <Diff key={d.id} diff={d} />)
     }
    </div>
  );
};
