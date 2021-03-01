import theme from '../theme/theme';
import { videoTypeMapper, VIDEO_TYPE, pluginVideo } from 'ricos/video/viewer';
import { dividerTypeMapper, pluginDivider } from 'ricos/divider/viewer';
import { htmlTypeMapper, pluginHtml } from 'ricos/html/viewer';
import { soundCloudTypeMapper, pluginSoundCloud } from 'ricos/sound-cloud/viewer';
import { linkTypeMapper, LINK_TYPE, pluginLink } from 'ricos/link/viewer';
import {
  linkPreviewTypeMapper,
  LINK_PREVIEW_TYPE,
  pluginLinkPreview,
} from 'ricos/link-preview/viewer';
import { imageTypeMapper, pluginImage } from 'ricos/image/viewer';
import { tableTypeMapper, pluginTable } from 'ricos/table/viewer';

import { galleryTypeMapper, pluginGallery, GALLERY_TYPE } from 'ricos/gallery/viewer';
import { mapTypeMapper, pluginMap } from 'ricos/map/viewer';
import { giphyTypeMapper, pluginGiphy, GIPHY_TYPE } from 'ricos/giphy/viewer';
import { buttonTypeMapper, pluginActionButton, ACTION_BUTTON_TYPE } from 'ricos/button/viewer';
import { HashtagDecorator, pluginHashtag } from 'ricos/hashtag/viewer';
import { verticalEmbedTypeMapper, pluginVerticalEmbed } from 'ricos/vertical-embed/viewer';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
  pluginHeadersMarkdown,
} from 'ricos/headers-markdown/editor';
import { CodeBlockDecorator, pluginCodeBlock } from 'ricos/code-block/viewer';
import { mentionsTypeMapper, MENTION_TYPE, pluginMentions } from 'ricos/mention/viewer';
import { fileUploadTypeMapper, pluginFileUpload, FILE_UPLOAD_TYPE } from 'ricos/file/viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
  pluginTextColor,
  pluginTextHighlight,
} from 'ricos/text-color/viewer';
import {
  spoilerInlineStyleMapper,
  initSpoilersContentState,
  SpoilerViewerWrapper,
  SPOILER_TYPE,
  pluginSpoiler,
} from 'ricos/spoiler/viewer';
import { accordionTypeMapper, pluginAccordion } from 'ricos/accordion/viewer';

import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../src/text-color-style-fn';

import { pollTypeMapper, pluginPoll, POLL_TYPE } from 'ricos/poll/viewer';

import { RichContentViewerProps } from 'ricos/viewer';
import {
  Decorator,
  HASHTAG_TYPE,
  PluginTypeMapper,
  RicosContent,
  UISettings,
  ViewerPlugin,
} from 'ricos/common';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
  siteUrl: 'http://localhost:3000/', //siteUrl is for anchor SEO
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers: PluginTypeMapper[] = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  tableTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
  pollTypeMapper,
  verticalEmbedTypeMapper,
  accordionTypeMapper,
];

export const uiSettings: UISettings = {
  disableRightClick: true,
};

const config: RichContentViewerProps['config'] = {
  [POLL_TYPE]: {
    siteToken: process.env.POLLS_API_KEY,
    isWebView: false,
  },
  [GALLERY_TYPE]: {},
  [SPOILER_TYPE]: { initSpoilersContentState, SpoilerViewerWrapper },
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  // [HTML_TYPE]: {
  // siteDomain="https://www.wix.com"
  // },
  [LINK_TYPE]: linkPluginSettings,
  [LINK_PREVIEW_TYPE]: {
    enableEmbed: true,
  },
  [MENTION_TYPE]: mentionsPluginSettings,
  [TEXT_HIGHLIGHT_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomBackgroundStyleFn,
  },
  [TEXT_COLOR_TYPE]: {
    styleSelectionPredicate,
    customStyleFn: viewerCustomForegroundStyleFn,
  },
  [FILE_UPLOAD_TYPE]: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
          1000
        )
      ),
    downloadTarget: '_blank',
  },
  [VIDEO_TYPE]: {
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
  uiSettings,
  [ACTION_BUTTON_TYPE]: {
    onClick: () => {
      window.alert('onClick event..');
    },
  },
  [HASHTAG_TYPE]: {
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  },
};

export const viewerPlugins: ViewerPlugin[] = [
  pluginVideo(config[VIDEO_TYPE]),
  pluginActionButton(config[ACTION_BUTTON_TYPE]),
  pluginDivider(),
  pluginHtml(),
  pluginLink(config[LINK_TYPE]),
  pluginLinkPreview(config[LINK_PREVIEW_TYPE]),
  pluginSoundCloud(),
  pluginMentions(),
  pluginImage(),
  pluginTable(),
  pluginGallery(config[GALLERY_TYPE]),
  pluginMap(),
  pluginFileUpload(config[FILE_UPLOAD_TYPE]),
  pluginGiphy(config[GIPHY_TYPE]),
  pluginPoll(config[POLL_TYPE]),
  pluginVerticalEmbed(),
  pluginAccordion(),
  pluginHashtag(config[HASHTAG_TYPE]),
  pluginHeadersMarkdown(),
  pluginCodeBlock(),
  pluginTextColor(config[TEXT_COLOR_TYPE]),
  pluginTextHighlight(config[TEXT_HIGHLIGHT_TYPE]),
  pluginSpoiler(),
];

export const getConfig = (additionalConfig = {}): RichContentViewerProps['config'] => {
  const _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    if (additionalConfig[key]) {
      const orgConfig = config[key] || {};
      _config[key] = { ...orgConfig, ...additionalConfig[key] };
    }
  });

  return _config;
};

export const getInlineStyleMappers = (raw: RicosContent) => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
  spoilerInlineStyleMapper(config, raw),
];

export const decorators: Decorator[] = [
  new HashtagDecorator({
    theme,
    ...config[HASHTAG_TYPE],
  }),
  new CodeBlockDecorator({ theme }),
  createHeadersMarkdownDecorator(config),
];
