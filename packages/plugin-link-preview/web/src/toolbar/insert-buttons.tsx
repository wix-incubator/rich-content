import { DEFAULTS } from '../defaults';
import { getModalStyles, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  PinterestIcon,
  YoutubeIcon,
} from '../icons';
import EmbedURLInputModal from './embedURLInputModal';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'t' | 'settings' | 'isMobile'> = ({
  t,
  settings,
  isMobile,
}) => {
  const content = isMobile
    ? {
        maxWidth: 580,
        minHeight: '100%',
        minWidth: '100%',
        margin: 0,
        alignContent: 'center',
        top: 0,
        transform: 'none',
      }
    : { maxWidth: 580, minHeight: 348 };
  const { exposeEmbedButtons = [] } = settings;
  const socialIconsMap = {
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    TikTok: TikTokIcon,
    Pinterest: PinterestIcon,
    YouTube: YoutubeIcon,
  };

  return exposeEmbedButtons.map(socialType => {
    return {
      type: BUTTON_TYPES.MODAL,
      name: `${socialType}_InsertButton`,
      tooltip: t(`EmbedURL_Social_${socialType}_Title`),
      getIcon: () => socialIconsMap[socialType],
      componentData: { ...DEFAULTS, socialType, fetchData: settings.fetchData },
      toolbars: [TOOLBARS.EXTERNAL, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalElement: EmbedURLInputModal,
      modalStyles: getModalStyles({ customStyles: { content }, fullScreen: false, isMobile }),
      section: 'BlockToolbar_Section_Embed_Anywhere',
    };
  });
};

export default createInsertButtons;
