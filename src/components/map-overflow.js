import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
    '&>*': {
      display: 'flex',
      flexShrink: 0,
      flexGrow: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 50
    },
  },
  overflow: {
    flexGrow: 1
  }
}));

export default function MapOverflow(props) {
  const classes = useStyles();
  let container = React.createRef();

  const [valuesCount, setValuesCount] = React.useState(props.map.length);

  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const hasOverflowingProps = () => {
    if (!container || !container.current){
      return false;
    }
    return container.current.offsetHeight < container.current.scrollHeight ||
      container.current.offsetWidth < container.current.scrollWidth;
  }

  React.useEffect(() => {
    const isOverflow = hasOverflowingProps();
    if (isOverflow){
      setValuesCount(valuesCount - 1);
    }
  }, [valuesCount, container]);

  React.useEffect(() => {
    const handleResize = () => {
      let newWidth = window.innerWidth;
      let newHeight = window.innerHeight;
      const isOverflow = hasOverflowingProps()
      if (newWidth < windowWidth && isOverflow){
        setValuesCount(valuesCount - 1);
      }
      if (newWidth > windowWidth && !isOverflow){
        setValuesCount(props.map.length);
      }
      if (newHeight < windowHeight && isOverflow){
        setValuesCount(valuesCount - 1);
      }
      if (newHeight > windowHeight && !isOverflow){
        setValuesCount(props.map.length);
      }
      setWindowWidth(newWidth);
      setWindowHeight(newHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      ref={container}
      className={clsx(props.className, classes.container)}
      title={
        props.map.map(m => `${m.key}: ${m.value}`).join('\n')
      }
    >
      {
        props.map.slice(0, valuesCount).map(m => (
          <ListItemText className={clsx(valuesCount < props.map.length && classes.overflow)} key={m.key} primary={m.value} secondary={m.key} />
        ))
      }
      {
        valuesCount < props.map.length ? (
          <ListItemText
            className={classes.overflow}
            primary={<span style={{color: 'white'}}>.</span>}
            secondary={"......"}
            />
        ) : ""
      }
    </div>
  );
};
