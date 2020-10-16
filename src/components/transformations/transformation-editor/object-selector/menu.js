import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 3,
    width: '8vw',
    '& .MuiTabs-root': {
      flexGrow: 1,
      '& .MuiButtonBase-root': {
        minWidth: 'unset',
        maxWidth: 'unset'
      }
    }
  },
  toolbar: {
    padding: 0
  }
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="default" className={classes.appBar}>
      <ToolBar className={classes.toolbar}>
        <Tabs
          aria-label="object types"
          textColor="inherit"
          variant="scrollable"
          orientation="vertical"
          value={props.objectType}
          onChange={(e, v) => props.setObjectType(v)}
          indicatorColor="primary"
        >
          <Tab
            label="Variables"
            id="vars-tab"
            aria-controls="nav-tabpanel-vars"
            value="vars"
          />
          <Tab
            label="Templates"
            id="templates-tab"
            aria-controls="nav-tabpanel-templates"
            value="templates"
          />
          <Tab
            label="Plugins"
            id="vars-tab"
            aria-controls="nav-tabpanel-vars"
            value="plugins"
          />
          <Tab
            label="Config"
            id="vars-tab"
            aria-controls="nav-tabpanel-configs"
            value="config"
          />
        </Tabs>
      </ToolBar>
    </AppBar>
  );
};
