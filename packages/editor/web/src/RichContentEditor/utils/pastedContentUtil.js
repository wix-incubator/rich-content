import { OrderedSet } from 'immutable';
import rgbToHex from './rgbToHex';
import { Modifier, SelectionState } from 'wix-rich-content-editor-common';
import { reduce } from 'lodash';

export const pastedContentConfig = {
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === 'span') {
      const styles = [];
      node.style.color && styles.push(`{"FG":"${rgbToHex(node.style.color)}"}`);
      node.style.backgroundColor && styles.push(`{"BG":"${rgbToHex(node.style.backgroundColor)}"}`);
      node.style.fontWeight > 500 && styles.push('BOLD');
      return OrderedSet.of(...styles).merge(currentStyle);
    } else {
      const styles = [];
      return OrderedSet.of(...styles).merge(currentStyle);
    }
  },
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === 'a') {
      return createEntity('LINK', 'MUTABLE', {
        url: node.href,
        target: '_blank',
        rel: 'noopener',
      });
    }
    // if (nodeName === 'figure') {
    //   const atomicType = node.firstElementChild.firstElementChild.dataset.hook;
    //   if (atomicType?.includes('divider-')) {
    //     return createEntity('wix-draft-plugin-divider', 'IMMUTABLE', {
    //       type: atomicType.substring(8),
    //     });
    //   }
    // }
    return null;
  },
  // htmlToBlock: nodeName => {
  //   if (nodeName === 'figure') {
  //     return 'atomic';
  //   }
  //   return null;
  // },
};

export const clearUnnecessaryInlineStyles = contentState => {
  const selection = selectAllContent(contentState);

  return reduce(
    unnecessaryInlineStyles,
    (newContentState, style) => Modifier.removeInlineStyle(newContentState, selection, style),
    contentState
  );
};

const unnecessaryInlineStyles = ['CODE'];

const selectAllContent = contentState => {
  const firstBlock = contentState.getBlockMap().first();
  const lastBlock = contentState.getBlockMap().last();
  const firstBlockKey = firstBlock.getKey();
  const lastBlockKey = lastBlock.getKey();
  const lengthOfLastBlock = lastBlock.getLength();

  return new SelectionState({
    anchorKey: firstBlockKey,
    anchorOffset: 0,
    focusKey: lastBlockKey,
    focusOffset: lengthOfLastBlock,
  });
};
