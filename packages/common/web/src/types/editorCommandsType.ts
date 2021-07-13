/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CODE_BLOCK_TYPE,
  RICOS_DIVIDER_TYPE,
  DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  FILE_UPLOAD_TYPE,
  RICOS_GALLERY_TYPE,
  GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  GIPHY_TYPE,
  RICOS_HTML_TYPE,
  HTML_TYPE,
  RICOS_IMAGE_TYPE,
  IMAGE_TYPE,
  RICOS_VIDEO_TYPE,
  VIDEO_TYPE,
  RICOS_POLL_TYPE,
  POLL_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  UNSTYLED,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  BLOCKQUOTE,
  HEADER_BLOCK,
} from 'ricos-content';
import {
  DividerData,
  GiphyData,
  HTMLData,
  GalleryData,
  PollData,
  VideoData,
  FileData,
  LinkData,
  ImageData,
  ColorData,
} from 'ricos-schema';
import { MentionData } from './pluginTypes';
import { TextAlignment, InlineStyle } from './commonTypes';

export type ColorType = typeof RICOS_TEXT_COLOR_TYPE | typeof RICOS_TEXT_HIGHLIGHT_TYPE;

type PluginsList = string[];

type TextBlockType =
  | typeof UNSTYLED
  | typeof NUMBERED_LIST_TYPE
  | typeof BULLET_LIST_TYPE
  | typeof CODE_BLOCK_TYPE
  | typeof BLOCKQUOTE
  | typeof HEADER_BLOCK.ONE
  | typeof HEADER_BLOCK.TWO
  | typeof HEADER_BLOCK.THREE
  | typeof HEADER_BLOCK.FOUR
  | typeof HEADER_BLOCK.FIVE
  | typeof HEADER_BLOCK.SIX;

type Selection = {
  getIsFocused?: boolean;
  getIsCollapsed?: boolean;
};

type draftSelection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

interface PluginsDataMap {
  [RICOS_DIVIDER_TYPE]?: DividerData;
  [DIVIDER_TYPE]?: any;
  [RICOS_GIPHY_TYPE]?: GiphyData;
  [GIPHY_TYPE]?: any;
  [RICOS_HTML_TYPE]?: HTMLData;
  [HTML_TYPE]?: any;
  [RICOS_GALLERY_TYPE]?: GalleryData;
  [GALLERY_TYPE]?: any;
  [RICOS_POLL_TYPE]?: PollData;
  [POLL_TYPE]?: any;
  [RICOS_VIDEO_TYPE]?: VideoData;
  [VIDEO_TYPE]?: any;
  [RICOS_FILE_TYPE]?: FileData;
  [FILE_UPLOAD_TYPE]?: any;
  [RICOS_IMAGE_TYPE]?: ImageData;
  [IMAGE_TYPE]?: any;
}

export interface DecorationsDataMap {
  [RICOS_LINK_TYPE]?: LinkData;
  [RICOS_MENTION_TYPE]?: MentionData;
  [RICOS_TEXT_COLOR_TYPE]?: { color?: ColorData['foreground'] };
  [RICOS_TEXT_HIGHLIGHT_TYPE]?: { color?: ColorData['background'] };
  [RICOS_INDENT_TYPE]?: number;
  [RICOS_LINE_SPACING_TYPE]?: any;
}

export interface EditorCommands {
  getSelection: () => Selection;
  getAnchorableBlocks: () => {
    anchorableBlocks: any[];
    pluginsIncluded: string[];
  };
  getColor: (colorType: ColorType) => string | undefined;
  getTextAlignment: () => TextAlignment;
  hasInlineStyle: (style: InlineStyle) => boolean;
  isBlockTypeSelected: (type: TextBlockType) => boolean;
  isUndoStackEmpty: () => boolean;
  isRedoStackEmpty: () => boolean;
  hasLinkInSelection: () => boolean;
  getLinkDataInSelection: () => any;
  getSelectedData: () => any;
  getPluginsList: (settings?: { isRicosSchema?: boolean }) => PluginsList;
  getBlockSpacing: () => any;
  saveEditorState: () => void;
  loadEditorState: () => void;
  saveSelectionState: () => void;
  loadSelectionState: () => void;
  insertDecoration: <K extends keyof DecorationsDataMap>(
    type: K,
    data?: DecorationsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => void;
  triggerDecoration: <K extends keyof Pick<DecorationsDataMap, typeof RICOS_MENTION_TYPE>>(
    type: K
  ) => void;
  deleteDecoration: <
    K extends keyof Omit<
      DecorationsDataMap,
      typeof RICOS_MENTION_TYPE | typeof RICOS_INDENT_TYPE | typeof RICOS_LINE_SPACING_TYPE
    >
  >(
    type: K
  ) => void;
  insertBlock: <K extends keyof PluginsDataMap>(
    type: K,
    data?: PluginsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => string;
  setBlock: <K extends keyof PluginsDataMap>(
    blockKey: string,
    type: K,
    data?: PluginsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => void;
  deleteBlock: (blockKey: string) => void;
  undo: () => void;
  redo: () => void;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  setBlockType: (type: TextBlockType) => void;
  setTextAlignment: (textAlignment: TextAlignment) => void;
  _setSelection: (blockKey: string, selection: draftSelection) => void;
}
