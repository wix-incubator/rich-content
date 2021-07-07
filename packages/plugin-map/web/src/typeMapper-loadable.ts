import { MAP_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [MAP_TYPE]: { component: loadable(() => import('./MapViewer')) },
});
