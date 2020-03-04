import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './menu';
import Variables from './variables';
import Templates from './templates';
import Plugins from './plugins';
import Config from './config';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1
  }
}));

export default function ObjectSelector(props){
  const classes = useStyles();
  const transformation = props.transformation;
  const [objectType, setObjectType] = React.useState('vars');

  const objectSelectors = {
    vars: <Variables
      varTypes={props.varTypes}
      variables={transformation.variables}
      update={props.updaters.var}
      select={props.select}
    />,
    templates: <Templates
      templates={transformation.templates}
      update={props.updaters.template}
      select={props.select}
    />,
    plugins: <Plugins
      plugins={transformation.plugins}
      update={props.updaters.plugin}
    />,
    config: <Config
      config={transformation.config}
      plugins={transformation.plugins}
      select={props.select}
    />
  }

  return (
    <div className={classes.container}>
      <Menu objectType={objectType} setObjectType={setObjectType} />
      {
        objectSelectors[objectType]
      }
    </div>
  );
};
