/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React, { FC } from 'react';
import {
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_LINK_TYPE,
  InlineStyle,
  DecorationsDataMap,
  TextAlignment,
  ColorType,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
} from 'wix-rich-content-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  TitleIcon,
  TitleOneIcon,
  TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
  LinkIcon,
  TextColorIcon,
  TextHighlightIcon,
  increaseIndentPluginIcon,
  decreaseIndentPluginIcon,
  SpoilerButtonIcon,
  LineSpacingIcon,
  CodeBlockIcon,
} from '../icons';
import HeadingsDropDownPanel from '../modals/heading/HeadingPanel';
import Panel from '../modals/line-spacing/LineSpacingPanel';
import LinkModal from '../modals/link/LinkComponents/LinkModal';
import NewPanel from '../modals/modal-panels/NewPanel';

export const HEADING_TYPE_TO_ELEMENT = Object.freeze({
  'header-one': 'H1',
  'header-two': 'H2',
  'header-three': 'H3',
  'header-four': 'H4',
  'header-five': 'H5',
  'header-six': 'H6',
  unstyled: 'P',
});

type buttonsFullDataType = {
  type: string;
  plugin?: string;
  icon?: any;
  dataHook?: string;
  tooltip?: string;
  label?: string;
  arrow?: boolean;
  action?: string;
  modal?: (() => JSX.Element) | FC<any>;
  onSave?: string;
  saveState?: boolean;
  onCancel?: string;
  onChange?: string;
  onDone?: string;
  onDelete?: string;
  saveSelection?: boolean;
  loadSelection?: boolean;
  colorPickerHeaderKey?: string;
  unstyled?: { icon: any; action: string };
  'header-two'?: { icon: any; action: string };
  'header-three'?: { icon: any; action: string };
};

