import { createCodeBlockPlugin } from './createCodeBlockPlugin';
import { CODE_BLOCK_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginCodeBlock = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: CODE_BLOCK_TYPE,
    createPlugin: createCodeBlockPlugin,
    ModalsMap: {},
    theme,
  };
};
