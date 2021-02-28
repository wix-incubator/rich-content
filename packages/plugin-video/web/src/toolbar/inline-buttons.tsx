import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { MediaReplaceIcon } from '../icons';
import VideoSelectionInputModal from './videoSelectionInputModal';
import { Modals } from '../modals';

import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';
import { CreateInlineButtons, TranslationFunction } from 'wix-rich-content-common';
import { VideoPluginEditorConfig } from '../types';

const createInlineButtons: CreateInlineButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
}) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;
  const customStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) &&
    (settings.handleFileSelection || settings.handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;
  const spoilerButton = settings.spoiler
    ? [
        {
          keyName: 'spoiler',
          type: BUTTONS.SPOILER,
          mobile: true,
        },
      ]
    : [];

  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    ...spoilerButton,
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(VideoSelectionInputModal, {
        ...settings,
      }),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
      mobile: true,
      tooltipTextKey: 'ReplaceVideoButton_Tooltip',
      t,
    },
    {
      keyName: 'settings',
      type: BUTTONS.VIDEO_SETTINGS,
      icon: PluginSettingsIcon,
      modalName: Modals.VIDEO_SETTINGS,
      modalStyles: getModalStyles({
        isMobile,
      }),
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      settings,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
