import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WindowSelector from './window-selector';
import VariablePane from './variable-pane';
import TemplatePane from './template-pane';
import ConfigPane from './config-pane';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexShrink: 0,
    width: '77vw',
    flexDirection: 'column'
  }
}));

export default function Windows(props) {
  const classes = useStyles();
  const currentWindow = props.windows[props.selectedWindow];

  const windowPaneFactories = {
    var: (id) => (
      <VariablePane
        data={props.transformation.variables[id]}
        windowId={id}
        update={props.update}
        varTypes={props.varTypes}
      />
    ),
    template: (id) => (
      <TemplatePane
        data={props.transformation.templates[id]}
        windowId={id}
        update={props.update}
      />
    ),
    config: (id) => (
      <ConfigPane
        data={props.transformation.config[id]}
        pluginVersion={props.transformation.plugins[id]}
        windowId={id}
        update={props.update}
      />
    )
  }

  return (
    <div className={classes.container}>
      <WindowSelector
        selectedWindow={props.selectedWindow}
        windows={props.windows}
        selectWindow={props.selectWindow}
        closeWindow={props.closeWindow}
        transformation={props.transformation}
      />
      {
        currentWindow ? windowPaneFactories[currentWindow.type](props.selectedWindow, currentWindow) : ""
      }
    </div>
  );
};
