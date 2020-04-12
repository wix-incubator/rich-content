import React from 'react';
import PropTypes from 'prop-types';

const draftPublic = 'public-DraftStyleDefault';
const draftClassNames = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list${textDirection}`;

const getBlockClassName = (isNewList, dataEntry, textDirection, listType, depth) => {
  const rtl = textDirection === 'rtl' || dataEntry.textDirection === 'rtl';
  const direction = rtl ? 'RTL' : 'LTR';
  let className = draftClassNames(listType, depth, direction);
  if (isNewList) {
    className += ` ${draftPublic}-reset`;
  }
  return className;
};

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  blockDataToStyle,
  contentState,
  getBlockDepth,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = `${draftPublic}-${Component}`;
  let prevDepth = 0;
  return (
    <Component className={containerClassName}>
      {items.map((children, childIndex) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > childIndex ? blockProps.data[childIndex] : {};

        let paragraphGroup = [];
        const result = [];
        const elementProps = key => ({ className: mergedStyles.elementSpacing, key });
        React.Children.forEach(children, (child, i) => {
          if (child) {
            if (typeof child.type === 'string') {
              if (/h\d/.exec(child.type)) {
                if (paragraphGroup.length) {
                  result.push(<p {...elementProps(i)}>{paragraphGroup}</p>);
                  paragraphGroup = [];
                }
                result.push(React.cloneElement(child, elementProps(i)));
              } else {
                paragraphGroup.push(child);
              }
            } else {
              result.push(child);
            }
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps('just_some_key')}>{paragraphGroup}</p>);
        }

        const depth = getBlockDepth(contentState, blockProps.keys[childIndex]);
        const isNewList = childIndex === 0 || depth > prevDepth;
        const className = getBlockClassName(isNewList, dataEntry, textDirection, listType, depth);
        prevDepth = depth;

        return (
          <li
            className={className}
            key={blockProps.keys[childIndex]}
            style={blockDataToStyle(blockProps.data[childIndex])}
          >
            {result}
          </li>
        );
      })}
    </Component>
  );
};

List.propTypes = {
  blockDataToStyle: PropTypes.func,
  blockProps: PropTypes.object,
  getBlockStyleClasses: PropTypes.func,
  items: PropTypes.array,
  mergedStyles: PropTypes.object,
  ordered: PropTypes.bool,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  contentState: PropTypes.object,
  getBlockDepth: PropTypes.func,
};

export default List;
