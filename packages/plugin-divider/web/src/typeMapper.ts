import DividerComponent from './components/divider-component';
import { DIVIDER_TYPE } from './defaults';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [DIVIDER_TYPE]: { component: DividerComponent },
});
