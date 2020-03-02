import React from 'react';
import mergeWith from 'lodash/mergeWith';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Code from '@material-ui/icons/Code';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Add from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import PluginSelector from './plugin-selector';
import dal from 'dal';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: '#fafafa',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    padding: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '15vw',
    zIndex: 2,
    '&>.MuiListItemAvatar-root': {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    '&>.MuiAvatar-root': {
      color: 'black',
      fontWeight: '1000',
      backgroundColor: 'unset',
      margin: 0
    }
  },
  listItem: {
    height: '55pt'
  },
  addPlugin: {
    justifyContent: 'center'
  }
}));

export default function Variables(props) {
  const classes = useStyles();
  const [pluginList, setPluginsList] = React.useState([]);
  const [showPluginSelector, setShowPluginSelector] = React.useState(false);

  React.useEffect(() => {
    let plugins = props.plugins || {};
    let pluginsWithVersion = Object.entries(plugins).map(([name, version]) => mergeWith({}, { name, version }));
    setPluginsList(pluginsWithVersion)
  }, [props.plugins]);

  const addPlugin = (name, version) => props.update({ [name]: version });
  const removePlugin = (name) => props.update({ [name]: null });
  const updatePlugin = (name) => dal.plugins.getLatestVersion(name).then(v => props.update({ [name]: v }));

  return (
    <List className={classes.list}>
      {pluginList.map((t, index) => (
        <React.Fragment key={t.name}>
          <ListItem className={classes.listItem} title={t.name}>
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText
              primary={t.name}
              secondary={`v${t.version}`}
              secondaryTypographyProps={{ noWrap: true, title: `v${t.version}` }}
              primaryTypographyProps={{ noWrap: true, component: 'p' }}
            />
            <ListItemSecondaryAction>
              <IconButton title="Update plugin" onClick={() => updatePlugin(t.name)}>
                <ArrowUpward />
              </IconButton>
              <IconButton title="Delete plugin" onClick={() => removePlugin(t.name)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button className={classes.addPlugin} onClick={() => setShowPluginSelector(true)}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
      </ListItem>
      <PluginSelector
        open={showPluginSelector}
        addPlugin={addPlugin}
        existingPlugins={pluginList}
        close={() => setShowPluginSelector(false)}
      />
    </List>
  );
};
