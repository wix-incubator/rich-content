import { DEFAULTS } from '../soundCloud';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import SoundCloudURLInputModal from './soundCloudURLInputModal';
import { InsertPluginIcon } from '../icons';
import { CreateInsertButtons, ModalStyles } from 'wix-rich-content-common';

let content: ModalStyles['content'] = { maxWidth: '580px', minHeight: '348px' };

const createInsertButtons: CreateInsertButtons<'helpers' | 't' | 'isMobile' | 'settings'> = ({
  helpers,
  t,
  isMobile,
  settings,
}) => {
  if (isMobile) {
    content = {
      ...content,
      minHeight: '100%',
      minWidth: '100%',
      margin: 0,
      alignContent: 'center',
      top: 0,
      transform: 'none',
    };
  }
  const customStyles = { content };
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: 'modal',
      name: 'SoundcloudPlugin_InsertButton',
      tooltipText: t('SoundCloudPlugin_InsertButton_Tooltip'),
      Icon: icon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: SoundCloudURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
      helpers,
      section: 'BlockToolbar_Section_Embed_Anywhere',
    },
  ];
};

export default createInsertButtons;
