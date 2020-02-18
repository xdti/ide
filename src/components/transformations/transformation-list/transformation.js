import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
    height: '130pt'
  },
  divider: {
    marginBottom: 10
  },
  extraDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& .content': {
      paddingLeft: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flexGrow: 1
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actions: {
    flexShrink: 0,
    '& button:not(:last-child)': {
      marginRight: 10
    }
  },
  props: {
    display: 'flex',
    overflow: 'hidden',
    '&>:not(:last-child)': {
      marginRight: 50
    },
    '& *': {
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  main: {
    display: 'flex',
    alignItems: 'center'
  },
  formats: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      fontSize: 'large'
    },
    '& *:not(:last-child)': {
      marginRight: 10
    }
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
  const [metadataCount, setMetadataCount] = React.useState(Object.keys(transformation.metadata).length);
  let propContainer = React.createRef();

  React.useEffect(() => {
    if (propContainer.current != null){
      const hasOverflowingChildren = propContainer.current.offsetHeight < propContainer.current.scrollHeight ||
                                  propContainer.current.offsetWidth < propContainer.current.scrollWidth;
      if (hasOverflowingChildren){
        setMetadataCount(metadataCount - 1)
      }
    }
  })
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
            <div className="content">
              <div className={classes.formats}>
                <Typography variant="caption">{transformation.input}</Typography>
                <ArrowForward />
                <Typography variant="caption">{transformation.output}</Typography>
              </div>
              <div className={classes.container}>
                <div className={classes.props}
                  title={
                    Object.entries(transformation.metadata).map(([key, value]) => `${key}: ${value}`).join('\n')
                  }
                  ref={propContainer}
                  >
                  <ListItemText primary={transformation.owner} secondary={"Owner"} />
                  {
                    Object.entries(transformation.metadata).slice(0, metadataCount).map(([key, value]) => (
                      <ListItemText key={key} primary={value} secondary={key} />
                    ))
                  }
                  {
                    metadataCount < Object.keys(transformation.metadata).length ? (
                      <ListItemText
                        primary={<span style={{color: 'white'}}>.</span>}
                        secondary={"......"}
                        />
                    ) : ""
                  }
                </div>
                <div className={classes.actions}>
                  <Button color="primary" variant="contained">
                    <Edit />
                  </Button>
                  <Button color="secondary" variant="contained">
                    <Delete />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : ""
      }
    </ListItem>
  );
};
