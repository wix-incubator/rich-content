import { TOOLBARS, DISPLAY_MODE } from 'wix-rich-content-common';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';
import { reducePluginTextButtons } from './buttons/utils';

const defaultInlineToolbarVisibilityFn = editorState => {
  const selection = editorState.getSelection();
  return !selection.isCollapsed() && selection.getHasFocus();
};

const defaultSideToolbarVisibilityFn = editorState => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
  return currentBlock.getLength() === 0;
};

const defaultDisplayOptions = {
  desktop: { displayMode: DISPLAY_MODE.NORMAL },
  mobile: {
    ios: { displayMode: DISPLAY_MODE.NORMAL },
    android: { displayMode: DISPLAY_MODE.NORMAL },
  }
};

const defaultOffset = {
  desktop: { x: 0, y: 0 },
  mobile: {
    ios: { x: 0, y: 0 },
    android: { x: 0, y: 0 },
  }
};

const defaultTextPluginButtons = {
  desktop: {},
  mobile: {
    ios: {},
    android: {},
  }
};


export const getDefaultToolbarSettings = ({ pluginButtons, textButtons, pluginTextButtons }) => {
  const desktopTextPluginButtons = reducePluginTextButtons(pluginTextButtons);
  const mobileTextPluginButtons = reducePluginTextButtons(pluginTextButtons, ({ isMobile }) => isMobile !== false);

  return [
    {
      name: TOOLBARS.SIDE,
      shouldCreate: () => {
        const shouldCreate = pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.SIDE)).length > 0;
        return {
          desktop: shouldCreate,
          mobile: {
            ios: shouldCreate,
            android: shouldCreate,
          }
        };
      },
      getPositionOffset: () => ({
        desktop: { x: -40, y: 0 },
        mobile: {
          ios: { x: 0, y: 0 },
          android: { x: 0, y: 0 },
        }
      }),
      getDisplayOptions: () => defaultDisplayOptions,
      getButtons: () => {
        const buttons = pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.SIDE))
          .map(({ component }) => component);
        return {
          desktop: buttons,
          mobile: {
            ios: buttons,
            android: buttons,
          }
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: defaultSideToolbarVisibilityFn,
        mobile: {
          ios: defaultSideToolbarVisibilityFn,
          android: defaultSideToolbarVisibilityFn,
        }
      }),
      getInstance: createSideToolbar
    },
    {
      name: TOOLBARS.MOBILE,
      shouldCreate: () => ({
        desktop: false,
        mobile: {
          ios: true,
          android: true,
        }
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getButtons: () => {
        return {
          desktop: [],
          mobile: {
            ios: textButtons.mobile,
            android: textButtons.mobile,
          }
        };
      },
      getTextPluginButtons: () => ({
        desktop: [],
        mobile: {
          ios: mobileTextPluginButtons,
          android: mobileTextPluginButtons,
        }
      }),
      getVisibilityFn: () => ({
        desktop: () => false,
        mobile: {
          ios: () => true,
          android: () => true,
        }
      }),
      getInstance: createMobileToolbar
    },
    {
      name: TOOLBARS.FOOTER,
      shouldCreate: () => ({
        desktop: pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER)).length > 0,
        mobile: {
          ios: false,
          android: false,
        }
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getButtons: () => {
        const buttons = pluginButtons.filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
          .map(({ component }) => component);
        return {
          desktop: buttons,
          mobile: {
            ios: [],
            android: [],
          }
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => false,
          android: () => false,
        }
      }),
      getInstance: createFooterToolbar
    },
    {
      name: TOOLBARS.STATIC,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: true,
          android: false,
        }
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getButtons: () => ({
        desktop: textButtons.desktop,
        mobile: {
          ios: [],
          android: [],
        }
      }),
      getTextPluginButtons: () => ({
        desktop: desktopTextPluginButtons,
        mobile: {
          ios: {},
          android: {},
        }
      }),
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => true,
          android: () => false,
        }
      }),
      getInstance: createStaticTextToolbar
    },
    {
      name: TOOLBARS.INLINE,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: true,
          android: false,
        }
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getButtons: () => ({
        desktop: textButtons.desktop,
        mobile: {
          ios: textButtons.mobile,
          android: [],
        }
      }),
      getTextPluginButtons: () => ({
        desktop: desktopTextPluginButtons,
        mobile: {
          ios: mobileTextPluginButtons,
          android: {},
        }
      }),
      getVisibilityFn: () => ({
        desktop: defaultInlineToolbarVisibilityFn,
        mobile: {
          ios: defaultInlineToolbarVisibilityFn,
          android: defaultInlineToolbarVisibilityFn,
        }
      }),
      getInstance: createInlineTextToolbar
    }
  ];
};
