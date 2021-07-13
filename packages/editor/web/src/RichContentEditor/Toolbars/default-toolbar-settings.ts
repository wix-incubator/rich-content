import { TOOLBARS, DISPLAY_MODE } from 'wix-rich-content-editor-common';
import createSideToolbar from './SideToolbar/createSideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';
import {
  createInsertPluginToolbarButtonProps,
  createFormattingToolbarButtonProps,
} from './createExternalToolbarButtonProps';
import { EditorState } from 'draft-js';
import { GetToolbarSettings } from 'wix-rich-content-common';

const defaultInlineToolbarVisibilityFn = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  return !selection.isCollapsed() && selection.getHasFocus();
};

const defaultSideToolbarVisibilityFn = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const type = currentBlock.getType();
  return type !== 'atomic' && type !== 'code-block';
};

const defaultDisplayOptions = {
  desktop: { displayMode: DISPLAY_MODE.NORMAL },
  mobile: {
    ios: { displayMode: DISPLAY_MODE.NORMAL },
    android: { displayMode: DISPLAY_MODE.NORMAL },
  },
};

const defaultToolbarDecorationFn = {
  desktop: () => null,
  mobile: {
    ios: () => null,
    android: () => null,
  },
};

const defaultOffset = {
  desktop: { x: 0, y: 0 },
  mobile: {
    ios: { x: 0, y: 0 },
    android: { x: 0, y: 0 },
  },
};

const defaultTextPluginButtons = {
  desktop: {},
  mobile: {
    ios: {},
    android: {},
  },
};

const defaultShouldCreate = {
  desktop: false,
  mobile: {
    android: false,
    ios: false,
  },
};

export const getDefaultToolbarSettings: GetToolbarSettings = ({
  pluginButtons,
  pluginButtonNames,
  textButtons,
  pluginTextButtons,
  pluginButtonProps,
  tablePluginMenu,
}) => {
  return [
    {
      name: TOOLBARS.INSERT_PLUGIN,
      getInstance: createInsertPluginToolbarButtonProps.bind({}, pluginButtonProps),
      shouldCreate: () => defaultShouldCreate,
      getButtons: () => ({
        desktop: pluginButtonNames,
        mobile: {
          ios: pluginButtonNames,
          android: pluginButtonNames,
        },
      }),
      // anything below is not in use
      getPositionOffset: () => defaultOffset,
      getTextPluginButtons: () => defaultTextPluginButtons,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getVisibilityFn: () => ({
        desktop: defaultInlineToolbarVisibilityFn,
        mobile: {
          ios: defaultInlineToolbarVisibilityFn,
          android: defaultInlineToolbarVisibilityFn,
        },
      }),
    },
    {
      name: TOOLBARS.FORMATTING,
      shouldCreate: () => defaultShouldCreate,
      getInstance: createFormattingToolbarButtonProps,
      getButtons: () => ({
        desktop: textButtons?.desktop,
        mobile: {
          android: textButtons?.mobile,
          ios: textButtons?.mobile,
        },
      }),
      getTextPluginButtons: () => ({
        desktop: pluginTextButtons,
        mobile: {
          android: pluginTextButtons,
          ios: pluginTextButtons,
        },
      }),
      // not in use
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getVisibilityFn: () => ({
        desktop: defaultInlineToolbarVisibilityFn,
        mobile: {
          ios: defaultInlineToolbarVisibilityFn,
          android: defaultInlineToolbarVisibilityFn,
        },
      }),
    },
    {
      name: TOOLBARS.SIDE,
      shouldCreate: () => {
        const shouldCreate =
          pluginButtons &&
          pluginButtons.filter(({ buttonSettings }) =>
            buttonSettings.toolbars?.includes(TOOLBARS.SIDE)
          ).length > 0;
        return {
          desktop: shouldCreate,
          mobile: {
            ios: shouldCreate,
            android: shouldCreate,
          },
        };
      },
      getPositionOffset: () => ({
        desktop: { x: tablePluginMenu ? -23 : -40, y: tablePluginMenu ? 3 : 0 },
        mobile: {
          ios: { x: 0, y: 0 },
          android: { x: 0, y: 0 },
        },
      }),
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        const buttons =
          pluginButtons &&
          pluginButtons
            .filter(({ buttonSettings }) => buttonSettings.toolbars?.includes(TOOLBARS.SIDE))
            .map(({ component, buttonSettings: { name, section } }) => {
              return { component, name, section };
            });
        return {
          desktop: buttons,
          mobile: {
            ios: buttons,
            android: buttons,
          },
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: defaultSideToolbarVisibilityFn,
        mobile: {
          ios: defaultSideToolbarVisibilityFn,
          android: defaultSideToolbarVisibilityFn,
        },
      }),
      getInstance: createSideToolbar,
    },
    {
      name: TOOLBARS.MOBILE,
      shouldCreate: () => ({
        desktop: false,
        mobile: {
          ios: true,
          android: true,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        return {
          desktop: [],
          mobile: {
            ios: textButtons?.mobile,
            android: textButtons?.mobile,
          },
        };
      },
      getTextPluginButtons: () => ({
        desktop: {},
        mobile: {
          ios: pluginTextButtons,
          android: pluginTextButtons,
        },
      }),
      getVisibilityFn: () => ({
        desktop: () => false,
        mobile: {
          ios: () => true,
          android: () => true,
        },
      }),
      getInstance: createMobileToolbar,
    },
    {
      name: TOOLBARS.FOOTER,
      shouldCreate: () => ({
        desktop:
          pluginButtons &&
          pluginButtons.filter(({ buttonSettings }) =>
            buttonSettings.toolbars?.includes(TOOLBARS.FOOTER)
          ).length > 0,
        mobile: {
          ios: false,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        const buttons =
          pluginButtons &&
          pluginButtons
            .filter(({ buttonSettings }) => buttonSettings.toolbars?.includes(TOOLBARS.FOOTER))
            .map(({ component, buttonSettings: { name, section }, blockType }) => {
              return { component, name, section, blockType };
            });
        return {
          desktop: buttons,
          mobile: {
            ios: [],
            android: [],
          },
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => false,
          android: () => false,
        },
      }),
      getInstance: createFooterToolbar,
    },
    {
      name: TOOLBARS.STATIC,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: true,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => ({
        desktop: textButtons?.desktop,
        mobile: {
          ios: [],
          android: [],
        },
      }),
      getTextPluginButtons: () => ({
        desktop: pluginTextButtons,
        mobile: {
          ios: {},
          android: {},
        },
      }),
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => true,
          android: () => false,
        },
      }),
      getInstance: createStaticTextToolbar,
    },
    {
      name: TOOLBARS.INLINE,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: false,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => ({
        desktop: textButtons?.desktop,
        mobile: {
          ios: textButtons?.mobile,
          android: [],
        },
      }),
      getTextPluginButtons: () => ({
        desktop: pluginTextButtons,
        mobile: {
          ios: pluginTextButtons,
          android: {},
        },
      }),
      getVisibilityFn: () => ({
        desktop: defaultInlineToolbarVisibilityFn,
        mobile: {
          ios: defaultInlineToolbarVisibilityFn,
          android: defaultInlineToolbarVisibilityFn,
        },
      }),
      getInstance: createInlineTextToolbar,
    },
  ];
};
