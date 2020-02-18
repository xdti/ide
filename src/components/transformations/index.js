import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TransformationList from './transformation-list';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1
  },
}));

export default function Transformations() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TransformationList />
    </div>
  );
};
