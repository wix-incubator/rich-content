import { DEFAULTS } from '../video-component';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-common';
import VideoURLInputModal from './videoURLInputModal';
import { InsertPluginIcon } from '../icons';

const modalCustomStyle = {
  content:
  {
    maxWidth: '460px',
    minHeight: '262px'
  }
};

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: VideoURLInputModal,
      modalStyles: getModalStyles({ customStyles: modalCustomStyle, fullScreen: false }),
      helpers,
    },
  ];
};
