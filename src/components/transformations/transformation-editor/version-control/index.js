import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fafafa',
    width: '20vw',
    flexGrow: 1
  },
}));

export default function VersionControl(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header close={props.close} />
    </div>
  );
};
