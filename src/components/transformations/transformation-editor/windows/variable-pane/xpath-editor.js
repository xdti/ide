import React from 'react';
import DataTypeSelector from 'components/generic/data-type-selector';
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
      <DataTypeSelector
        onChange={(updates) => props.update(updates)}
        selectedDataType={props.data.dataType}
        defaultListItem={props.config.defaultListItem}
        listItemType={props.data.listItemType}
        dataTypes={props.config.dataTypes}
      />
    </div>
  );
};
