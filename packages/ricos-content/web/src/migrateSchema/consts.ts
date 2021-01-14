import {
  MENTION_TYPE,
  LINK_TYPE,
  IMAGE_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  POLL_TYPE,
  SOUND_CLOUD_TYPE,
  VIDEO_TYPE,
  VERTICAL_EMBED_TYPE,
  HEADINGS_DROPDOWN_TYPE,
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  CODE_BLOCK_TYPE,
  HASHTAG_TYPE,
  IMAGE_TYPE_LEGACY,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
  SPOILER_TYPE,
  ACCORDION_TYPE,
  EXTERNAL_LINK_TYPE,
  EXTERNAL_MENTIONS_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  UNDO_REDO_TYPE,
  VIDEO_TYPE_LEGACY,
  TABLE_TYPE,
  ANCHOR_TYPE,
  RICOS_LINK_BUTTON_TYPE,
  RICOS_ACTION_BUTTON_TYPE,
  RICOS_CODE_BLOCK_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HASHTAG_TYPE,
  RICOS_HTML_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_HEADINGS_DROPDOWN_TYPE,
  RICOS_SPOILER_TYPE,
  RICOS_ACCORDION_TYPE,
  RICOS_EXTERNAL_LINK_TYPE,
  RICOS_LINK_TYPE,
  RICOS_LINK_PREVIEW_TYPE,
  RICOS_MAP_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_SOUND_CLOUD_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_UNDO_REDO_TYPE,
  RICOS_VERTICAL_EMBED_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
  RICOS_TABLE_TYPE,
  RICOS_ANCHOR_TYPE,
  RICOS_EXTERNAL_MENTION_TYPE,
  RICOS_FILE_TYPE,
} from '../consts';
import toCamelCase from 'to-camel-case';

export enum BlockType {
  Unstyled = 'unstyled',
  HeaderOne = 'header-one',
  HeaderTwo = 'header-two',
  HeaderThree = 'header-three',
  HeaderFour = 'header-four',
  HeaderFive = 'header-five',
  HeaderSix = 'header-six',
  UnorderedListItem = 'unordered-list-item',
  OrderedListItem = 'ordered-list-item',
  Blockquote = 'blockquote',
  CodeBlock = 'code-block',
  Atomic = 'atomic',
}

export enum NodeType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  UnorderedList = 'bullet_list',
  OrderedList = 'ordered_list',
  ListItem = 'list_item',
  Blockquote = 'blockquote',
  CodeBlock = 'codeblock',
  Text = 'text',
}

export enum HeaderLevel {
  'header-one' = 1,
  'header-two' = 2,
  'header-three' = 3,
  'header-four' = 4,
  'header-five' = 5,
  'header-six' = 6,
}

export const FROM_DRAFT_LIST_TYPE = {
  [BlockType.UnorderedListItem]: NodeType.UnorderedList,
  [BlockType.OrderedListItem]: NodeType.OrderedList,
};

