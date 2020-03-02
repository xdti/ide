import React from 'react';
import { v4 as uuid } from 'uuid';
import mergeWith from 'lodash/mergeWith';
import sortBy from 'lodash/sortBy';
import reorderList from 'helpers/reorderList';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: '#fafafa',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    padding: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '15vw',
    zIndex: 2,
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
  listItem: {
    height: '55pt'
  },
  addVar: {
    justifyContent: 'center'
  }
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

export default function Variables(props) {
  const classes = useStyles();
  const [varList, setVarList] = React.useState([]);
  React.useEffect(() => {
    let variables = props.variables || {};
    let varsWithIds = Object.entries(variables).map(([id, v]) => mergeWith({}, v, { id }));
    let newVarList = sortBy(varsWithIds, ['order'])
    setVarList(newVarList)
  }, [props.variables]);

  const addVar = () => {
    let order = varList.length + 1
    let newVar = {
      name: `var${order}`,
      description: 'New variable',
      required: false,
      type: props.varTypes.default,
      value: "",
      order,
      ...props.varTypes.defaultProps
    };
    props.update({[uuid()]: newVar})
  }
  const selectVar = (id) => props.select(id, "var", props.variables[id]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let sourceIndex = result.source.index;
    let destinationIndex = result.destination.index;
    let newVarList = reorderList(
      varList,
      sourceIndex,
      destinationIndex
    )
    setVarList(newVarList);

    let updates = {};
    newVarList.forEach((v, i) => {
      let order = i + 1
      if (order !== props.variables[v.id].order){
        updates[v.id] = { order };
      }
    });
    props.update(updates);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List className={classes.list} ref={provided.innerRef}>
              {varList.map((v, index) => (
                <Draggable key={v.id} draggableId={v.id} index={index}>
                  {(provided, snapshot) => (
                    <>
                      <ListItem
                        button
                        onClick={() => selectVar(v.id)}
                        className={classes.listItem}
                        title={v.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItemIcon
                          {...provided.dragHandleProps}
                        >
                          <Menu />
                        </ListItemIcon>
                        <ListItemText
                          primary={v.name}
                          secondary={v.description}
                          secondaryTypographyProps={{ noWrap: true, title: v.description }}
                          primaryTypographyProps={{ noWrap: true, component: 'p' }}
                        />
                        {
                          v.required ? (
                            <ListItemAvatar title="Required">
                              <Avatar>*</Avatar>
                            </ListItemAvatar>
                          ) : ""
                        }
                      </ListItem>
                      <Divider />
                    </>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ListItem button className={classes.addVar} onClick={addVar}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
              </ListItem>
            </List>
          )}
        </Droppable>
      </DragDropContext>
  );
};
