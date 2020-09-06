import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import isUndefined from 'lodash/isUndefined';
import TextField from '@material-ui/core/TextField';
import dal from 'dal';

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
    '&>*:not(:last-child)': {
      marginRight: 10,
    }
  },
  maxWidthInput: {
    flexGrow: 1
  }
}));

export default function PluginConfigPane(props) {
  if (isUndefined(props.pluginVersion)){
    props.closeSelf();
  }
  const classes = useStyles();
  const config = props.data || {};
  const [pluginConfig, setPluginConfig] = React.useState({});
  const [error, setError] = React.useState(null);

  const update = (updates) => props.update(props.windowId, "config", updates);

  React.useEffect(() => {
    dal.plugins.getPluginConfig(props.windowId, props.pluginVersion)
      .then(setPluginConfig)
      .catch(setError)
  }, [props.pluginVersion, props.windowId]);

  return (
    <div className={classes.container}>
      {
        Object.entries(pluginConfig).map(([k, type]) => (
          <TextField
            key={k}
            variant="outlined"
            label={startCase(k)}
            value={config[k]}
            onChange={(e) => update({ [k]: e.target.value })}
          />
        ))
      }
    </div>
  );
};