export const TO_RICOS_PLUGIN_TYPE_MAP = {
  [LINK_BUTTON_TYPE]: RICOS_LINK_BUTTON_TYPE,
  [ACTION_BUTTON_TYPE]: RICOS_ACTION_BUTTON_TYPE,
  [CODE_BLOCK_TYPE]: RICOS_CODE_BLOCK_TYPE,
  [DIVIDER_TYPE]: RICOS_DIVIDER_TYPE,
  [FILE_UPLOAD_TYPE]: RICOS_FILE_TYPE,
  [GALLERY_TYPE]: RICOS_GALLERY_TYPE,
  [GIPHY_TYPE]: RICOS_GIPHY_TYPE,
  [HASHTAG_TYPE]: RICOS_HASHTAG_TYPE,
  [HTML_TYPE]: RICOS_HTML_TYPE,
  [IMAGE_TYPE]: RICOS_IMAGE_TYPE,
  [IMAGE_TYPE_LEGACY]: RICOS_IMAGE_TYPE,
  [INDENT_TYPE]: RICOS_INDENT_TYPE,
  [LINE_SPACING_TYPE]: RICOS_LINE_SPACING_TYPE,
  [HEADINGS_DROPDOWN_TYPE]: RICOS_HEADINGS_DROPDOWN_TYPE,
  [ACCORDION_TYPE]: RICOS_ACCORDION_TYPE,
  // TODO: are both types needed?
  [EXTERNAL_LINK_TYPE]: RICOS_EXTERNAL_LINK_TYPE,
  [LINK_TYPE]: RICOS_LINK_TYPE,
  [LINK_PREVIEW_TYPE]: RICOS_LINK_PREVIEW_TYPE,
  [MAP_TYPE]: RICOS_MAP_TYPE,
  // TODO: are both types needed?
  [EXTERNAL_MENTIONS_TYPE]: RICOS_EXTERNAL_MENTION_TYPE,
  [MENTION_TYPE]: RICOS_MENTION_TYPE,
  [SOUND_CLOUD_TYPE]: RICOS_SOUND_CLOUD_TYPE,
  [TEXT_COLOR_TYPE]: RICOS_TEXT_COLOR_TYPE,
  [TEXT_HIGHLIGHT_TYPE]: RICOS_TEXT_HIGHLIGHT_TYPE,
  [UNDO_REDO_TYPE]: RICOS_UNDO_REDO_TYPE,
  [VERTICAL_EMBED_TYPE]: RICOS_VERTICAL_EMBED_TYPE,
  [VIDEO_TYPE]: RICOS_VIDEO_TYPE,
  [VIDEO_TYPE_LEGACY]: RICOS_VIDEO_TYPE,
  [POLL_TYPE]: RICOS_POLL_TYPE,
  [TABLE_TYPE]: RICOS_TABLE_TYPE,
  [ANCHOR_TYPE]: RICOS_ANCHOR_TYPE,
};

// [IMAGE_TYPE]: 'ricosImage'
export const TO_RICOS_ENTITY_TYPE_MAP = Object.fromEntries(
  Object.entries(TO_RICOS_PLUGIN_TYPE_MAP).map(([key, value]) => [key, toCamelCase(value)])
);

const DUPLICATE_KEYS = ['EMOJI_TYPE', IMAGE_TYPE_LEGACY, VIDEO_TYPE_LEGACY];

// 'ricos_image': IMAGE_TYPE
export const FROM_RICOS_ENTITY_TYPE_MAP = Object.fromEntries(
  Object.entries(TO_RICOS_PLUGIN_TYPE_MAP)
    .filter(([key]) => !DUPLICATE_KEYS.includes(key))
    .map(([key, value]) => [value, key])
);

export const TO_RICOS_DECORATION_TYPE = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  [SPOILER_TYPE]: RICOS_SPOILER_TYPE,
  [ANCHOR_TYPE]: RICOS_ANCHOR_TYPE,
  [MENTION_TYPE]: RICOS_MENTION_TYPE,
  [LINK_TYPE]: RICOS_LINK_TYPE,
};

// bold: BOLD
export const FROM_RICOS_DECORATION_TYPE = Object.fromEntries(
  Object.entries(TO_RICOS_DECORATION_TYPE).map(([key, value]) => [value, key])
);

export const DRAFT_BLOCK_TYPE_TO_DATA_FIELD = {
  [BlockType.Unstyled]: 'ricosParagraph',
  [BlockType.UnorderedListItem]: 'ricosParagraph',
  [BlockType.OrderedListItem]: 'ricosParagraph',
  [BlockType.HeaderOne]: 'ricosHeading',
  [BlockType.HeaderTwo]: 'ricosHeading',
  [BlockType.HeaderThree]: 'ricosHeading',
  [BlockType.HeaderFour]: 'ricosHeading',
  [BlockType.HeaderFive]: 'ricosHeading',
  [BlockType.HeaderSix]: 'ricosHeading',
  [BlockType.CodeBlock]: 'ricosCode',
  [BlockType.Blockquote]: 'ricosQuote',
};

export const ENTITY_DECORATION_TO_MUTABILITY = {
  [ANCHOR_TYPE]: 'MUTABLE',
  [LINK_TYPE]: 'MUTABLE',
  [MENTION_TYPE]: 'SEGMENTED',
  EMOJI_TYPE: 'IMMUTABLE',
};

export const ENTITY_DECORATION_TO_DATA_FIELD = {
  [ANCHOR_TYPE]: toCamelCase(RICOS_ANCHOR_TYPE),
  [LINK_TYPE]: toCamelCase(RICOS_LINK_TYPE),
  [MENTION_TYPE]: toCamelCase(RICOS_MENTION_TYPE),
  EMOJI_TYPE: 'ricosEmoji',
};
