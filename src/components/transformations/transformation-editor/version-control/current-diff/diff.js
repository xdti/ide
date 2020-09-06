import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Adjust from '@material-ui/icons/Adjust';
import ArrowForward from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  valueDiff: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    '&>span': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  },
  identity: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10pt',
    paddingRight: 2,
    '&>*': {
      fontSize: '0.8rem'
    }
  },
  removed: {
    color: 'red',
    backgroundColor: 'rgba(255,0,0,0.2)'
  },
  added: {
    color: 'green',
    backgroundColor: 'rgba(0,255,0,0.2)'
  },
  changed: {
    color: 'rgb(255,69,0)',
    backgroundColor: 'rgba(255,165,0,0.2)'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10pt'
  },
  changes: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '30pt',
    padding: '0 5pt'
  }
}));

export default function Diff(props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, classes[props.diff.changeType])}>
      <div className={classes.icon}>
        {
          props.diff.changeType === 'removed' ? (
            <Remove />
          ) : props.diff.changeType === 'added' ? (
            <Add />
          ) : <Adjust />
        }
      </div>
      <ListItemText className={classes.identity} primary={props.diff.entityName} secondary={props.diff.entityType} />
      <div className={classes.changes}>
      {
        props.diff.changeType === 'changed' ? (
          <div className={classes.valueDiff}>
            <Typography title={props.diff.oldValue.toString()} variant="caption">{props.diff.oldValue.toString()}</Typography>
            <ArrowForward fontSize="small"/>
            <Typography variant="caption" title={props.diff.newValue.toString()}>{props.diff.newValue.toString()}</Typography>
          </div>
        ) : props.diff.entityName
      }
      </div>
    </div>
  );
};
