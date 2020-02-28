import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';

export default function Header(props) {
  return (
    <AppBar position="relative" color="default">
      <ToolBar>
        <Typography variant="h6">{props.name}</Typography>
      </ToolBar>
    </AppBar>
  );
};