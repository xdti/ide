import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Transformation from './transformation';

const useStyles = makeStyles(theme => ({
  list: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0',
    alignItems: 'center',
    "& li:not(:last-child)": {
      marginBottom: 15
    }
  },
}));

export default function (props) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {
        props.transformations.map((t, i) => <Transformation key={t.id} transformation={t.versions[t.versions.length - 1]} setTransformation={() => props.setTransformation(t.id)}/>)
      }
    </List>
  );
};
