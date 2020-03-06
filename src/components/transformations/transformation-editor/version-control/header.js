import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    height: 'calc(55pt + 1px)',
    backgroundColor: '#fafafa',
    zIndex: 0
  },
  toolbar: {
    height: 'inherit',
  },
  header: {
    display: 'flex',
    height: 'inherit',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <ToolBar className={classes.toolbar}>
        <div className={classes.header}>
          <Typography color="textPrimary" variant="h6">Version Control</Typography>
          <IconButton onClick={props.close}>
            <Close/>
          </IconButton>
        </div>
      </ToolBar>
    </AppBar>
  );
};
