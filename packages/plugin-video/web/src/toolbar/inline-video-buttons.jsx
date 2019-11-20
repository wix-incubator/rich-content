import { get } from 'lodash';
import { BUTTONS, getModalStyles, decorateComponentWithProps } from 'wix-rich-content-common';
import { MediaReplaceIcon } from '../icons';
import VideoSelectionInputModal from './videoSelectionInputModal';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';

export default ({ t, settings, isMobile }) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const icon = get(settings, 'toolbar.icons.replace', MediaReplaceIcon);
  const customStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) &&
    (settings.handleFileSelection || settings.handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;
  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(VideoSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
      mobile: true,
      tooltipTextKey: 'ReplaceVideoButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
