import React from 'react';
import mergeWith from 'lodash/mergeWith';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Settings from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';

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
  }
}));

export default function Config(props) {
  const classes = useStyles();
  const [pluginList, setPluginsList] = React.useState([]);

  React.useEffect(() => {
    let plugins = props.plugins || {};
    let pluginsWithVersion = Object.entries(plugins).map(([name, version]) => mergeWith({}, { name, version }));
    setPluginsList(pluginsWithVersion)
  }, [props.plugins]);

  const selectPluginConfig = (name, version) => props.select(name, "pluginConfig");
  const selectGeneralConfig = () => props.select("general", "generalConfig");

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem} title="General" onClick={() => selectGeneralConfig()} button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText
          primary="General"
          primaryTypographyProps={{ noWrap: true, component: 'p' }}
        />
      </ListItem>
      {
        pluginList.length > 0 ? <Divider /> : ""
      }
      {pluginList.map((t, index) => (
        <React.Fragment key={t.name}>
          <ListItem className={classes.listItem} title={t.name} onClick={() => selectPluginConfig(t.name, t.version)} button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText
              primary={t.name}
              secondary={`v${t.version}`}
              secondaryTypographyProps={{ noWrap: true, title: `v${t.version}` }}
              primaryTypographyProps={{ noWrap: true, component: 'p' }}
            />
          </ListItem>
          {
            index < pluginList.length - 1 ? (
              <Divider />
            ) : ""
          }
        </React.Fragment>
      ))}
    </List>
  );
};
