import classNames from 'classnames';
import { mergeStyles, ToolbarType } from 'wix-rich-content-common';
import createStaticToolbar from './createStaticToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '../../../../statics/styles/mobile-toolbar.scss';
import buttonStyles from '../../../../statics/styles/mobile-toolbar-button.scss';
import separatorStyles from '../../../../statics/styles/mobile-toolbar-separator.scss';
import { withToolbarType } from '../utils';

const createMobileToolbar = ({
  buttons,
  textPluginButtons,
  pluginButtons,
  helpers: _helpers,
  pubsub,
  getEditorState,
  setEditorState,
  anchorTarget,
  relValue,
  theme,
  t,
  offset,
  visibilityFn,
  uiSettings,
  displayOptions,
  toolbarDecorationFn,
  config,
  locale,
  addPluginMenuConfig,
}) => {
  const mobileTheme = getMobileTheme(theme);
  const helpers = withToolbarType(_helpers, ToolbarType.MOBILE);
  return createStaticToolbar({
    helpers,
    t,
    name: 'MobileToolbar',
    theme: mobileTheme,
    structure: getMobileButtons({
      buttons,
      textPluginButtons,
      pluginButtons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      mobileTheme,
      t,
      uiSettings,
      config,
      addPluginMenuConfig,
    }),
    anchorTarget,
    relValue,
    isMobile: true,
    offset,
    visibilityFn,
    uiSettings,
    displayOptions,
    toolbarDecorationFn,
    locale,
  });
};

const getMobileTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  const toolbarMergeStyles = mergeStyles({ styles: toolbarStyles, theme: toolbarTheme });
  const buttonMergeStyles = mergeStyles({ styles: buttonStyles, theme: buttonTheme });
  const separatorMergeStyles = mergeStyles({ styles: separatorStyles, theme: separatorTheme });

  /* eslint-disable camelcase*/
  return {
    toolbarStyles: {
      toolbar: classNames(toolbarMergeStyles.mobileToolbar, toolbarMergeStyles.mobileToolbar_fixed),
      scrollableContainer: toolbarMergeStyles.mobileToolbar_scrollableContainer,
      buttons: toolbarMergeStyles.mobileToolbar_buttons,
      extend: toolbarMergeStyles.mobileToolbar_extend,
      responsiveSpacer: toolbarMergeStyles.mobileToolbar_responsiveSpacer,
      responsiveArrow: toolbarMergeStyles.mobileToolbar_responsiveArrow,
      responsiveArrowStart: toolbarMergeStyles.mobileToolbar_responsiveArrowStart,
      responsiveArrowEnd: toolbarMergeStyles.mobileToolbar_responsiveArrowEnd,
      responsiveArrowStart_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowStart_icon,
      responsiveArrowEnd_icon: toolbarMergeStyles.mobileToolbar_responsiveArrowEnd_icon,
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: buttonMergeStyles.mobileToolbarButton_wrapper,
      inlineToolbarButton: buttonMergeStyles.mobileToolbarButton,
      inlineToolbarButton_icon: buttonMergeStyles.mobileToolbarButton_icon,
      inlineToolbarButton_menuButton: buttonMergeStyles.mobileToolbarButton_menuButton,
    },
    separatorStyles: {
      separator: separatorMergeStyles.mobileToolbarSeparator,
    },
    ...rest,
  };
};
const getMobileButtons = ({
  buttons,
  textPluginButtons,
  pluginButtons,
  helpers,
  pubsub,
  getEditorState,
  setEditorState,
  mobileTheme,
  t,
  uiSettings,
  config,
  addPluginMenuConfig,
}) =>
  getTextButtonsFromList({
    buttons,
    textPluginButtons,
    theme: mobileTheme,
    isMobile: true,
    t,
    uiSettings,
    config,
    helpers,
    setEditorState,
    getEditorState,
    pubsub,
    mobileTheme,
    addPluginMenuConfig,
    pluginButtons,
  });

export default createMobileToolbar;
