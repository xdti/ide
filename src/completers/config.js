import sortBy from 'lodash/sortBy';

export default (config) => ({
  name: 'configuration-completer',
  identifierRegexps: [/[^\s]+/],
  getCompletions: (editor, session, pos, prefix, callback) => {
    callback(
      null,
      Object.keys(config.general).map(value => ({ value, meta: "config" }))
    );
  }
})
