import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from 'components/top-bar';
import displays from './displays';

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw'
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
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
              displays.map(d => (
                <Route exact path={d.route}>
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
