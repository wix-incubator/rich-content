import { createActionButtonPlugin, createLinkButtonPlugin } from './createButtonPlugin';
import { DEFAULT_CONFIG } from './constants';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
} from './types';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';

const pluginButton = (createPlugin, type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    createPlugin,
    ModalsMap,
  };
};

export const pluginLinkButton: EditorPluginCreator<LinkButtonPluginEditorConfig> = config => {
  return pluginButton(createLinkButtonPlugin, LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: EditorPluginCreator<ActionButtonPluginEditorConfig> = config => {
  return pluginButton(createActionButtonPlugin, ACTION_BUTTON_TYPE, config);
};
