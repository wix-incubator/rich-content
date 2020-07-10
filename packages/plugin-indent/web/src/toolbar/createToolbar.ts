import { INDENT_TYPE } from '../types';
import { BUTTON_TYPES, indentSelectedBlocks } from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';
import { DecreaseIndentButton, IncreaseIndentButton } from './IndentButtons';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = config => {
  const getIconByDirection = type => {
    const editorState = config.getEditorState();
    const content = editorState.getCurrentContent();
    const key = editorState.getSelection().getStartKey();
    const selectedBlockKey = content.getBlockForKey(key).getKey();
    const directionMap = editorState.getDirectionMap();
    return {
      LTR: {
        indent: config[INDENT_TYPE]?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        unindent: config[INDENT_TYPE]?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
      RTL: {
        unindent: config[INDENT_TYPE]?.toolbar?.icons?.IncreaseIndent || increaseIndentPluginIcon,
        indent: config[INDENT_TYPE]?.toolbar?.icons?.DecreaseIndent || decreaseIndentPluginIcon,
      },
    }[directionMap.get(selectedBlockKey)][type];
  };
  return {
    TextButtonMapper: () => ({
      DecreaseIndent: {
        component: DecreaseIndentButton,
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(config.getEditorState(), -1);
            config.setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIconByDirection('unindent'),
          tooltip: config.t('decreaseIndentButton_Tooltip'),
          getLabel: () => '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => false,
        },
      },
      IncreaseIndent: {
        component: IncreaseIndentButton,
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            const indented = indentSelectedBlocks(config.getEditorState(), 1);
            config.setEditorState(indented);
          },
          isActive: () => false,
          getIcon: () => getIconByDirection('indent'),
          tooltip: config.t('increaseIndentButton_Tooltip'),
          getLabel: () => '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
          // TODO: should be disabled when no indent?
          isDisabled: () => false,
        },
      },
    }),
    name: 'indent',
  };
};

export default createToolbar;
