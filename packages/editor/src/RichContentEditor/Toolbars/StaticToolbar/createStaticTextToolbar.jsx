import clsx from 'clsx';

import createStaticToolbar from './createStaticToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import { getStaticTextToolbarId } from '../toolbar-id';
import toolbarStyles from '../../../../statics/styles/text-static-toolbar.scss';
import separatorStyles from '../../../../statics/styles/text-static-toolbar-separator.scss';

const getStaticTextTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: clsx(toolbarStyles.textToolbar, toolbarTheme && toolbarTheme.textToolbar),
      scrollableContainer: clsx(
        toolbarStyles.textToolbar_scrollableContainer,
        toolbarTheme && toolbarTheme.textToolbar_scrollableContainer
      ),
      buttons: clsx(
        toolbarStyles.textToolbar_buttons,
        toolbarTheme && toolbarTheme.textToolbar_buttons
      ),
      extend: clsx(
        toolbarStyles.textToolbar_extend,
        toolbarTheme && toolbarTheme.textToolbar_extend
      ),
      responsiveSpacer: toolbarStyles.textToolbar_responsiveSpacer,
      responsiveArrow: clsx(
        toolbarStyles.textToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrow
      ),
      responsiveArrowStart: clsx(
        toolbarStyles.textToolbar_responsiveArrowStart,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowStart
      ),
      responsiveArrowEnd: clsx(
        toolbarStyles.textToolbar_responsiveArrowEnd,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowEnd
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowStart_icon: clsx(
        toolbarStyles.textToolbar_responsiveArrowStart_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowStart_icon
      ),
      //eslint-disable-next-line camelcase
      responsiveArrowEnd_icon: clsx(
        toolbarStyles.textToolbar_responsiveArrowEnd_icon,
        toolbarTheme && toolbarTheme.textToolbar_responsiveArrowEnd_icon
      ),
    },
    buttonStyles: {
      inlineToolbarButton_wrapper: buttonTheme && buttonTheme.textToolbarButton_wrapper, //eslint-disable-line camelcase
      inlineToolbarButton: buttonTheme && buttonTheme.textToolbarButton, //eslint-disable-line camelcase
      inlineToolbarButton_icon: buttonTheme && buttonTheme.textToolbarButton_icon, //eslint-disable-line camelcase
    },
    separatorStyles: {
      separator: clsx(
        separatorStyles.textToolbarSeparator,
        separatorTheme && separatorTheme.textToolbarSeparator
      ),
    },
    ...rest,
  };
};

export default ({
  buttons,
  textPluginButtons,
  pubsub,
  theme,
  isMobile,
  helpers,
  anchorTarget,
  relValue,
  t,
  refId,
  offset,
  visibilityFn,
  displayOptions,
  uiSettings,
  toolbarDecorationFn,
  config,
  locale,
  setEditorState,
}) => {
  const staticTextTheme = getStaticTextTheme(theme);
  const structure = getTextButtonsFromList({
    buttons,
    textPluginButtons,
    pubsub,
    theme: staticTextTheme,
    t,
    uiSettings,
    config,
    isMobile,
  });
  const id = getStaticTextToolbarId(refId);

  return createStaticToolbar({
    name: 'StaticTextToolbar',
    structure,
    pubsub,
    theme: staticTextTheme,
    isMobile,
    helpers,
    linkModal: true,
    anchorTarget,
    relValue,
    t,
    id,
    offset,
    visibilityFn,
    displayOptions,
    uiSettings,
    toolbarDecorationFn,
    renderTooltips: true,
    locale,
    setEditorState,
    config,
  });
};
