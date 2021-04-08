/* eslint-disable fp/no-delete */
import { Node_Type, Decoration_Type } from 'ricos-schema';
import { cloneDeep, has } from 'lodash';
import {
  ENTITY_DECORATION_TO_DATA_FIELD,
  FROM_RICOS_DECORATION_TYPE,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DATA_FIELD,
} from '../consts';

export const convertNodeToDraftData = node => {
  const { type } = node;
  const draftPluginType = FROM_RICOS_ENTITY_TYPE[type];
  const dataFieldName = TO_RICOS_DATA_FIELD[draftPluginType];
  return convertNodeDataToDraft(type, node[dataFieldName]);
};

export const convertDecorationToDraftData = decoration => {
  const { type } = decoration;
  const dataFieldName = ENTITY_DECORATION_TO_DATA_FIELD[FROM_RICOS_DECORATION_TYPE[type]];
  return convertDecorationDataToDraft(type, decoration[dataFieldName]);
};

export const convertNodeDataToDraft = (nodeType: Node_Type, data) => {
  const newData = cloneDeep(data);
  const converters = {
    [Node_Type.VIDEO]: convertVideoData,
    [Node_Type.DIVIDER]: convertDividerData,
    [Node_Type.FILE]: convertFileData,
    [Node_Type.IMAGE]: convertImageData,
    [Node_Type.POLL]: convertPollData,
    [Node_Type.VERTICAL_EMBED]: convertVerticalEmbedData,
    [Node_Type.LINK_PREVIEW]: convertLinkPreviewData,
    [Node_Type.FILE]: convertFileData,
    [Node_Type.BUTTON]: convertButtonData,
    [Node_Type.HTML]: convertHTMLData,
  };
  if (newData.containerData && nodeType !== Node_Type.DIVIDER) {
    convertContainerData(newData);
  }
  if (nodeType in converters) {
    const convert = converters[nodeType];
    convert(newData);
  }
  return JSON.parse(JSON.stringify(newData));
};

export const convertDecorationDataToDraft = (decorationType: Decoration_Type, data) => {
  const converters = {
    [Decoration_Type.MENTION]: convertMention,
  };
  if (decorationType in converters) {
    const convert = converters[decorationType];
    const newData = cloneDeep(data);
    convert(newData);
    return newData;
  }
  return data;
};

const convertContainerData = data => {
  const { width, alignment, spoiler } = data.containerData;
  data.config = Object.assign(
    {},
    data.config,
    width?.type && { size: constantToKebabCase(width.type) },
    width?.customWidth && { width: width.customWidth },
    alignment && { alignment: constantToKebabCase(alignment) },
    spoiler && {
      spoiler: {
        enabled: true,
        description: spoiler.description,
        buttonContent: spoiler.buttonText,
      },
    }
  );
  delete data.containerData;
};

const convertVideoData = data => {
  const videoSrc = data.video.src;
  if (videoSrc.url) {
    data.src = videoSrc.url;
    const { src, width, height } = data.thumbnail;
    data.metadata = { thumbnail_url: src.url, width, height };
  } else if (videoSrc.custom) {
    const { src, width, height } = data.thumbnail;
    data.src = {
      pathname: videoSrc.custom,
      thumbnail: { pathname: src.custom, width, height },
    };
  }
  delete data.video;
  delete data.thumbnail;
};

const convertDividerData = data => {
  has(data, 'type') && (data.type = data.type.toLowerCase());
  data.config = { textWrap: 'nowrap' };
  if (has(data, 'width')) {
    data.config.size = data.width.toLowerCase();
    delete data.width;
  }
  if (has(data, 'alignment')) {
    data.config.alignment = data.alignment.toLowerCase();
    delete data.alignment;
  }
  delete data.containerData;
};

const convertImageData = data => {
  const { link, config, disableExpand, image, altText, caption } = data;
  const { src, width, height } = image;
  data.src = { id: src.custom, file_name: src.custom, width, height };
  const links = link?.anchor ? { anchor: link?.anchor } : { link };
  data.config = { ...(config || {}), ...links, disableExpand };
  data.metadata = (altText || caption) && { caption, alt: altText };
  delete data.disableExpand;
  delete data.image;
  delete data.link;
  delete data.caption;
  delete data.altText;
};

const convertPollData = data => {
  has(data, 'layout.poll.type') && (data.layout.poll.type = data.layout.poll.type.toLowerCase());
  has(data, 'layout.poll.direction') &&
    (data.layout.poll.direction = data.layout.poll.direction.toLowerCase());
  has(data, 'design.poll.backgroundType') &&
    (data.design.poll.backgroundType = data.design.poll.backgroundType.toLowerCase());
};

const convertVerticalEmbedData = data => {
  has(data, 'type') && (data.type = data.type.toLowerCase());
};

const convertLinkPreviewData = data => {
  if (has(data, 'thumbnailUrl')) {
    data.thumbnail_url = data.thumbnailUrl;
    delete data.thumbnailUrl;
  }
  if (has(data, 'providerUrl')) {
    data.provider_url = data.providerUrl;
    delete data.providerUrl;
  }
};

const convertMention = data => {
  data.mention = { slug: data.slug, name: data.name };
  delete data.name;
  delete data.slug;
};

const convertFileData = data => {
  const { url, custom } = data.src;
  data.url = url;
  data.id = custom;
  delete data.src;
};

const convertButtonData = data => {
  const { link, text, styles } = data;
  const { borderRadius, borderWidth, backgroundColor, textColor, borderColor } = styles;
  const { url, rel, target } = link || {};
  data.button = {
    settings: {
      buttonText: text,
      ...(url ? { url, rel: rel === 'nofollow', target: target === '_blank' } : {}),
    }, // @shaulgo please review logic
    design: {
      borderRadius,
      borderWidth,
      background: backgroundColor,
      color: textColor,
      borderColor,
    },
  };
  delete data.link;
  delete data.text;
  delete data.type;
  delete data.styles;
};

const convertHTMLData = data => {
  delete data.config.size;
};

const constantToKebabCase = (str: string) => str.toLowerCase().replace('_', '-');
