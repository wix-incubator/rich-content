import { DEFAULTS } from '../video-component';
import {
  getModalStyles,
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import VideoModal from './videoModal';
import { VideoInsertPluginIcon, SoundCloudInsertPluginIcon } from '../icons';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';
import { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import { VideoPluginEditorConfig, videoButtonsTypes } from '../types';

const createInsertButtons: CreateInsertButtons = ({
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
  const componentData =
    settings.disableDownload !== undefined
      ? { ...DEFAULTS, disableDownload: settings.disableDownload }
      : DEFAULTS;

  const {
    exposeButtons = [videoButtonsTypes.video],
    toolbar,
    enableCustomUploadOnMobile,
    handleFileSelection,
    handleFileUpload,
  } = settings || {};
  const icon = toolbar?.icons?.InsertPluginButtonIcon || VideoInsertPluginIcon;
  const customStyles =
    (!isMobile || enableCustomUploadOnMobile) && (handleFileSelection || handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;

  const buttonsMap = {
    [videoButtonsTypes.video]: {
      type: BUTTON_TYPES.MODAL,
      name: INSERT_PLUGIN_BUTTONS.VIDEO,
      tooltip: t('VideoPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      componentData,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(VideoModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
    },
    [videoButtonsTypes.soundCloud]: {
      type: BUTTON_TYPES.MODAL,
      name: INSERT_PLUGIN_BUTTONS.SOUND_CLOUD,
      tooltip: t('SoundCloudPlugin_InsertButton_Tooltip'),
      getIcon: () => SoundCloudInsertPluginIcon,
      componentData: { ...DEFAULTS, type: videoButtonsTypes.soundCloud },
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: decorateComponentWithProps(VideoModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
    },
  };
  return exposeButtons.map(buttonType => buttonsMap[buttonType]);
};

export default createInsertButtons;
