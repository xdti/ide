import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from 'components/top-bar';
import displays from './displays';

const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '12px',
	    backgroundColor: '#F5F5F5'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
    	backgroundColor: '#F5F5F5'
    },
    '*::-webkit-scrollbar-thumb': {

      backgroundColor: '#acacac'
    }
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0, 0.03)'
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex'
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.app}>
        <CssBaseline />
        <TopBar displays={displays} />
        <main className={classes.content}>
          <Switch>
            {
              displays.slice().reverse().map(d => (
                <Route key={d.route} exact path={d.route}>
                  {d.display}
                </Route>
              ))
            }
          </Switch>
        </main>
      </div>
    </Router>
  );
};
