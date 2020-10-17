import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import startCase from 'lodash/startCase';
import isUndefined from 'lodash/isUndefined';
import DynamicTypeInput from 'components/generic/dynamic-type-input';
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
    width: '100%'
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
          <DynamicTypeInput
            key={k}
            dataType={pluginConfig[k]}
            onChange={(v) => update({ [k]: v })}
            fieldClass={classes.maxWidthInput}
            value={config[k]}
            fieldKey={k}
          />
        ))
      }
    </div>
  );
};
