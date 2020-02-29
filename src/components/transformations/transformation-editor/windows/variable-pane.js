import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt'
  }
}));

export default function VariablePane(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField variant="outlined" label="Name" value={props.data.name} onChange={(e) => props.update(e.target.value)}/>
    </div>
  );
};
