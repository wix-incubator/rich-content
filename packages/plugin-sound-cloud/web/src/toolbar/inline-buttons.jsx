import { get } from 'lodash';
import { BUTTONS, getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { MediaReplaceIcon } from '../icons';

export default ({ t, isMobile, settings }) => {
  const icon = get(settings, 'toolbar.icons.replace', MediaReplaceIcon);
  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSmallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalName: Modals.SOUND_CLOUD_URL_INPUT,
      modalStyles: getModalStyles({ fullScreen: false, isMobile }),
      mobile: true,
      tooltipTextKey: 'ReplaceSoundCloudButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
