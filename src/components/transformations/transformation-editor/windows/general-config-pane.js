import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import merge from 'lodash/merge';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import DataTypeSelector from 'components/generic/data-type-selector';
import DynamicTypeInput from 'components/generic/dynamic-type-input';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    overflowY: 'auto',
    '&>.MuiTextField-root': {
      width: '100%'
    },
    '&>*:not(:last-child)': {
      marginBottom: 20,
    }
  },
  configForm: {
    width: '100%',
    display: 'flex',
    height: '40pt',
    '& .MuiInputBase-root': {
      height: '40pt'
    },
    '&>*:not(:last-child)': {
      marginRight: 10,
    }
  },
  maxWidthInput: {
    flexGrow: 1
  }
}));

export default function GeneralConfigPane(props) {
  const classes = useStyles();
  const config = props.data || {};
  const [newConfigKey, setNewConfigKey] = React.useState("");
  const [newConfigDataType, setNewConfigDataType] = React.useState({ dataType: props.configTypes.defaultDataType });

  const update = (updates) => props.update(props.windowId, "config", updates);
  const updateSettings = (key, updates) => props.update(key, "generalConfig", updates);

  const addNewConfig = () => {
    updateSettings(newConfigKey, newConfigDataType)
    setNewConfigKey("");
    setNewConfigDataType({ dataType: props.configTypes.defaultDataType });
  }

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        label="Template Selector"
        value={config.templateSelector || ""}
        onChange={(e) => update({ templateSelector: e.target.value })}
      />
      {
        Object.keys(props.settings).map(k => (
          <div className={classes.configForm} key={k}>
            <Button
            variant="contained"
            color="secondary"
            title="Delete config"
            onClick={(e) => {
              update({ [k]: null });
              updateSettings(k, null)
            }}
            >
              <Delete />
            </Button>
            <DynamicTypeInput
              dataType={props.settings[k]}
              onChange={(v) => update({ [k]: v })}
              fieldClass={classes.maxWidthInput}
              value={config[k]}
              fieldKey={k}
            />
          </div>
        ))
      }
      <div className={classes.configForm}>
        <TextField
          className={classes.maxWidthInput}
          variant="outlined"
          label="Config Key"
          value={newConfigKey}
          onChange={(e) => setNewConfigKey(e.target.value)}
        />
        <DataTypeSelector
          onChange={(dataType) => setNewConfigDataType(merge({}, newConfigDataType, dataType))}
          selectedDataType={newConfigDataType.dataType}
          defaultListItem={props.configTypes.defaultDataType}
          listItemType={newConfigDataType.listItemType}
          dataTypes={props.configTypes.dataTypes}
        />
        <Button
          variant="contained"
          color="primary"
          title="Add config"
          onClick={addNewConfig}>
          <Add />
        </Button>
      </div>
    </div>
  );
};
