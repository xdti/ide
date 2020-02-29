import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import WindowSelector from './window-selector';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexShrink: 0,
    width: '77vw',
    alignItems: 'flex-start'
  }
}));

export default function Windows(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <WindowSelector
        selectedWindow={props.selectedWindow}
        windows={props.windows}
        selectWindow={props.selectWindow}
        closeWindow={props.closeWindow}
      />
    </div>
  );
};
