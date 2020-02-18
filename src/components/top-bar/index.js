import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    marginRight: 24
  },
  tabs: {
    minHeight: 'inherit',
    '& .MuiTabs-scroller': {
      display: 'flex'
    }
  }
}));

export default function TopBar(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const currentDisplay = props.displays.findIndex(d => d.route === location.pathname);
  const [display, setDisplay] = React.useState(currentDisplay);

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          xDTI IDE
        </Typography>
        <Tabs
          value={display}
          onChange={(e, v) => setDisplay(v)}
          aria-label="display tabs"
          TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
          textColor="inherit"
          className={classes.tabs}
        >
          {
            props.displays.map((d, i) => (
              <Tab
                key={d.route}
                label={d.label}
                id={`nav-tab-${i}`}
                aria-controls={`nav-tabpanel-${i}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(d.route);
                }}
              />
            ))
          }
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
