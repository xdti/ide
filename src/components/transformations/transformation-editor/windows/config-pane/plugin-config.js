import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
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

export default function PluginConfig(props) {
  const classes = useStyles();
  const config = props.data.values || {};
  const [pluginConfig, setPluginConfig] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    dal.plugins.getPluginConfig(props.data.name, props.data.version).then(setPluginConfig).catch(setError)
  }, [props.data.name, props.data.version]);

  return (
    <div className={classes.container}>
      {
        Object.entries(pluginConfig).map(([k, type]) => (
          <TextField
            variant="outlined"
            label={startCase(k)}
            value={config[k]}
            onChange={(e) => props.update({ [k]: e.target.value })}
          />
        ))
      }
    </div>
  );
};
