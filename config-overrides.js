const path = require('path');

module.exports = (config, env) => {
  config.resolve.alias.components = path.resolve(__dirname, 'src/components');
  config.resolve.alias.completers = path.resolve(__dirname, 'src/completers');
  config.resolve.alias.dal = path.resolve(__dirname, 'src/dal');
  config.resolve.alias.helpers = path.resolve(__dirname, 'src/helpers');
  return config
}
