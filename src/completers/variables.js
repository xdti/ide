import sortBy from 'lodash/sortBy';

export default (variables) => ({
  name: 'variables-completer',
  identifierRegexps: [/[^\s]+/],
  getCompletions: (editor, session, pos, prefix, callback) => {
    let current = editor.container.id;
    let vars = sortBy(Object.values(variables || {}), ['order']);
    let varNames = vars.map(v => v.name);
    let isVar = varNames.includes(current);
    callback(
      null,
      varNames
        .filter(v => {
          return v.includes(prefix) && (!isVar || varNames.indexOf(v) < varNames.indexOf(current))
        })
        .map(value => ({ value, meta: "variable" }))
    );
  }
})
