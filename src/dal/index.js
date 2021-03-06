import transformations from './transformation-mock';
import newVersion from './new-version-mock';
import plugins from './plugins-mock';
import sortBy from 'lodash/sortBy';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const configTypes = {
  dataTypes: ['string', 'int', 'float', 'bool', 'list'],
  defaultDataType: 'string'
}

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
        dataTypes: ['string', 'int', 'float', 'bool', 'list'],
        defaultListItem: 'string'
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
    commit: async (version, message) => {
      await delay(5000);
      version.version += 1;
      version.versionComment = message;
      return version;
    },
    pull: async (transformationId, currentVersion) => {
      await delay(5000);
      return [newVersion];
    },
    getConfigTypes: async () => configTypes
  },
  formats: {
    getSupprotedFormats: async () => ['XML'],
    getVarTypesByFormat: async (input) => varTypes[input]
  },
  plugins: {
    getPluginList: async () => plugins,
    getLatestVersion: async (name) => sortBy(plugins.find(p => p.name === name).versions, ['version']).pop().version,
    getPluginConfig: async (name, version) => plugins.find(p => p.name === name).versions.find(v => v.version === version).configs
  }
}
