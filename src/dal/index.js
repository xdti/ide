import transformations from './transformation-mock'
import plugins from './plugins-mock';
import sortBy from 'lodash/sortBy';

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
    getVarTypesByInput: async (input) => varTypes[input]
  },
  plugins: {
    getPluginList: async () => plugins,
    getLatestVersion: async (name) => sortBy(plugins.find(p => p.name === name).versions, ['version']).pop().version,
    getPluginConfig: async (name, version) => plugins.find(p => p.name === name).versions.find(v => v.version === version)
  }
}
