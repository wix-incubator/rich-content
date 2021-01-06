import classNames from 'classnames';
import { camelCase, isNumber, upperFirst } from 'lodash';
import { ClassNameStrategy, ComponentData } from 'wix-rich-content-common';

const shouldDisableStyles = (componentData: ComponentData, isMobile: boolean) => {
  const { size, width } = componentData.config || {};
  if (size === 'inline' && isNumber(width) && width <= 150) {
    return false;
  }
  return isMobile;
};

export const alignmentClassName: ClassNameStrategy = (componentData, theme, styles, isMobile) => {
  const { alignment, size } = componentData.config || {};
  if (!alignment || (shouldDisableStyles(componentData, isMobile) && size !== 'original')) {
    return '';
  }
  let align = alignment;
  if (size === 'original' && alignment !== 'center') {
    const { width } = componentData.src || {};
    if (isNumber(width) && width > 350) {
      align = 'center';
    }
  }
  return classNames(styles[`align${upperFirst(align)}`], theme[`align${upperFirst(align)}`]);
};

export const sizeClassName: ClassNameStrategy = (
  componentData,
  theme,
  styles,
  isMobile,
  innerRCERenderedIn
) => {
  const { size } = componentData.config || {};
  if (!size || (isMobile && size === 'original')) {
    return '';
  }
  const isRenderedInTable = innerRCERenderedIn === 'table';
  return shouldDisableStyles(componentData, isMobile)
    ? classNames(styles.sizeFullWidth, theme.sizeFullWidth)
    : classNames(
        styles[`size${upperFirst(camelCase(size))}`],
        theme[`size${upperFirst(camelCase(size))}`],
        {
          [styles.renderedInTable]: isRenderedInTable,
          [theme.renderedInTable]: isRenderedInTable,
        }
      );
};
