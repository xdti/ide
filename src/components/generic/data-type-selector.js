import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  dataTypeInput: {
    width: '150pt'
  }
}));

export default function DataTypeSelector(props) {
  const classes = useStyles();

  return (
    <>
      <TextField
        variant="outlined"
        label="Data Type"
        value={props.selectedDataType}
        onChange={(e) => {
          let updates = { dataType: e.target.value };
          if (e.target.value === 'list' && !props.listItemType){
            updates.listItemType = props.defaultListItem
          }
          if (e.target.value !== 'list'){
            updates.listItemType = null
          }
          props.onChange(updates)
        }}
        select
        className={classes.dataTypeInput}
      >
        {
          props.dataTypes.map(o => (
            <MenuItem key={o} value={o}>{o}</MenuItem>
          ))
        }
      </TextField>
      {
        props.selectedDataType === 'list' ? (
          <TextField
            variant="outlined"
            label="List Item Type"
            value={props.listItemType}
            onChange={(e) => props.onChange({ listItemType: e.target.value })}
            select
            className={classes.dataTypeInput}
          >
            {
              props.dataTypes.filter(o => o !== 'list').map(o => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))
            }
          </TextField>
        ) : ""
      }
    </>
  );
};
