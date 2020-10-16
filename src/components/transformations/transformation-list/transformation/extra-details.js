import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MapOverflow from 'components/generic/map-overflow';

const useStyles = makeStyles(theme => ({
   container: {
     paddingLeft: 10,
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'space-around',
     flexGrow: 1
   },
   formats: {
     display: 'flex',
     padding: '10pt 0',
     alignItems: 'center',
     '& .MuiTypography-root': {
       fontSize: 'large'
     },
     '& *:not(:last-child)': {
       marginRight: 10
     }
   },
   content: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'space-between'
   },
   actions: {
     flexShrink: 0,
     '& button:not(:last-child)': {
       marginRight: 10
     }
   }
}));

export default function ExtraDetails(props) {
  const classes = useStyles();
  const transformation = props.transformation;
  const metadata = [
    { key: 'Owner', value: transformation.owner }
  ].concat(
    Object.entries(transformation.metadata).map(([key, value]) => ({ key, value }))
  )

  return (
    <div className={classes.container}>
      <div className={classes.formats}>
        <Typography variant="caption">{transformation.input}</Typography>
        <ArrowForward />
        <Typography variant="caption">{transformation.output}</Typography>
      </div>
      <div className={classes.content}>
        <MapOverflow map={metadata} />
        <div className={classes.actions}>
          <Button color="primary" variant="contained" onClick={props.setTransformation}>
            <Edit />
          </Button>
          <Button color="secondary" variant="contained">
            <Delete />
          </Button>
        </div>
      </div>
    </div>
  );
};
