import React from 'react';
import { v4 as uuid } from 'uuid';
import mergeWith from 'lodash/mergeWith';
import sortBy from 'lodash/sortBy';
import reorderList from 'helpers/reorderList';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/icons/Menu';
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
  addTemplate: {
    justifyContent: 'center'
  }
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

export default function Templates(props) {
  const classes = useStyles();
  const [templateList, setTemplateList] = React.useState([]);
  React.useEffect(() => {
    let templates = props.templates || {};
    let templatesWithIds = Object.entries(templates).map(([id, v]) => mergeWith({}, v, { id }));
    let newTemplateList = sortBy(templatesWithIds, ['order'])
    setTemplateList(newTemplateList)
  }, [props.templates]);

  const addTemplate = () => {
    let order = templateList.length + 1
    let newTemplate = {
      name: `template${order}`,
      description: 'New template',
      value: "",
      order
    };
    props.update({[uuid()]: newTemplate})
  }
  const selectTemplate = (id) => props.select(id, "template");
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let sourceIndex = result.source.index;
    let destinationIndex = result.destination.index;
    let newTemplateList = reorderList(
      templateList,
      sourceIndex,
      destinationIndex
    )
    setTemplateList(newTemplateList);

    let updates = {};
    newTemplateList.forEach((t, i) => {
      let order = i + 1
      if (order !== props.templates[t.id].order){
        updates[t.id] = { order };
      }
    });
    props.update(updates);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List className={classes.list} ref={provided.innerRef}>
              {templateList.map((t, index) => (
                <Draggable key={t.id} draggableId={t.id} index={index}>
                  {(provided, snapshot) => (
                    <>
                      <ListItem
                        button
                        onClick={() => selectTemplate(t.id)}
                        className={classes.listItem}
                        title={t.name}
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
                          primary={t.name}
                          secondary={t.description}
                          secondaryTypographyProps={{ noWrap: true, title: t.description }}
                          primaryTypographyProps={{ noWrap: true, component: 'p' }}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ListItem button className={classes.addTemplate} onClick={addTemplate}>
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
