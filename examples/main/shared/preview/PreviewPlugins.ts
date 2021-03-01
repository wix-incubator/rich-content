import theme from '../theme/theme';
import { VIDEO_TYPE, videoTypeMapper } from 'ricos/video/viewer';
import { dividerTypeMapper } from 'ricos/divider/viewer';
import { htmlTypeMapper } from 'ricos/html/viewer';
import { soundCloudTypeMapper } from 'ricos/sound-cloud/viewer';
import { LINK_TYPE, linkTypeMapper } from 'ricos/link/viewer';
import { LINK_PREVIEW_TYPE, linkPreviewTypeMapper } from 'ricos/link-preview/viewer';
import { imageTypeMapper } from 'ricos/image/viewer';
import { galleryTypeMapper, GALLERY_TYPE } from 'ricos/gallery/viewer';
import { mapTypeMapper } from 'ricos/map/viewer';
import { giphyTypeMapper, GIPHY_TYPE } from 'ricos/giphy/viewer';
import { buttonTypeMapper } from 'ricos/button/viewer';
import { HashtagDecorator } from 'ricos/hashtag/viewer';

import {
  createHeadersMarkdownDecorator,
  HEADERS_MARKDOWN_TYPE,
} from 'ricos/headers-markdown/editor';
import { CodeBlockDecorator } from 'ricos/code-block/viewer';
import { MENTION_TYPE, mentionsTypeMapper } from 'ricos/mention/viewer';
import { fileUploadTypeMapper, FILE_UPLOAD_TYPE } from 'ricos/file/viewer';
import {
  textColorInlineStyleMapper,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textHighlightInlineStyleMapper,
} from 'ricos/text-color/viewer';

import {
  viewerCustomForegroundStyleFn,
  viewerCustomBackgroundStyleFn,
  styleSelectionPredicate,
} from '../../src/text-color-style-fn';

import { getBaseUrl } from '../../src/utils';
import { InlineStyleMapper, InlineStyleMapperFunction, RicosContent } from 'ricos/common';

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
  linkPreviewTypeMapper,
  soundCloudTypeMapper,
  mentionsTypeMapper,
  imageTypeMapper,
  galleryTypeMapper,
  mapTypeMapper,
  fileUploadTypeMapper,
  giphyTypeMapper,
];

export const config = {
  [GALLERY_TYPE]: {
    scrollingElement:
      typeof window !== 'undefined' && document.getElementsByClassName('preview-example')[0],
  },
  [GIPHY_TYPE]: {
    giphySdkApiKey: process.env.GIPHY_API_KEY,
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  // [HTML_TYPE]: {},
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
  },
  [VIDEO_TYPE]: {
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  },
};

export const getInlineStyleMappers = (raw: RicosContent) => [
  textColorInlineStyleMapper(config, raw),
  textHighlightInlineStyleMapper(config, raw),
];

export const getConfig = (additionalConfig = {}) => {
  const _config = { ...config };
  Object.keys(additionalConfig).forEach(key => {
    _config[key] = { ...(_config[key] || {}), ...(additionalConfig[key] || {}) };
  });

  return _config;
};

export const decorators = [
  new HashtagDecorator({
    theme,
    onClick: (event, text) => {
      event.preventDefault();
      console.log(`'${text}' hashtag clicked!`);
    },
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
  }),
];
