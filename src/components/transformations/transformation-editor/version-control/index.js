import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import VersionTree from './version-tree';
import CurrentDiff from './current-diff';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fafafa',
    width: '20vw',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
    height: 'calc(100% - 55pt - 1px)'
  }
}));



export default function VersionControl(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header close={props.close} />
      <div className={classes.content}>
        <VersionTree versions={props.versions} />
        <CurrentDiff stagingArea={props.stagingArea} transformation={props.transformation} />
      </div>
    </div>
  );
};
