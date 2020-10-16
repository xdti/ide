import transformations from './transformation-mock';
import newVersion from './new-version-mock';
import plugins from './plugins-mock';
import sortBy from 'lodash/sortBy';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const varTypes = {
  'XML': {
    default: 'xpath',
    defaultProps: {
      dataType: 'string'
    },
    options: [
      {
        value: 'xpath',
        display: 'XPath',
        dataTypes: ['string', 'int', 'float', 'bool', 'list']
      },
      {
        value: 'expression',
        display: 'Expression',
        dataTypes: ['string', 'int', 'float', 'bool', 'list']
      }
    ]
  }
}

export default {
  transformations: {
    get: async (id) => transformations.find(t => t.id === id),
    getAll: async () => transformations,
    getVarTypesByInput: async (input) => varTypes[input],
    commit: async (version, message) => {
      await delay(5000);
      version.version += 1;
      version.versionComment = message;
      return version;
    },
    pull: async (transformationId, currentVersion) => {
      await delay(5000);
      return [newVersion];
    }
  },
  plugins: {
    getPluginList: async () => plugins,
    getLatestVersion: async (name) => sortBy(plugins.find(p => p.name === name).versions, ['version']).pop().version,
    getPluginConfig: async (name, version) => plugins.find(p => p.name === name).versions.find(v => v.version === version).configs
  }
}
