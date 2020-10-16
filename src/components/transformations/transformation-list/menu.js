import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    "& *:not(:last-child)": {
      marginRight: 15
    }
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="default">
      <ToolBar className={classes.menu}>
        <Typography variant="h6">Overview</Typography>
        <div className={classes.actions}>
          <Button variant="contained" color="primary"><Add/> New Transformation</Button>
          <TextField variant="outlined" placeholder="Type here to search" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }} value={props.query} onChange={(e) => props.setQuery(e.target.value)}/>
        </div>
      </ToolBar>
    </AppBar>
  );
};
