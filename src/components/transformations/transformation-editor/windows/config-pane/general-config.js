import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
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
    '&>*:not(:last-child)': {
      marginRight: 10,
    }
  },
  maxWidthInput: {
    flexGrow: 1
  }
}));

export default function GeneralConfig(props) {
  const classes = useStyles();
  const config = props.data.values || {};
  const [newConfigKey, setNewConfigKey] = React.useState("");
  const [newConfigValue, setNewConfigValue] = React.useState("");

  const addNewConfig = () => {
    props.update({ [newConfigKey]: newConfigValue });
    setNewConfigKey("");
    setNewConfigValue("");
  }

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        label="Template Selector"
        value={config.templateSelector || ""}
        onChange={(e) => props.update({ templateSelector: e.target.value })}
      />
      {
        Object.keys(config).filter(k => k !== 'templateSelector').map(k => (
          <div className={classes.configForm} key={k}>
            <TextField
              className={classes.maxWidthInput}
              variant="outlined"
              label={capitalize(k)}
              value={config[k]}
              onChange={(e) => props.update({ [k]: e.target.value })}
            />
            <Button
              variant="contained"
              color="secondary"
              title="Delete config"
              onClick={(e) => props.update({ [k]: null })}
            >
              <Delete />
            </Button>
          </div>
        ))
      }
      <div className={classes.configForm}>
        <TextField
          variant="outlined"
          label="Config Key"
          value={newConfigKey}
          onChange={(e) => setNewConfigKey(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Config Value"
          value={newConfigValue}
          onChange={(e) => setNewConfigValue(e.target.value)}
          className={classes.maxWidthInput}
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
