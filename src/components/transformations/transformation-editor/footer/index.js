import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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

  return (
    <div className={classes.footer}>
      <Button onClick={props.showVersionControl}>
        <Timeline/>
        <Typography variant="caption" color="textSecondary">Version Control</Typography>
      </Button>
    </div>
  );
};
