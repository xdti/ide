import transformations from './transformation-mock'

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
  }
}
