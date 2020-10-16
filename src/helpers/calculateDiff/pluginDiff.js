import { v4 as uuid } from 'uuid';

export default (stagingArea, transformation) => {
  let diff = [];

  for (let key in stagingArea.plugins){
    let newValue = stagingArea.plugins[key];
    if (!(key in transformation.plugins)){
      diff.push({
        id: uuid(),
        changeType: 'added',
        entityType: `plugin`,
        entityName: key
      })
    }
    else if (newValue === null){
      diff.push({
        id: uuid(),
        changeType: 'removed',
        entityType: `plugin`,
        entityName: key
      })
    }
    else if (newValue !== transformation.plugins[key]){
      diff.push({
        id: uuid(),
        changeType: 'changed',
        entityType: `plugin.version`,
        entityName: key,
        newValue, oldValue: transformation.plugins[key]
      })
    }
  }

  return diff;
}
