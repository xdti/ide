export default (templates, suffix) => ({
  name: 'templates-completer',
  identifierRegexps: [/[^\s]+/],
  getCompletions: (editor, session, pos, prefix, callback) => {
    let current = editor.container.id;
    let templateNames = Object.values(templates || {})
      .map(v => v.name);
    let isTemplate = templateNames.includes(current);
    callback(
      null,
      isTemplate ? templateNames.filter(t => t != current).map(caption => ({
        caption,
        value: `"${caption}.${suffix.toLowerCase()}"`,
        meta: 'template'})
      ) : []
    );
  }
})
