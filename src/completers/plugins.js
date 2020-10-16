import sortBy from 'lodash/sortBy';

export default (plugins) => ({
  name: 'plugins-completer',
  identifierRegexps: [/[^\s]+/],
  getCompletions: (editor, session, pos, prefix, callback) => {
    callback(
      null,
      Object.keys(plugins)
        .map(value => ({ value, meta: "plugin" }))
    );
  }
})
