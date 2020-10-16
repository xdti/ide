export default (templates) => ({
  name: 'templates-completer',
  identifierRegexps: [/[^\s]+/],
  getCompletions: (editor, session, pos, prefix, callback) => {
    let current = editor.container.id;
    console.log(current);
    let templateNames = Object.values(templates || {})
      .map(v => v.name);
    console.log(templateNames);
    let isTemplate = templateNames.includes(current);
    callback(
      null,
      isTemplate ? templateNames.filter(t => t != current).map(value => ({ value, meta: 'template'})) : []
    );
  }
})
