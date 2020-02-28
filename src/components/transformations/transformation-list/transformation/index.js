import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import ExtraDetails from './extra-details';

const useStyles = makeStyles(theme => ({
  listItem: {
    border: '1px #ccc solid',
    backgroundColor: 'white',
    display: 'flex',
    width: '98vw',
    flexDirection: 'column',
    alignItems: 'stretch',
    transition: 'height 250ms',
    flexGrow: 0,
    flexShrink: 0,
    height: '55pt',
    '& .MuiTypography-root': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  },
  listItemOpen: {
    height: '150pt'
  },
  divider: {
    marginBottom: 10
  },
  extraDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    alignItems: 'center'
  },
  expandButton: {
    marginRight: 10,
    transition: '250ms'
  },
  openButton: {
    transform: 'rotate(90deg)',
    transition: '250ms'
  }
}));

export default function Transformation(props) {
  const classes = useStyles();
  const transformation = props.transformation;

  const [open, setOpen] = React.useState(false);

  return (
    <ListItem className={clsx(classes.listItem, open && classes.listItemOpen)}>
      <div className={classes.main}>
        <IconButton className={clsx(classes.expandButton, open && classes.openButton)} onClick={() => setOpen(!open)}>
          <ChevronRight />
        </IconButton>
        <ListItemText title={transformation.description} primary={transformation.name} secondary={transformation.description} />
      </div>
      {
        open ? (
          <div className={classes.extraDetails}>
            <Divider className={classes.divider}/>
            <ExtraDetails transformation={transformation} setTransformation={props.setTransformation}/>
          </div>
        ) : ""
      }
    </ListItem>
  );
};
