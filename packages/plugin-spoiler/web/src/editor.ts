import { createSpoilerPlugin } from './createSpoilerPlugin';
import { SPOILER_TYPE, SpoilerPluginEditorConfig } from './types';
import SpoilerEditorWrapper from './Components/Wrappers/SpoilerEditorWrapper';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';
export { SpoilerEditorWrapper };
export { default as BlockSpoilerComponent } from './Components/BlockSpoilerComponent';
export const pluginSpoiler: EditorPluginCreator<SpoilerPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, SpoilerEditorWrapper, ...config },
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
  };
};
