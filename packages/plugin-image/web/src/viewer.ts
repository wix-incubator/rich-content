import { typeMapper, preTypeMapper } from './typeMapper';
import { IMAGE_TYPE, ImagePluginViewerConfig } from './types';
import { DEFAULTS } from './consts';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as imageTypeMapper, IMAGE_TYPE };

export const pluginImage: ViewerPluginCreator<ImagePluginViewerConfig> = (
  config,
  component = null
) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    typeMapper: preTypeMapper(component),
  };
};
