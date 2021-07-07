import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as mapTypeMapper, MAP_TYPE };

export const pluginMap: ViewerPluginCreator<MapPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    typeMapper,
  };
};
