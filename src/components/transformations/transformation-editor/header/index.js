import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import EditMetadataForm from './edit-metadata-form';

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'hidden'
  },
  name: {
    marginRight: 15
  },
  title: {
    overflow: 'hidden',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 25
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [formOpen, setFormOpen] = React.useState(false)

  return (
    <AppBar position="relative" color="default" className={classes.container}>
      <ToolBar className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h6" className={classes.name}>{props.name}</Typography>
          <Typography variant="subtitle2" title={props.description} noWrap={true}>{props.description}</Typography>
        </div>
        <div>
          <Button color="primary" variant="contained" onClick={() => setFormOpen(true)}>
            <Edit />
          </Button>
          <EditMetadataForm
            open={formOpen}
            name={props.name}
            description={props.description}
            input={props.input}
            output={props.output}
            owner={props.owner}
            metadata={props.metadata}
            supportedFormats={props.supportedFormats}
            update={props.update}
            close={() => setFormOpen(false)}
          />
        </div>
      </ToolBar>
    </AppBar>
  );
};
