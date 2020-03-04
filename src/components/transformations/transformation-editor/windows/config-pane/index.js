import React from 'react';
import isUndefined from 'lodash/isUndefined';
import { makeStyles } from '@material-ui/core/styles';
import GeneralConfig from './general-config';
import PluginConfig from './plugin-config';

const useStyles = makeStyles(theme => ({

}));

export default function ConfigPane(props) {
  const classes = useStyles();
  const update = (updates) => props.update(props.windowId, "config", updates);

  return (
    <>
    {
      isUndefined(props.pluginVersion) ? (
        <GeneralConfig
          data={props.data}
          config={props.config}
          windowId={props.windowId}
          update={update}
        />
      ) : (
        <PluginConfig
          data={props.data}
          windowId={props.windowId}
          update={update}
          pluginVersion={props.pluginVersion}
        />
      )
    }
    </>
  );
};
