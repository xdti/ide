const path = require('path');

module.exports = (config, env) => {
  config.resolve.alias.components = path.resolve(__dirname, 'src/components');
  config.resolve.alias.dal = path.resolve(__dirname, 'src/dal');
  return config
}
