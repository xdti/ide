import { v4 as uuid } from 'uuid';

export default (stagingArea, transformation) => {
  let diff = [];
  for (let key in stagingArea.variables){
    let variable = stagingArea.variables[key];
    if (!(key in transformation.variables) && variable){
      diff.push({
        id: uuid(),
        changeType: 'added',
        entityType: 'variable',
        entityName: variable.name
      })
    }
    else if (variable == null && (key in transformation.variables)){
      diff.push({
        id: uuid(),
        changeType: 'removed',
        entityType: 'variable',
        entityName: transformation.variables[key].name
      })
    }
    else {
      for (let vkey in variable){
        let newValue = variable[vkey];
        let oldValue = transformation.variables[key][vkey];
        if (newValue != oldValue){
          diff.push({
            id: uuid(),
            changeType: 'changed',
            entityType: `variable.${vkey}`,
            entityName: variable.name || transformation.variables[key].name,
            newValue, oldValue
          })
        }
      }
    }
  }

  return diff;
}
