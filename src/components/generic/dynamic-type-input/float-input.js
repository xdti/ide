import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import TextField from '@material-ui/core/TextField';

export default function FloatInput(props) {
  return (
    <TextField
      className={props.fieldClass}
      variant="outlined"
      type="number"
      label={`${startCase(props.fieldKey)} (float)`}
      value={props.value || ""}
      onChange={(e) => props.onChange(parseFloat(e.target.value))}
    />
  );
};
