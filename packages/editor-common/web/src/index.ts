/* eslint-disable no-duplicate-imports */
export * from './Icons';

// Components
export { default as InfoIcon } from './Components/InfoIcon';
export { default as Checkbox } from './Components/Checkbox';

export { default as Dropdown } from './Components/Dropdown';

export { default as FocusManager } from './Components/FocusManager';
export { default as LinkPanel } from './Components/LinkComponents/LinkPanel';
export { default as LinkButton } from './Components/LinkComponents/LinkButton';
export { default as LinkPanelContainer } from './Components/LinkComponents/LinkPanelContainer';
export { default as RadioGroup } from './Components/RadioGroup';
export { default as Separator } from './Components/Separator';
export { default as ToolbarButton } from './Components/ToolbarButton';
export { default as InlineToolbarButton } from './Components/InlineToolbarButton';
export { default as TextSearchInput } from './Components/TextSearchInput';

//Modals
export { default as EditorModals } from './Modals/EditorModals';
export { default as RichContentModal } from './Modals/RichContentModal';

//Utils
export { default as decorateComponentWithProps } from './Utils/decorateComponentWithProps';
export { getToolbarTheme } from './Utils/getToolbarTheme';
export { getModalStyles, getBottomToolbarModalStyles } from './Utils/getModalStyles';
export { undo, redo } from './Utils/handleUndoRedoCommands';

export {
  updateLinkAtCurrentSelection,
  insertLinkAtCurrentSelection,
  insertLinkInPosition,
  getEntityData,
  insertCustomLink,
  hasLinksInBlock,
  getLinkRangesInBlock,
  fixPastedLinks,
  hasLinksInSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  getTextAlignment,
  setTextAlignment,
  getAnchorBlockData,
  mergeBlockData,
  isAtomicBlockFocused,
  updateEntityData,
  setEntityData,
  replaceWithEmptyBlock,
  deleteBlock,
  getBlockAtStartOfSelection,
  getSelectedBlocks,
  createEntity,
  createBlockAndFocus,
  createBlock,
  getBlockInfo,
  getFocusedBlockKey,
  createCalcContentDiff,
  getPostContentSummary,
  createSelection,
  getBlockType,
  hasInlineStyle,
  indentSelectedBlocks,
  isTypeText,
  setForceSelection,
  deleteBlockText,
  insertString,
  deleteCharacterBeforeCursor,
  createLinkEntityData,
  getCharacterBeforeSelection,
  isPluginFocused,
  getSelectionRange,
  isInSelectionRange,
  cloneDeepWithoutEditorState,
  getEntities,
  isCursorAtStartOfContent,
  isCursorAtFirstLine,
  selectAllContent,
} from './Utils/draftUtils';
export { triggerMention, insertMention } from './Utils/mentionUtils';
export { isiOS } from './Utils/isiOS';
export { mergeToolbarSettings } from './Utils/mergeToolbarSettings';
export {
  COMMANDS,
  TEXT_TYPES,
  MODIFIERS,
  TOOLBARS,
  DISPLAY_MODE,
  DECORATION_MODE,
  CHARACTERS,
  FORMATTING_BUTTONS,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
  KEYS_CHARCODE,
} from './consts';

import './draftTypes';

import {
  convertFromRaw as convertFromRawDraft,
  RawDraftContentState,
  ContentState,
} from '@wix/draft-js';
import { DraftContent } from 'wix-rich-content-common';

// makes draft-js's convertFromRaw match our own DraftContent type
export const convertFromRaw = (rawState: DraftContent): ContentState =>
  convertFromRawDraft(rawState as RawDraftContentState);

export {
  convertToRaw,
  getVisibleSelectionRect,
  EditorState,
  SelectionState,
  DefaultDraftBlockRenderMap,
  Modifier,
  RichUtils,
  KeyBindingUtil,
  genKey,
  ContentBlock,
  BlockMapBuilder,
  AtomicBlockUtils,
  ContentState,
  RawDraftContentState,
  EditorChangeType,
  convertFromHTML,
  CharacterMetadata,
  BlockMap,
  getDefaultKeyBinding,
} from '@wix/draft-js';

import DraftOffsetKey from '@wix/draft-js/lib/DraftOffsetKey';
export { DraftOffsetKey };

export { isElementOutOfWindow } from './Utils/overflowUtils';
