import { createTablePlugin } from './createTablePlugin';
import { ModalsMap } from './modals';
import { theme } from './defaults';
import { TABLE_TYPE, TablePluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginTable: EditorPluginCreator<TablePluginEditorConfig> = config => {
  return {
    config,
    type: TABLE_TYPE,
    createPlugin: createTablePlugin,
    ModalsMap,
    theme,
  };
};
