import { get, isEmpty } from 'lodash';
import { BUTTONS, PluginSettingsIcon, getModalStyles } from 'wix-rich-content-common';
import { Modals } from '../modals';
import { MediaReplaceIcon, ImageEditorIcon } from '../icons';

const removeEmpty = list => list.filter(item => !!item);

export default ({ t, anchorTarget, relValue, uiSettings, isMobile, settings = {} }) => {
  const icons = get(settings, 'toolbar.icons', {});
  const modalStyles = getModalStyles({ isMobile });
  const imageEditorStyles = getModalStyles({
    customStyles: { content: { maxWidth: '100%', background: 'transparent' } },
  });
  const { imageEditorWixSettings, onImageEditorOpen } = settings;
  const imageEditorButton = imageEditorWixSettings
    ? {
        keyName: 'imageEditor',
        type: BUTTONS.EXTERNAL_MODAL,
        icon: icons.imageEditor || ImageEditorIcon,
        modalName: Modals.IMAGE_EDITOR,
        modalStyles: imageEditorStyles,
        t,
        imageEditorWixSettings,
        onImageEditorOpen,
        mobile: false,
        tooltipTextKey: 'ImageEditorButton_Tooltip',
        mapComponentDataToButtonProps: componentData => ({
          disabled: isEmpty(componentData.src),
        }),
      }
    : null;

  const buttons = [
    { keyName: 'sizeOriginal', type: BUTTONS.SIZE_ORIGINAL, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'link', type: BUTTONS.LINK, mobile: false },
    imageEditorButton,
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: icons.settings || PluginSettingsIcon,
      modalName: Modals.IMAGE_SETTINGS,
      modalStyles,
      anchorTarget,
      relValue,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      uiSettings,
    },
    {
      keyName: 'replace',
      type: BUTTONS.FILES,
      onFilesSelected: (pubsub, files) => {
        if (files.length > 0) {
          pubsub.getBlockHandler('handleFilesSelected')(files);
        }
      },
      icon: icons.replace || MediaReplaceIcon,
      mobile: true,
      tooltipTextKey: 'ReplaceImageButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];

  return removeEmpty(buttons);
};
