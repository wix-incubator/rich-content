import {
  MODIFIERS,
  COMMANDS,
  FORMATTING_BUTTONS,
  TOOLBARS,
  BUTTON_TYPES,
  EditorState,
} from 'wix-rich-content-editor-common';
import TextCodeBlockButton from './TextCodeBlockButton';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import CodeBlockIcon from '../icons/CodeBlockIcon';
import { getButtonProps } from './getCodeBlockButtonProps';
import { CreatePluginToolbar } from 'wix-rich-content-common';

const codeBlockTexButtontMapper: CreatePluginToolbar = config => {
  const icon = config[CODE_BLOCK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
  const commandHandler = (editorState: EditorState) => {
    config.setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
  };

  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.CODE_BLOCK]: {
        component: TextCodeBlockButton,
        externalizedButtonProps: getButtonProps({ ...config, icon }),
        keyBindings: [
          {
            keyCommand: {
              command: COMMANDS.CODE,
              modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
              key: 'c',
            },
            commandHandler,
          },
        ],
      },
    }),
    InsertButtons: [
      {
        ...getButtonProps({ ...config, icon }),
        toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.SIDE, TOOLBARS.FOOTER],
        addBlockHandler: commandHandler,
        type: BUTTON_TYPES.CUSTOM_BLOCK,
        tooltip: config.t('TextCodeBlock_InsertButton_Tooltip'),
        section: 'BlockToolbar_Section_Advanced',
      },
    ],
    name: CODE_BLOCK_TYPE,
  };
};

export default codeBlockTexButtontMapper;
