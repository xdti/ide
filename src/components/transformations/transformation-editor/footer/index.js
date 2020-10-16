import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/icons/Timeline';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import CommitForm from './commit-form';

const useStyles = makeStyles(theme => ({
  "@keyframes loadingUp": {
    '0%': {
      marginBottom: 0,
      color: 'rgba(0,0,0,1)'
    },
    '100%': {
      marginBottom: '15pt',
      color: 'rgba(0,0,0,0)'
    }
  },
  "@keyframes loadingDown": {
    '0%': {
      marginBottom: 0,
      color: 'rgba(0,0,0,1)'
    },
    '100%': {
      marginBottom: '-15pt',
      color: 'rgba(0,0,0,0)'
    }
  },
  loadingUp: {
    animation: "$loadingUp 1500ms infinite"
  },
  loadingDown: {
    animation: "$loadingDown 1500ms infinite"
  },
  footer: {
    height: '25pt',
    borderTop: '1px solid rgba(0, 0, 0, 0.23)',
    display: 'flex',
    justifyContent: 'flex-end',
    '&>.MuiButton-root': {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      },
      height: '25pt',
      padding: '0 10pt',
      '&>.MuiButton-label>.MuiSvgIcon-root': {
        marginRight: 5
      }
    }
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const [isCommiting, setIsCommiting] = React.useState(false);
  const [isPulling, setIsPulling] = React.useState(false);
  const [showCommitForm, setShowCommitForm] = React.useState(false);
  const commit = async (message) => {
    setIsCommiting(true);
    await props.commit(message);
    setIsCommiting(false)
  }
  const pull = async () => {
    setIsPulling(true);
    await props.pull();
    setIsPulling(false);
  }

  return (
    <div className={classes.footer}>
      <Button onClick={pull}>
        <ArrowDownward className={clsx(isPulling && classes.loadingDown)}/>
        <Typography variant="caption" color="textSecondary">Pull</Typography>
      </Button>
      <Button onClick={() => setShowCommitForm(true)} disabled={!props.canCommit}>
        <ArrowUpward className={clsx(isCommiting && classes.loadingUp)}/>
        <Typography variant="caption" color="textSecondary">Push</Typography>
      </Button>
      <CommitForm
        open={showCommitForm}
        commit={commit}
        close={() => setShowCommitForm(false)}
      />
      <Button onClick={props.showVersionControl}>
        <Timeline/>
        <Typography variant="caption" color="textSecondary">Version Control</Typography>
      </Button>
    </div>
  );
};
