import React from 'react';
import merge from 'lodash/merge';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import XPathEditor from './xpath-editor'
import ExpressionEditor from './expression-editor';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    padding: '10pt',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    overflowY: 'auto',
    '&>.MuiTextField-root': {
      width: '100%'
    },
    '&>*:not(:last-child)': {
      marginBottom: 20,
    }
  },
  checkboxGroup: {
    marginLeft: 10
  },
  pathEditor: {
    display: 'flex',
    width: '100%',
    '&>.MuiTextField-root:not(:last-child)': {
      marginRight: 10
    }
  },
  pathValueInput: {
    width: '100%'
  },
  dataTypeInput: {
    width: '150pt'
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }
}));

export default function VariablePane(props) {
  const classes = useStyles();
  const [inputValues, setInputValues] = React.useState(props.data);

  const commitUpdate = (updates) => props.update(props.windowId, "var", updates);
  const update = (updates) => {
    setInputValues(merge({}, inputValues, updates));
    commitUpdate(updates);
  }

  const renderValueEditor = {
    xpath: (
      <XPathEditor
        config={props.varTypes.options.find(t => t.value === 'xpath')}
        data={props.data}
        update={commitUpdate}
      />
    ),
    expression: (
      <ExpressionEditor
        data={props.data}
        update={update}
      />
    )
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
      <FormControl component="fieldset" className={classes.checkboxGroup}>
        <FormGroup>
          <FormControlLabel
          control={<Checkbox color="primary" checked={inputValues.required} onChange={(e) => update({ required: e.target.checked })} value="required" />}
          label="Required"
          />
        </FormGroup>
      </FormControl>
      <TextField
        variant="outlined"
        label="Type"
        value={inputValues.type}
        onChange={(e) => update({ type: e.target.value })}
        select
      >
        {
          props.varTypes.options.map(o => (
            <MenuItem key={o.value} value={o.value}>{o.display}</MenuItem>
          ))
        }
      </TextField>
      {
        renderValueEditor[props.data.type]
      }
      <div className={classes.actions}>
        <Button variant="contained" color="secondary" title="Delete var" onClick={() => {
          props.closeSelf();
          update(null);
        }}>
          <Delete/>
        </Button>
      </div>
    </div>
  );
};
