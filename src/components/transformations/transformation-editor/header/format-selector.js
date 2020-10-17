import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function FormatSelector(props) {
  return (
    <TextField
      variant="outlined"
      label={props.label}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      select
    >
    {
      props.supportedFormats.map(f => (
        <MenuItem key={f} value={f}>{f}</MenuItem>
      ))
    }
    </TextField>
  );
};
