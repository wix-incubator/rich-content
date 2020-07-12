import { MapViewer } from './MapViewer';
import { MAP_TYPE } from './constants';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [MAP_TYPE]: { component: MapViewer },
});
