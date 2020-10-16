import { v4 as uuid } from 'uuid';

export default (stagingArea, transformation) => {
  let diff = [];

  for (let key in stagingArea.config){
    let section = stagingArea.config[key];

    if (!(key in transformation.config)){
      diff.push({
        id: uuid(),
        changeType: 'added',
        entityType: `config`,
        entityName: key
      })
    }
    else if (section === null){
      diff.push({
        id: uuid(),
        changeType: 'removed',
        entityType: `config.${key}`,
        entityName: key
      })
    }
    else {
      for (let vkey in section){
        let newValue = section[vkey];
        let oldValue = transformation.config[key][vkey];
        if (!(vkey in transformation.config[key])){
          diff.push({
            id: uuid(),
            changeType: 'added',
            entityType: `config.${key}.${vkey}`,
            entityName: newValue
          })
        }
        else if (newValue === null){
          diff.push({
            id: uuid(),
            changeType: 'removed',
            entityType: `config.${key}.${vkey}`,
            entityName: oldValue
          })
        }
        else if (newValue !== oldValue){
          diff.push({
            id: uuid(),
            changeType: 'changed',
            entityType: `config.${key}.${vkey}`,
            newValue, oldValue
          })
        }
      }
    }
  }

  return diff;
}
