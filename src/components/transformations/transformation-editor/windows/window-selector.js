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
    height: 'calc(55pt + 1px)',
    width: '77vw',
    backgroundColor: '#fafafa',
  },
  toolbar: {
    padding: 0,
    width: '77vw',
  },
  tabs: {
    minHeight: 'inherit',
    height: 'calc(55pt + 1px)',
    width: '77vw',
    '& .MuiTabs-scroller': {
      display: 'flex'
    },
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '150pt'
    }
  },
  closeButton: {
    padding: 0
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
            Object.entries(props.windows).map(([id, w]) => (
              <Tab
                component="div"
                key={id}
                label={<><Typography noWrap={true}>{w.data.name}</Typography>{renderCloseButton(id)}</>}
                id={id}
                aria-controls={id}
                value={id}
              />
            ))
          }
        </Tabs>
      </ToolBar>
    </AppBar>
  );
};