export const buttonsFullData: Record<string, buttonsFullDataType> = {
  AddPlugin: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_AddPlugin',
    tooltip: 'AddPlugin',
    type: 'button',
  },
  UNDO: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_UNDO',
    tooltip: 'UNDO',
    type: 'button',
  },
  REDO: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_REDO',
    tooltip: 'REDO',
    type: 'button',
  },
  HEADINGS: {
    plugin: 'wix-rich-content-plugin-headings',
    icon: () => null,
    dataHook: 'headingsDropdownButton',
    tooltip: 'Text style',
    label: 'HEADINGS',
    arrow: true,
    type: 'modal',
    modal: props => <HeadingsDropDownPanel {...props} translateHeading={translateHeading} />,
    onSave: 'HEADINGS',
  },
  Separator: {
    type: 'SEPARATOR',
  },
  Bold: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_BOLD',
    tooltip: 'Bold',
    type: 'button',
  },
  Italic: {
    icon: ItalicIcon,
    dataHook: 'textInlineStyleButton_ITALIC',
    tooltip: 'Italic',
    type: 'button',
  },
  Underline: {
    icon: UnderlineIcon,
    dataHook: 'textInlineStyleButton_UNDERLINE',
    tooltip: 'Underline',
    type: 'button',
  },
  TEXT_COLOR: {
    plugin: 'wix-rich-content-text-color',
    icon: TextColorIcon,
    dataHook: 'TextColorButton',
    tooltip: 'Text color',
    action: 'TEXT_COLOR',
    type: 'color-picker',
    saveSelection: true,
    loadSelection: true,
    colorPickerHeaderKey: 'Color_Picker_TextColorButton_Header',
  },
  TEXT_HIGHLIGHT: {
    plugin: 'wix-rich-content-text-highlight',
    icon: TextHighlightIcon,
    dataHook: 'TextHighlightButton',
    tooltip: 'Highlight color',
    action: 'TEXT_HIGHLIGHT',
    type: 'color-picker',
    saveSelection: true,
    loadSelection: true,
    colorPickerHeaderKey: 'Color_Picker_TextHighlightButton_Header',
  },
  Title: {
    unstyled: {
      icon: TitleIcon,
      action: 'header-two',
    },
    'header-two': {
      icon: TitleOneIcon,
      action: 'header-three',
    },
    'header-three': {
      icon: TitleTwoIcon,
      action: 'unstyled',
    },
    dataHook: 'textBlockStyleButton_Title',
    tooltip: 'Title',
    type: 'button',
  },
  Blockquote: {
    icon: BlockQuoteIcon,
    dataHook: 'textBlockStyleButton_Quote',
    tooltip: 'Quote',
    type: 'button',
  },
  Alignment: {
    dataHook: 'Alignment',
    tooltip: 'Alignment',
    type: 'modal',
    modal: props => <NewPanel {...props} />,
    onSave: 'Alignment',
  },
  // Alignment: {
  //   dataHook: 'Alignment',
  //   tooltip: 'Alignment',
  //   type: 'GROUP',
  // },
  // AlignCenter: {
  //   icon: AlignTextCenterIcon,
  //   dataHook: 'textAlignmentButton_center',
  //   tooltip: 'Align center',
  //   type: 'button',
  // },
  // AlignLeft: {
  //   icon: AlignLeftIcon,
  //   dataHook: 'textAlignmentButton_left',
  //   tooltip: 'Align left',
  //   type: 'button',
  // },
  // AlignRight: {
  //   icon: AlignRightIcon,
  //   dataHook: 'textAlignmentButton_right',
  //   tooltip: 'Align right',
  //   type: 'button',
  // },
  // Justify: {
  //   icon: AlignJustifyIcon,
  //   dataHook: 'textAlignmentButton_justify',
  //   tooltip: 'Justify',
  //   type: 'button',
  // },
  OrderedList: {
    icon: OrderedListIcon,
    dataHook: 'textBlockStyleButton_NumberedList',
    tooltip: 'Numbered list',
    type: 'button',
  },
  UnorderedList: {
    icon: UnorderedListIcon,
    dataHook: 'textBlockStyleButton_BulletedList',
    tooltip: 'Bulleted list',
    type: 'button',
  },
  DECREASE_INDENT: {
    plugin: 'wix-rich-content-plugin-indent',
    icon: decreaseIndentPluginIcon,
    dataHook: 'decreaseIndentButton',
    tooltip: 'Decrease indent',
    type: 'button',
  },
  INCREASE_INDENT: {
    plugin: 'wix-rich-content-plugin-indent',
    icon: increaseIndentPluginIcon,
    dataHook: 'increaseIndentButton',
    tooltip: 'Increase indent',
    type: 'button',
  },
  SPOILER: {
    plugin: 'wix-rich-content-plugin-spoiler',
    icon: SpoilerButtonIcon,
    dataHook: 'textSpoilerButton',
    tooltip: 'Spoiler',
    type: 'button',
  },
  LINE_SPACING: {
    plugin: 'line-spacing',
    icon: LineSpacingIcon,
    dataHook: 'LineSpacingButton',
    tooltip: 'Line spacing',
    type: 'modal',
    modal: props => <Panel {...props} />,
    onSave: 'LINE_SPACING',
    arrow: true,
    saveState: true,
    onCancel: 'LINE_SPACING',
    onChange: 'LINE_SPACING',
    saveSelection: true,
  },
  LINK: {
    plugin: 'LINK',
    icon: LinkIcon,
    dataHook: 'LinkButton',
    tooltip: 'Link',
    type: 'modal',
    modal: props => <LinkModal {...props} />,
    onDone: 'LINK',
    onDelete: 'LINK',
    onCancel: 'LINK',
    saveSelection: true,
    loadSelection: true,
  },
  CODE_BLOCK: {
    plugin: 'code-block',
    icon: CodeBlockIcon,
    dataHook: 'TextCodeBlockButton',
    tooltip: 'Code snippet',
    type: 'button',
  },
};

export const inlineStyleButtons: Record<string, InlineStyle> = {
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  SPOILER: 'spoiler',
};

export const textBlockButtons: Record<string, string> = {
  CODE_BLOCK: CODE_BLOCK_TYPE,
  Blockquote: BLOCKQUOTE,
  OrderedList: NUMBERED_LIST_TYPE,
  UnorderedList: BULLET_LIST_TYPE,
  HEADINGS: 'HEADINGS',
};

export const decorationButtons: Record<string, keyof DecorationsDataMap> = {
  DECREASE_INDENT: RICOS_INDENT_TYPE,
  INCREASE_INDENT: RICOS_INDENT_TYPE,
  LINE_SPACING: RICOS_LINE_SPACING_TYPE,
  LINK: RICOS_LINK_TYPE,
};

export const setTextAlignment: Record<string, TextAlignment> = {
  AlignCenter: 'center',
  AlignLeft: 'left',
  AlignRight: 'right',
  Justify: 'justify',
};

export const colorTypes: Record<string, ColorType> = {
  TEXT_COLOR: RICOS_TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT: RICOS_TEXT_HIGHLIGHT_TYPE,
};

export const translateHeading = (option = 'P', t) => {
  return option === 'P'
    ? t('FormattingToolbar_TextStyle_Paragraph')
    : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
};
