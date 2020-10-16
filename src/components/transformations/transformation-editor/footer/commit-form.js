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
    'div[aria-labelledby="commit-form"]': {
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

export default function CommitForm(props) {
  const classes = useStyles();
  const [commitMessage, setCommitMessage] = React.useState("");

  return (
    <Modal
      open={props.open}
      aria-labelledby="commit-form"
      aria-describedby="create a new commit"
      onClose={props.close}
    >
      <div className={classes.container}>
        <Typography variant="h6">Commit and Push Changes</Typography>
        <TextField
          variant="outlined"
          label="Commit Message"
          multiline
          rows="5"
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
        />
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            disabled={commitMessage === ""}
            onClick={() => {
              props.commit(commitMessage);
              props.close();
            }}
          >
            Commit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
