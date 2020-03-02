import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import dal from 'dal';

const useStyles = makeStyles(theme => ({
  "@global": {
    'div[aria-labelledby="plugin-selector"]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500pt',
    display: 'flex',
    flexDirection: 'column',
    "&>*:not(:last-child)": {
      marginBottom: 20
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function PluginSelector(props) {
  const classes = useStyles();
  const [availablePlugin, setAvailablePlugins] = React.useState([]);
  const [selectedPlugin, setSelectedPlugin] = React.useState("");
  const [selectedVersion, setSelectedVersion] = React.useState("");

  React.useEffect(() => {
    dal.plugins.getPluginList().then((plugins) => {
      setAvailablePlugins(plugins.filter(p => !props.existingPlugins.find(eP => p.name === eP.name)))
    })
  }, [props.existingPlugins]);

  return (
    <Modal
      open={props.open}
      aria-labelledby="plugin-selector"
      aria-describedby="select new plugin"
      onClose={props.close}
    >
      <div className={classes.container}>
        <Typography variant="h6">Select Plugin</Typography>
        <TextField
          select
          variant="outlined"
          label="Plugin"
          value={selectedPlugin}
          onChange={(e) => {
            setSelectedPlugin(e.target.value);
            setSelectedVersion("");
          }}
        >
        {
          availablePlugin.map(p => (
            <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>
          ))
        }
        </TextField>
        <TextField
          select
          variant="outlined"
          label="Version"
          value={selectedVersion}
          disabled={selectedPlugin == ""}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
        {
          selectedPlugin ? availablePlugin.find(p => p.name === selectedPlugin).versions.map(v => (
            <MenuItem key={v.version} value={v.version}>{`v${v.version}`}</MenuItem>
          )) : <MenuItem value="none"/>
        }
        </TextField>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedPlugin === "" || selectedVersion === ""}
            onClick={() => {
              props.addPlugin(selectedPlugin, selectedVersion);
              setSelectedPlugin("");
              setSelectedVersion("");
              props.close();
            }}
          >
            Add Plugin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
