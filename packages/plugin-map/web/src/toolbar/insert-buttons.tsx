import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import { DEFAULTS } from '../defaults';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { MapPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
}: {
  t: TranslationFunction;
  settings: MapPluginEditorConfig;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.MAP,
      tooltip: t('MapPlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      getIcon: () => icon,
      componentData: {
        config: {
          size: settings.size || DEFAULTS.size,
          alignment: settings.alignment || DEFAULTS.alignment,
          width: settings.width || DEFAULTS.width,
          height: settings.height || DEFAULTS.height,
        },
        mapSettings: settings.mapSettings,
      },
      section: 'BlockToolbar_Section_Advanced',
    },
  ];
};

export default createInsertButtons;
