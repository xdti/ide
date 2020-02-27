import transformations from './transformation-mock'

export default {
  transformations: {
    get: async (id) => transformations.find(t => t.id == id),
    getAll: async() => transformations
  }
}
