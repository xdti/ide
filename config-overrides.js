const path = require('path');

module.exports = (config, env) => {
  config.resolve.alias.components = path.resolve(__dirname, 'src/components');
  return config
}
