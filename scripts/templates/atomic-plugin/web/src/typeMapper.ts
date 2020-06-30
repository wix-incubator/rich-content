import YourPluginNameViewer from './yourDpluginDname-viewer';
import { YOUR_PLUGIN_NAME_TYPE } from './types';

export const typeMapper: PluginTypeMapper = () => ({
  [YOUR_PLUGIN_NAME_TYPE]: { component: YourPluginNameViewer },
});
