import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    '& .MuiTextField-root': {
      width: '100%',
      '&:not(:last-child)': {
        marginBottom: 20
      }
    }
  }
}));

export default function VariablePane(props) {
  const classes = useStyles();
  const update = (updates) => props.update(props.windowId, "var", updates)

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        label="Name"
        value={props.data.name}
        onChange={(e) => update({ name: e.target.value })}
      />
      <TextField
        variant="outlined"
        label="Type"
        value={props.data.type}
        onChange={(e) => update({ type: e.target.value })}
        select
      >
        {
          props.varTypes.options.map(o => (
            <MenuItem key={o} value={o}>{o}</MenuItem>
          ))
        }
      </TextField>
    </div>
  );
};
