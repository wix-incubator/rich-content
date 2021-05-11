import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-plugin-commons';
import { getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { ManageMediaIcon, UploadIcon } from '../icons';
import { getGalleryLayouts, switchLayout, getCurrentLayout } from '../layout-helper';
import {
  CreateInlineButtons,
  TranslationFunction,
  AnchorTarget,
  RelValue,
} from 'wix-rich-content-common';
import { GalleryPluginEditorConfig } from '../types';

const createInlineButtons: CreateInlineButtons = ({
  t,
  anchorTarget,
  relValue,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  isMobile: boolean;
}) => {
  const modalStyles = getModalStyles({ isMobile });
  const icons = settings?.toolbar?.icons || {};
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
    {
      keyName: 'add',
      type: BUTTONS.FILES,
      icon: icons.add || UploadIcon,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          pubsub.getBlockHandler('handleFilesSelected')(files);
        }
      },
      mobile: false,
      multiple: true,
      tooltipTextKey: 'UploadMediaButton_Tooltip',
      settings,
    },
    { type: BUTTONS.SEPARATOR, mobile: false, keyName: 'separator0' },
    {
      keyName: 'layout',
      type: BUTTONS.DROPDOWN,
      options: getGalleryLayouts(t),
      onChange: switchLayout,
      getValue: getCurrentLayout,
      mobile: true,
      tooltipTextKey: 'GalleryPlugin_Layout_Select_Tooltip',
      t,
    },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator3', type: BUTTONS.SEPARATOR, mobile: true },
    ...spoilerButton,
    {
      keyName: 'manage_media',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.manage_media || ManageMediaIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'manage_media',
      modalStyles,
      t,
      mobile: true,
      tooltipTextKey: 'ManageMediaButton_Tooltip',
      anchorTarget,
      relValue,
      accept: settings.accept,
    },
    {
      keyName: 'advanced_settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.advanced_settings || PluginSettingsIcon,
      modalName: Modals.GALLERY_SETTINGS,
      activeTab: 'settings',
      modalStyles,
      switchLayout,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      anchorTarget,
      relValue,
      accept: settings.accept,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
export default createInlineButtons;
