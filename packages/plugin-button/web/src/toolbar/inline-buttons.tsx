import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import ButtonInputModal from './buttonInputModal';
import { CreateInlineButtons } from 'wix-rich-content-common';
import { ButtonPluginEditorConfig, ACTION_BUTTON_TYPE } from '../types';

const DesktopCustomModalStyles = {
  content: {
    width: '420px',
  },
};

const MobileFullScreenCustomStyle = {
  content: {
    width: '100vw',
  },
};

const createInlineButtons: CreateInlineButtons = ({
  settings,
  isMobile,
}: {
  settings: ButtonPluginEditorConfig;
  isMobile: boolean;
}) => {
  const customStyles = isMobile ? MobileFullScreenCustomStyle : DesktopCustomModalStyles;
  const icon = settings?.toolbar?.icons?.['advanced_settings'] || PluginSettingsIcon;
  return [
    { keyName: 'alignLeft', type: BUTTONS.ALIGN_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.ALIGN_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.ALIGN_RIGHT, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalName: Modals.BUTTON_INPUT,
      activeTab: 'advanced_settings',
      modalElement: decorateComponentWithProps(ButtonInputModal, settings),
      modalStyles: getModalStyles({ customStyles, isMobile }),
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      settings,
      isMobile,
      triggerSettingsBi: true,
      pluginId: ACTION_BUTTON_TYPE,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
