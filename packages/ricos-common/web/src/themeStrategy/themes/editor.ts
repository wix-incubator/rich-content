/* eslint-disable @typescript-eslint/camelcase */
export default function editor(colors: PaletteColors, utils: ThemeUtils) {
  const adaptedActionColor = utils.adaptForeground(colors.actionColor);
  const { bgColor, actionColor, textColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
    sideToolbar_floatingIcon: {
      '&:hover': {
        fill: actionColor,
      },
    },
    footerToolbar: {
      '&$staticToolbar': {
        background: bgColor,
      },
    },
    staticToolbar: {},
    footerToolbarButton_icon: {
      color: textColor,
    },
    footerToolbarButton_wrapper: {
      '& $footerToolbarButton:hover:not([disabled]) $footerToolbarButton_icon': {
        color: actionColor,
      },
    },
    footerToolbarButton: {},
    //inline-toolbar-dropdown-button.scss
    inlineToolbarButton_active: {
      color: adaptedActionColor,
      fill: adaptedActionColor,
    },
    inlineToolbarDropdownButton: {
      '&:hover svg': {
        fill: adaptedActionColor,
      },
    },
  };
}
