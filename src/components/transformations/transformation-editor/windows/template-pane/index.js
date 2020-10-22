import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import merge from 'lodash/merge';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import TemplateEditor from './template-editor';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt',
    overflowY: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    '&>.MuiTextField-root': {
      width: '100%'
    },
    '&>*:not(:last-child)': {
      marginBottom: 20,
    }
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }
}));

export default function TemplatePane(props) {
  const classes = useStyles();
  const [inputValues, setInputValues] = React.useState(props.data);

  const commitUpdate = (updates) => props.update(props.windowId, "template", updates);
  const update = (updates) => {
    setInputValues(merge({}, inputValues, updates));
    commitUpdate(updates);
  }

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        label="Name"
        value={inputValues.name}
        onChange={(e) => update({ name: e.target.value })}
      />
      <TextField
        variant="outlined"
        label="Description"
        value={inputValues.description}
        onChange={(e) => update({ description: e.target.value })}
      />
      <TemplateEditor
        data={props.data}
        update={commitUpdate}
      />
      <div className={classes.actions}>
        <Button variant="contained" color="secondary" title="Delete template" onClick={() => {
          props.closeSelf();
          update(null);
        }}>
          <Delete/>
        </Button>
      </div>
    </div>
  );
};
