import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  pathEditor: {
    display: 'flex',
    width: '100%',
    '&>.MuiTextField-root:not(:last-child)': {
      marginRight: 10
    }
  },
  pathValueInput: {
    width: '100%'
  },
  dataTypeInput: {
    width: '150pt'
  }
}));

export default function XPathEditor(props) {
  const classes = useStyles();

  return (
    <div className={classes.pathEditor}>
      <TextField
        variant="outlined"
        label="XPath"
        value={props.data.value}
        onChange={(e) => props.update({ value: e.target.value })}
        className={classes.pathValueInput}
      />
      <TextField
        variant="outlined"
        label="Data Type"
        value={props.data.dataType}
        onChange={(e) => {
          let updates = { dataType: e.target.value };
          if (e.target.value === 'list' && !props.data.listItemType){
            updates.listItemType = 'string'
          }
          if (e.target.value !== 'list'){
            updates.listItemType = null
          }
          props.update(updates)
        }}
        select
        className={classes.dataTypeInput}
      >
        {
          props.config.dataTypes.map(o => (
            <MenuItem key={o} value={o}>{o}</MenuItem>
          ))
        }
      </TextField>
      {
        props.data.dataType === 'list' ? (
          <TextField
            variant="outlined"
            label="List Item Type"
            value={props.data.listItemType}
            onChange={(e) => props.update({ listItemType: e.target.value })}
            select
            className={classes.dataTypeInput}
          >
            {
              props.config.dataTypes.filter(o => o !== 'list').map(o => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))
            }
          </TextField>
        ) : ""
      }
    </div>
  );
};
