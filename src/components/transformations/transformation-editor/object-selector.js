import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  menu: {
    flexGrow: 1
  },
  toolbar: {
    padding: 0
  }
}));

export default function ObjectSelector() {
  const classes = useStyles();
  const [selectedTab, setTab] = React.useState('vars');

  return (
    <div className={classes.container}>
      <AppBar position="relative" color="default" className={classes.menu}>
        <ToolBar className={classes.toolbar}>
          <Tabs
            aria-label="object types"
            textColor="inherit"
            variant="scrollable"
            orientation="vertical"
            value={selectedTab}
            onChange={(e, v) => setTab(v)}
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
    </div>
  );
};
