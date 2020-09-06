import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({

}));

export default function TreeNode(props) {
  const classes = useStyles();
  const {className, nodeData} = props;

  return (
    <ListItem className={className}>
      <ListItemText
        primary={nodeData.name}
        secondary={nodeData.attributes.comment}
      />
    </ListItem>
  );
};
