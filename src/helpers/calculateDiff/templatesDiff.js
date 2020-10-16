import { v4 as uuid } from 'uuid';

export default (stagingArea, transformation) => {
  let diff = [];
  for (let key in stagingArea.templates){
    let template = stagingArea.templates[key];
    if (!(key in transformation.templates) && template){
      diff.push({
        id: uuid(),
        changeType: 'added',
        entityType: 'template',
        entityName: template.name
      })
    }
    else if (template == null && (key in transformation.templates)){
      diff.push({
        id: uuid(),
        changeType: 'removed',
        entityType: 'template',
        entityName: transformation.templates[key].name
      })
    }
    else {
      for (let vkey in template){
        let newValue = template[vkey];
        let oldValue = transformation.templates[key][vkey];
        if (newValue != oldValue){
          diff.push({
            id: uuid(),
            changeType: 'changed',
            entityType: `template.${vkey}`,
            entityName: template.name || transformation.templates[key].name,
            newValue, oldValue
          })
        }
      }
    }
  }

  return diff;
}
