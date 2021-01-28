import theme from '../theme/theme';
import { ACTION_BUTTON_TYPE } from 'wix-rich-content-plugin-button/viewer';
import { VIDEO_TYPE, videoTypeMapper } from 'wix-rich-content-plugin-video/viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/viewer';
import { htmlTypeMapper } from 'wix-rich-content-plugin-html/viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/viewer';
import {
  LINK_PREVIEW_TYPE,
  linkPreviewTypeMapper,
} from 'wix-rich-content-plugin-link-preview/viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import { tableTypeMapper } from 'wix-rich-content-plugin-table/viewer';

import { galleryTypeMapper, GALLERY_TYPE } from 'wix-rich-content-plugin-gallery/viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/viewer';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/viewer';
import { verticalEmbedTypeMapper } from 'wix-rich-content-plugin-vertical-embed/viewer';
import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/viewer';
import { MENTION_TYPE, mentionsTypeMapper } from 'wix-rich-content-plugin-mentions/viewer';
import { fileUploadTypeMapper, FILE_UPLOAD_TYPE } from 'wix-rich-content-plugin-file-upload/viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/viewer';
import {
  spoilerInlineStyleMapper,
  initSpoilersContentState,
  SpoilerViewerWrapper,
  SPOILER_TYPE,
} from 'wix-rich-content-plugin-spoiler/viewer';
import { accordionTypeMapper } from 'wix-rich-content-plugin-accordion/viewer';

import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../src/text-color-style-fn';

import { pollTypeMapper, POLL_TYPE } from 'wix-rich-content-plugin-social-polls/viewer';

import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-common/dist/styles.min.css';
import 'wix-rich-content-viewer/dist/styles.min.css';
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-button/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import 'wix-rich-content-plugin-html/dist/styles.min.css';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import 'wix-rich-content-plugin-link/dist/styles.min.css';
import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import 'wix-rich-content-text-selection-toolbar/dist/styles.min.css';
import 'wix-rich-content-plugin-social-polls/dist/styles.min.css';
import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import 'wix-rich-content-plugin-table/dist/styles.min.css';

import { getBaseUrl } from '../../src/utils';
import { RichContentViewerProps } from 'wix-rich-content-viewer';
import { Decorator, PluginTypeMapper, RicosContent, UISettings } from 'wix-rich-content-common';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
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
};

export const getConfig = (additionalConfig = {}): RichContentViewerProps['config'] => {
  let _config = { ...config };
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
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  }),
  new CodeBlockDecorator({ theme }),
  createHeadersMarkdownDecorator(config),
];
