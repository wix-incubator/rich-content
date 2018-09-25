import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import classNames from 'classnames';
import { createInlineStyleDecorators, mergeStyles } from 'wix-rich-content-common';
import getPluginsViewer from './PluginsViewer';
import List from './List';
import { getStrategyByStyle } from './decorators/getStrategyByStyle';
import styles from '../statics/rich-content-viewer.scss';

const withTextAlignment = (element, data, mergedStyles) => {
  const alignmentClass = data.textAlignment ? data.textAlignment : 'left';
  const elementProps = {
    ...element.props,
    className: element.props.className ?
      classNames(element.props.className, mergedStyles[alignmentClass]) :
      mergedStyles[alignmentClass]
  };
  return React.cloneElement(element, elementProps, element.props.children);
};

const getInline = mergedStyles => {
  return {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => <span key={key} className={mergedStyles.code}>{children}</span>
  };
};

const getList = (ordered, mergedStyles) =>
  (children, blockProps) => {
    const fixedChildren = children.map(child => child.length ? child : [' ']);
    const className = ordered ? 'ordered' : 'unordered';
    const containerClassName = mergedStyles[`${className}ListContainer`];
    return (
      <List key={blockProps.keys[0]} keys={blockProps.keys} depth={blockProps.depth} ordered={ordered} className={containerClassName}>
        {fixedChildren.map((child, i) => {
          // NOTE: list block data is an array of data entries per list item
          const dataEntry = blockProps.data.length > i ? blockProps.data[i] : {};
          return withTextAlignment(<li className={mergedStyles[`${className}List`]} key={blockProps.keys[i]}><div>{child}</div></li>,
            dataEntry, mergedStyles);
        })}
      </List>
    );
  };

/**
 * Note that children can be maped to render a list or do other cool stuff
 */
const getBlocks = mergedStyles => {
  // Rendering blocks like this along with cleanup results in a single p tag for each paragraph
  // adding an empty block closes current paragraph and starts a new one
  return {
    unstyled: (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<div key={blockProps.keys[i]}><div>{child}</div></div>, blockProps.data[i], mergedStyles)),
    blockquote: (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<blockquote className={mergedStyles.quote} key={blockProps.keys[i]}><div>{child}</div></blockquote>,
        blockProps.data[i], mergedStyles)),
    'header-two': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<h2 className={mergedStyles.headerTwo} key={blockProps.keys[i]}>{child}</h2>, blockProps.data[i], mergedStyles)),
    'header-three': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<h3 className={mergedStyles.headerThree} key={blockProps.keys[i]}>{child}</h3>, blockProps.data[i], mergedStyles)),
    'code-block': (children, blockProps) => children.map((child, i) =>
      withTextAlignment(<pre key={blockProps.keys[i]} className={mergedStyles.codeBlock}>{child}</pre>, blockProps.data[i], mergedStyles)),
    'unordered-list-item': getList(false, mergedStyles),
    'ordered-list-item': getList(true, mergedStyles),
  };
};

const getEntities = (typeMap, pluginProps) => ({
  ...getPluginsViewer(typeMap, pluginProps)
});

const combineTypeMappers = mappers => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    console.warn('typeMappers is expected to be a function array'); // eslint-disable-line no-console
    return {};
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper()), {});
};

const isEmptyRaw = raw => (!raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === ''));

const options = {
  cleanup: {
    after: 'all',
    types: 'all',
    split: true,
  },
};

const Preview = ({ raw, typeMappers, theme, isMobile, decorators, anchorTarget, relValue, config }) => {
  const mergedStyles = mergeStyles({ styles, theme });
  const isEmpty = isEmptyRaw(raw);
  const typeMap = combineTypeMappers(typeMappers);

  const combinedDecorators = [
    ...decorators,
    ...createInlineStyleDecorators(getStrategyByStyle, mergedStyles)
  ];



  return (
    <div className={mergedStyles.preview}>
      {isEmpty && <div>There is nothing to render...</div>}
      {!isEmpty &&
        redraft(raw, {
          inline: getInline(mergedStyles),
          blocks: getBlocks(mergedStyles),
          entities: getEntities(typeMap, { theme, isMobile, anchorTarget, relValue, config }),
          decorators: combinedDecorators },
        options)}
    </div>
  );
};

Preview.propTypes = {
  raw: PropTypes.shape({
    blocks: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
    entityMap: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  }).isRequired,
  typeMappers: PropTypes.arrayOf(PropTypes.func),
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  decorators: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    strategy: PropTypes.func.isRequired,
  })),
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  config: PropTypes.object,
};

export default Preview;
