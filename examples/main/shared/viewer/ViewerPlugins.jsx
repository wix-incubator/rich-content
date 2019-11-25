import theme from '../theme/theme';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { dividerTypeMapper } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { HTML_TYPE, htmlTypeMapper } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { LINK_TYPE, linkTypeMapper } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer';
import {
  galleryTypeMapper,
  GALLERY_TYPE,
} from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/dist/module.viewer';
import { HashtagDecorator } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';

import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'wix-rich-content-plugin-headers-markdown';
import { CodeBlockDecorator } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import {
  MENTION_TYPE,
  mentionsTypeMapper,
} from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import {
  fileUploadTypeMapper,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

import {
  viewerCustomForegroundStyleFn,
  styleSelectionPredicate,
  viewerCustomBackgroundStyleFn,
} from '../../src/text-color-style-fn';

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
import 'wix-rich-content-plugin-mentions/dist/styles.min.css';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import 'wix-rich-content-plugin-map/dist/styles.min.css';
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import 'wix-rich-content-plugin-giphy/dist/styles.min.css';

import { getBaseUrl } from '../../src/utils';

const linkPluginSettings = {
  onClick: (event, url) => console.log('link clicked!', url),
};
const mentionsPluginSettings = {
  onMentionClick: mention => console.log('mention clicked!', mention),
  getMentionLink: () => '/link/to/mention',
};

export const typeMappers = [
  videoTypeMapper,
  buttonTypeMapper,
  dividerTypeMapper,
  htmlTypeMapper,
  linkTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

const uiSettings = {
  // disableRightClick: true,
};

export const config = {
  [GALLERY_TYPE]: {
    scrollingElement: () =>
      typeof window !== 'undefined' && document.getElementsByClassName('viewer-example')[0],
  },
  [HEADERS_MARKDOWN_TYPE]: {
    hideMarkdown: true,
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  [HTML_TYPE]: {
    htmlIframeSrc: `${getBaseUrl()}/static/html-plugin-embed.html`,
  },
  [LINK_TYPE]: linkPluginSettings,
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
  },
  uiSettings,
};

export const getInlineStyleMappers = raw => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
];

export const decorators = [
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
