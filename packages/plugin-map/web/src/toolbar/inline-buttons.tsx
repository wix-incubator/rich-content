import { BUTTONS, PluginSettingsIcon, SizeSmallCenterIcon } from 'wix-rich-content-plugin-commons';
import { getModalStyles } from 'wix-rich-content-editor-common';
import { MapSettingsModal } from './MapSettingsModal';
import { DEFAULTS } from '../defaults';
import {
  CreateInlineButtons,
  TranslationFunction,
  GetEditorBounds,
  Helpers,
  ComponentData,
} from 'wix-rich-content-common';
import { MapPluginEditorConfig, MAP_TYPE } from '../types';

const getAlignmentButtonPropsFn = (getEditorBounds: GetEditorBounds) => ({
  componentData,
}: {
  componentData: ComponentData;
}) => {
  const MAX_ALIGNMENT_WIDTH = 739;
  const editorBounds = getEditorBounds();
  const maxAlignmentWidth = editorBounds ? editorBounds.width - 1 : MAX_ALIGNMENT_WIDTH;
  return {
    disabled: (componentData?.config?.width || 0) > maxAlignmentWidth,
  };
};

const createInlineButtons: CreateInlineButtons = ({
  settings,
  t,
  helpers,
  getEditorBounds,
  isMobile,
}: {
  t: TranslationFunction;
  settings: MapPluginEditorConfig;
  isMobile: boolean;
  getEditorBounds: GetEditorBounds;
  helpers: Helpers;
}) => {
  const { maxWidth, minWidth, maxHeight, minHeight } = settings;
  const icons = settings?.toolbar?.icons || {};
  return [
    {
      type: BUTTONS.WIDTH,
      getEditorBounds,
      keyName: 'width',
      min: minWidth || DEFAULTS.minWidth,
      mapStoreDataToPanelProps: () => {
        const bounds = getEditorBounds();
        if (bounds && bounds.width) {
          return { max: maxWidth ? Math.min(maxWidth, bounds.width) : bounds.width };
        } else {
          return { max: maxWidth || DEFAULTS.maxWidth };
        }
      },
    },
    {
      type: BUTTONS.HEIGHT,
      keyName: 'height',
      min: minHeight || DEFAULTS.minHeight,
      max: maxHeight || DEFAULTS.maxHeight,
      inputMax: maxHeight || DEFAULTS.maxHeight,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'sizeSmallLeft',
      type: BUTTONS.SIZE_SMALL_LEFT,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
      mobile: false,
    },
    {
      type: BUTTONS.TEXT_ALIGN_CENTER,
      keyName: 'alignCenter',
      icon: icons.alignCenter || SizeSmallCenterIcon,
      mobile: false,
    },
    {
      keyName: 'sizeSmallRight',
      type: BUTTONS.SIZE_SMALL_RIGHT,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
      mobile: false,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.settings || PluginSettingsIcon,
      modalElement: MapSettingsModal,
      modalStyles: getModalStyles({ isMobile }),
      mobile: true,
      tooltipTextKey: 'MapPluginButton_Settings_Tooltip',
      helpers,
      t,
      settings,
      triggerSettingsBi: true,
      pluginId: MAP_TYPE,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
