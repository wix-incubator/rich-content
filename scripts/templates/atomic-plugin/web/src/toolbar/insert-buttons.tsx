import { DEFAULTS } from '../yourDpluginDname-component';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'helpers' | 'settings'> = ({
  helpers,
  settings,
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      name: 'yourPluginName',
      tooltipText: 'yourPluginName new plugin!',
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
    },
  ];
};

export default createInsertButtons;
