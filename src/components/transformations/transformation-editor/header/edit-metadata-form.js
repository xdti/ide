import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormatSelector from './format-selector';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import startCase from 'lodash/startCase';

const useStyles = makeStyles(theme => ({
  "@global": {
    'div[aria-labelledby="edit-metadata-form"]': {
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
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    "&>*:not(:last-child)": {
      marginBottom: 20
    }
  },
  configForm: {
    width: '100%',
    display: 'flex',
    height: '40pt',
    '& .MuiInputBase-root': {
      height: '40pt'
    },
    '&>*:not(:last-child)': {
      marginRight: 10,
    }
  },
  maxWidthInput: {
    flexGrow: 1
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formatSelectors: {
    display: 'flex',
    '&>*': {
      flexGrow: 1
    },
    '&>*:not(:last-child)': {
      marginRight: 10
    }
  },
  metadataInputs: {
    overflowY: 'auto',
    flexGrow: 1,
    paddingTop: 5,
    '&>*:not(:last-child)': {
      marginBottom: 15
    }
  }
}));

export default function EditMetadataForm(props) {
  const classes = useStyles();
  const [newMetadataField, setNewMetadataField] = React.useState("")
  const update = (key, updates) => props.update(key, "metadata", updates);

  return (
    <Modal
      open={props.open}
      aria-labelledby="commit-form"
      aria-describedby="create a new commit"
      onClose={props.close}
    >
      <div className={classes.container}>
        <Typography variant="h6">Edit {props.name}</Typography>
        <TextField
          variant="outlined"
          label="Name"
          value={props.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Description"
          value={props.description}
          multiline
          rows="5"
          onChange={(e) => update("description", e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Owner"
          value={props.owner}
          onChange={(e) => update("owner", e.target.value)}
        />
        <div className={classes.formatSelectors}>
          <FormatSelector
            label="Input"
            value={props.input}
            onChange={(v) => update("input", v)}
            supportedFormats={props.supportedFormats}
          />
          <FormatSelector
            label="Output"
            value={props.output}
            onChange={(v) => update("output", v)}
            supportedFormats={props.supportedFormats}
          />
        </div>
        <div className={classes.metadataInputs}>
          {
            Object.keys(props.metadata || {}).map(k => (
              <div className={classes.configForm} key={k}>
                <TextField
                  variant="outlined"
                  label={startCase(k)}
                  value={props.metadata[k]}
                  onChange={(e) => update("metadata", { [k]: e.target.value })}
                  className={classes.maxWidthInput}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  title="Delete field"
                  onClick={(e) => update("metadata", { [k]: null })}
                >
                  <Delete />
                </Button>
              </div>
            ))
          }
          <div className={classes.configForm}>
            <TextField
              variant="outlined"
              label="Add Field"
              value={newMetadataField}
              onChange={(e) => setNewMetadataField(e.target.value)}
              className={classes.maxWidthInput}
            />
            <Button
              variant="contained"
              color="primary"
              title="Add field"
              onClick={(e) => update("metadata", { [newMetadataField]: e.target.value })}
            >
              <Add />
            </Button>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.close();
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
