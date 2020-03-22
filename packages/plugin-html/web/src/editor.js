import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE } from './types';
import { DEFAULTS_CONFIG } from './constants';

export const pluginHtml = (config = {}) => {
  return {
    config: { ...DEFAULTS_CONFIG, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
  };
};
