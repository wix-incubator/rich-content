import classNames from 'classnames';
import editorStyles from '../../statics/styles/rich-content-editor.scss';
import alignmentStyles from '../../statics/styles/rich-content-editor-alignment.rtlignore.scss';
import {
  depthClassName,
  getTextDirection,
  getDirectionFromAlignmentAndTextDirection,
} from 'wix-rich-content-common';
import { isListType } from 'ricos-content';

const styles = { ...editorStyles, ...alignmentStyles };
const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  'header-four': 'headerFour',
  'header-five': 'headerFive',
  'header-six': 'headerSix',
  atomic: 'atomic',
  'code-block': 'codeBlock',
  'ordered-list-item': 'orderedList',
  'unordered-list-item': 'unorderedList',
};

const listAlignmentClass = (textAlignment, textDirection) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-list-${direction}`;
};

const textBlockAlignmentClass = (textAlignment, textDirection) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-text-${direction}`;
};

export default (theme, styleToClass, defaultTextAlignment) => {
  return contentBlock => {
    const {
      type,
      depth,
      text,
      data: { textAlignment = defaultTextAlignment, dynamicStyles = {} },
    } = contentBlock.toJS();

    const textDirection = getTextDirection(text);

    const key = types[type] || 'text';
    const classList = [styles[key], theme[key]];

    if (type !== 'atomic') {
      classList.push(
        styles[textAlignment],
        theme[textAlignment],
        isListType(type)
          ? listAlignmentClass(textAlignment, textDirection)
          : [depthClassName(depth), textBlockAlignmentClass(textAlignment, textDirection)]
      );
    }

    const dynamicClasses = Object.entries(dynamicStyles).map(styleToClass);

    return classNames(...classList, ...dynamicClasses);
  };
};
