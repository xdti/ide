import React from 'react';
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
      props.data.name === "general" ? (
        <GeneralConfig
          data={props.data}
          windowId={props.id}
          update={update}
        />
      ) : (
        <PluginConfig
          data={props.data}
          windowId={props.id}
          update={update}
        />
      )
    }
    </>
  );
};
