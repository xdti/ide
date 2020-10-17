import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function BooleanInput(props) {
  return (
    <FormControlLabel
      className={props.fieldClass}
      control={
        <Checkbox
          color="primary"
          checked={props.value || false}
          onChange={(e) => props.onChange(e.target.checked)}
          name={props.fieldKey}
        />}
      label={startCase(props.fieldKey)}
    />
  );
};
