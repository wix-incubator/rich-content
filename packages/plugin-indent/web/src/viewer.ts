import { INDENT_TYPE } from './types';
import { DEFAULTS, theme } from './defaults';
export { INDENT_TYPE };

export const pluginIndent = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
    theme,
  };
};
