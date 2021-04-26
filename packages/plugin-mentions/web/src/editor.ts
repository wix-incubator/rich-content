import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE, MentionsPluginEditorConfig } from './types';
import { DEFAULTS } from './defaultSettings';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createMentionData } from './createMentionData';

export const pluginMentions: EditorPluginCreator<MentionsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
    createPluginData: createMentionData,
  };
};
