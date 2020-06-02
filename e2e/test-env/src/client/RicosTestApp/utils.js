export const createPresets = plugins => ({
  all: Object.values(plugins),
  partialPreset: [
    plugins.image,
    plugins.gallery,
    plugins.video,
    plugins.html,
    plugins.divider,
    plugins.spacing,
    plugins.link,
    plugins.hashtag,
    plugins.mentions,
    plugins.codeBlock,
    plugins.soundCloud,
    plugins.giphy,
    plugins.headers,
    plugins.map,
    plugins.fileUpload,
    plugins.linkButton,
    plugins.textColor,
    plugins.emoji,
    plugins.highlight,
  ].concat(plugins.undoRedo ? [plugins.undoRedo] : []),
  embedsPreset: [plugins.link, plugins.linkPreview, plugins.verticalEmbed],
  textPlugins: [
    plugins.linkPreview,
    plugins.verticalEmbed,
    plugins.indent,
    plugins.actionButton,
    ...plugins.partialPreset,
  ],
});
