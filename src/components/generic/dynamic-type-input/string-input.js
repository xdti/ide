import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import TextField from '@material-ui/core/TextField';

export default function StringInput(props) {
  return (
    <TextField
      className={props.fieldClass}
      variant="outlined"
      label={startCase(props.fieldKey)}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
