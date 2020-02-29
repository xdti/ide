import transformations from './transformation-mock'

const varTypes = {
  'XML': {
    default: 'xpath',
    options: ['xpath', 'expression']
  }
}

export default {
  transformations: {
    get: async (id) => transformations.find(t => t.id === id),
    getAll: async () => transformations,
    getVarTypesByInput: async (input) => varTypes[input]
  }
}
