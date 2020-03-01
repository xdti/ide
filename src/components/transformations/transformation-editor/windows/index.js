import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WindowSelector from './window-selector';
import VariablePane from './variable-pane';

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
    var: (id, w) => (
      <VariablePane
        data={w.data}
        windowId={id}
        update={props.update}
        varTypes={props.varTypes}
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
      />
      {
        currentWindow ? windowPaneFactories[currentWindow.type](props.selectedWindow, currentWindow) : ""
      }
    </div>
  );
};
