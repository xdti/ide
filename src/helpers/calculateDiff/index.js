import variablesDiff from './variablesDiff';
import templatesDiff from './templatesDiff';
import configDiff from './configDiff';
import pluginDiff from './pluginDiff';

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
