import { v4 as uuid } from 'uuid';

const variablesDiff = (stagingArea, transformation) => {
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

const templatesDiff = (stagingArea, transformation) => {
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

const configDiff = (stagingArea, transformation) => {
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

const pluginDiff = (stagingArea, transformation) => {
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

const calculateDiff = (stagingArea, transformation) => {
  if (!stagingArea || !transformation){
    return [];
  }

  let diff = [];

  diff = diff.concat(variablesDiff(stagingArea, transformation));
  diff = diff.concat(templatesDiff(stagingArea, transformation));
  diff = diff.concat(configDiff(stagingArea, transformation));
  diff = diff.concat(pluginDiff(stagingArea, transformation));

  return diff;
}

export default calculateDiff;
