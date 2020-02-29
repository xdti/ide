import React from 'react';
import { v4 as uuid } from 'uuid';
import mergeWith from 'lodash/mergeWith';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Add from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: '#fafafa',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    padding: 0,
    width: '200pt',
    overflowY: 'auto',
    '& .MuiListItemAvatar-root': {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    '& .MuiAvatar-root': {
      color: 'black',
      fontWeight: '1000',
      backgroundColor: 'unset',
      margin: 0
    }
  },
  addVar: {
    justifyContent: 'center'
  }
}));

export default function Variables(props) {
  const classes = useStyles();
  const [varList, setVarList] = React.useState([]);
  React.useEffect(() => {
    let variables = props.variables || {};
    let newVarList = Object.entries(variables)
      .map(([id, v]) => mergeWith({}, v, { id }))
      .sort((v1, v2) => v1.order < v2.order);
    setVarList(newVarList)
  }, [props.variables]);

  const addVar = () => {
    let order = varList.length + 1;
    let newVar = {
      name: `var${order}`,
      description: 'New variable',
      required: false,
      type: 'xpath',
      value: "",
      order
    };
    props.update({ variables: { [uuid()]: newVar } })
  }

  return (
    <List className={classes.list}>
      {
        varList.map(v => (
          <React.Fragment key={v.id}>
            <ListItem button>
              <ListItemText primary={v.name} secondary={v.description} />
              {
                v.required ? (
                  <ListItemAvatar title="Required">
                    <Avatar>*</Avatar>
                  </ListItemAvatar>
                ) : ""
              }
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      }
      <ListItem button className={classes.addVar} onClick={addVar}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
