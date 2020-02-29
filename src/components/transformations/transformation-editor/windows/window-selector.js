import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 1,
    height: '55pt !important',
    width: '77vw',
  },
  toolbar: {
    padding: 0,
    width: '77vw',
  },
  tabs: {
    minHeight: 'inherit',
    height: '55pt',
    width: '77vw',
    '& .MuiTabs-scroller': {
      display: 'flex'
    }
  },
  closeButton: {
    position: 'absolute',
    right: 0
  }
}));

export default function WindowSelector(props) {
  const classes = useStyles();
  const renderCloseButton = (id) => (
    <IconButton className={classes.closeButton} onClick={(e) => {
      e.stopPropagation();
      props.closeWindow(id);
    }}>
      <Close/>
    </IconButton>
  )

  return (
    <AppBar position="relative" color="default" className={classes.appBar}>
      <ToolBar className={classes.toolbar}>
        <Tabs
          aria-label="windows"
          textColor="inherit"
          variant="scrollable"
          value={props.selectedWindow}
          onChange={(e, v) => props.selectWindow(v)}
          indicatorColor="primary"
          className={classes.tabs}
        >
          {
            Object.entries(props.windows).map(([id, obj]) => (
              <Tab
                component="div"
                key={id}
                label={<><Typography>{obj.name}</Typography>{renderCloseButton(id)}</>}
                id={obj.id}
                aria-controls={obj.id}
                value={id}
              />
            ))
          }
        </Tabs>
      </ToolBar>
    </AppBar>
  );
};
