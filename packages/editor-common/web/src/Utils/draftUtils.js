import { EditorState, Modifier, RichUtils, SelectionState, AtomicBlockUtils } from '@wix/draft-js';
import { cloneDeep, flatMap, findIndex, findLastIndex, countBy, debounce, times } from 'lodash';
import { TEXT_TYPES } from '../consts';

export function createSelection({ blockKey, anchorOffset, focusOffset }) {
  return SelectionState.createEmpty(blockKey).merge({
    anchorOffset,
    focusOffset,
  });
}

export const insertLinkInPosition = (
  editorState,
  blockKey,
  start,
  end,
  { url, targetBlank, nofollow, anchorTarget, relValue }
) => {
  const selection = createSelection({ blockKey, anchorOffset: start, focusOffset: end });

  return insertLink(editorState, selection, {
    url,
    targetBlank,
    nofollow,
    anchorTarget,
    relValue,
  });
};

export const updateLinkAtCurrentSelection = (editorState, data) => {
  const selection = getSelection(editorState);
  const editorStateWithLink = updateLink(selection, editorState, data);
  return EditorState.forceSelection(
    editorStateWithLink,
    selection.merge({ anchorOffset: selection.focusOffset })
  );
};

export const getBlockAtStartOfSelection = editorState => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());

  return block;
};

export const insertLinkAtCurrentSelection = (editorState, data) => {
  let selection = getSelection(editorState);
  let newEditorState = editorState;
  if (selection.isCollapsed()) {
    const { url, defaultName } = data;
    const urlToInsertWhenCollapsed = defaultName ? defaultName : url;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      selection,
      urlToInsertWhenCollapsed
    );
    selection = selection.merge({
      focusOffset: selection.getFocusOffset() + urlToInsertWhenCollapsed.length,
    });
    newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
  }
  let editorStateWithLink;
  if (isSelectionBelongsToExsistingLink(newEditorState, selection)) {
    editorStateWithLink = updateLink(selection, newEditorState, data);
  } else {
    editorStateWithLink = insertLink(newEditorState, selection, data);
  }

  return EditorState.forceSelection(
    editorStateWithLink,
    selection.merge({ anchorOffset: selection.focusOffset })
  );
};

function isSelectionBelongsToExsistingLink(editorState, selection) {
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  return getSelectedLinks(editorState).find(({ range }) => {
    return range[0] <= startOffset && range[1] >= endOffset;
  });
}

function updateLink(selection, editorState, data) {
  const blockKey = selection.getStartKey();
  const block = editorState.getCurrentContent().getBlockForKey(blockKey);
  const entityKey = block.getEntityAt(selection.getStartOffset());
  return setEntityData(editorState, entityKey, createLinkEntityData(data));
}

function preventLinkInlineStyleForNewLine(editorState, { anchorKey, focusOffset }) {
  const selectionForSpace = createSelection({
    blockKey: anchorKey,
    anchorOffset: focusOffset,
    focusOffset,
  });
  //insert dummy space after link for preventing underline inline style to the new line
  return Modifier.insertText(editorState.getCurrentContent(), selectionForSpace, ' ');
}

function insertLink(editorState, selection, data) {
  const oldSelection = editorState.getSelection();
  const editorWithLink = addEntity(editorState, selection, {
    type: 'LINK',
    data: createLinkEntityData(data),
  });
  const isNewLine = selection.anchorKey !== oldSelection.anchorKey; //check weather press enter or space after link
  const contentState = isNewLine
    ? preventLinkInlineStyleForNewLine(editorWithLink, selection)
    : editorWithLink.getCurrentContent();

  return EditorState.push(
    editorState,
    Modifier.applyInlineStyle(contentState, selection, 'UNDERLINE').set(
      'selectionAfter',
      oldSelection
    ),
    'change-inline-style'
  );
}

export function createLinkEntityData({
  url,
  targetBlank,
  nofollow,
  anchorTarget,
  relValue,
  defaultName,
}) {
  const target = targetBlank ? '_blank' : anchorTarget !== '_blank' ? anchorTarget : '_self';
  const rel = nofollow ? 'nofollow' : relValue !== 'nofollow' ? relValue : 'noopener';
  const linkEntityData = {
    url,
    target,
    rel,
  };
  if (defaultName) {
    linkEntityData.defaultName = defaultName;
  }
  return linkEntityData;
}

function addEntity(editorState, targetSelection, entityData) {
  const entityKey = createEntity(editorState, entityData);
  const oldSelection = editorState.getSelection();
  const newContentState = Modifier.applyEntity(
    editorState.getCurrentContent(),
    targetSelection,
    entityKey
  ).set('selectionAfter', oldSelection);

  return EditorState.push(editorState, newContentState, 'apply-entity');
}

export const hasLinksInBlock = (block, contentState) => {
  return !!getLinkRangesInBlock(block, contentState).length;
};

export const hasLinksInSelection = editorState => {
  return !!getSelectedLinks(editorState).length;
};

export const getLinkDataInSelection = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = getSelection(editorState);
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
  return linkKey ? contentState.getEntity(linkKey).getData() : {};
};

export const removeLinksInSelection = editorState => {
  const selection = editorState.getSelection();
  const newEditorState = getSelectedLinks(editorState).reduce(
    (prevState, { key, range }) => removeLink(prevState, key, range),
    editorState
  );

  return EditorState.forceSelection(
    newEditorState,
    selection.merge({ anchorOffset: selection.focusOffset })
  );
};

export const getTextAlignment = (editorState, defaultAlignment = 'left') => {
  const selection = getSelection(editorState);
  const currentContent = editorState.getCurrentContent();
  const contentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const {
    data: { textAlignment },
  } = contentBlock.toJS();
  return textAlignment || defaultAlignment;
};

export const setTextAlignment = (editorState, textAlignment) => {
  return mergeBlockData(editorState, { textAlignment });
};

export const mergeBlockData = (editorState, data) => {
  const contentState = Modifier.mergeBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data
  );
  return EditorState.push(editorState, contentState, 'change-block-data');
};

export const getAnchorBlockData = editorState => {
  //*** anchor is where the user began the selection
  const anchorKey = editorState.getSelection().getAnchorKey();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  return block.get('data').toJS();
};

export const setEntityData = (editorState, entityKey, data) => {
  if (entityKey) {
    const contentState = editorState.getCurrentContent();
    contentState.replaceEntityData(entityKey, cloneDeep(data));
  }
  return editorState;
};

export const isAtomicBlockFocused = editorState => {
  const { anchorKey, focusKey } = editorState.getSelection();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey).type;
  return anchorKey === focusKey && block === 'atomic';
};

export const replaceWithEmptyBlock = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const blockRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength(),
  });
  const withoutBlock = Modifier.removeRange(contentState, blockRange, 'backward');
  const resetBlock = Modifier.setBlockType(
    withoutBlock,
    withoutBlock.getSelectionAfter(),
    'unstyled'
  );
  const newState = EditorState.push(editorState, resetBlock, 'remove-range');
  return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
};

// export const setSelectionToBlock = (newEditorState, setEditorState, newActiveBlock) => {
//   const editorState = newEditorState;
//   const offsetKey = DraftOffsetKey.encode(newActiveBlock.getKey(), 0, 0);
//   const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
//   const selection = window.getSelection();
//   const range = document.createRange();
//   range.setStart(node, 0);
//   range.setEnd(node, 0);
//   selection.removeAllRanges();
//   selection.addRange(range);

//   setEditorState(
//     EditorState.forceSelection(
//       editorState,
//       new SelectionState({
//         anchorKey: newActiveBlock.getKey(),
//         anchorOffset: 0,
//         focusKey: newActiveBlock.getKey(),
//         focusOffset: 0,
//         isBackward: false,
//       })
//     )
//   );
// };

// **************************** this function is for oneApp ****************************
export const createBlockAndFocus = (editorState, data, pluginType) => {
  const { newBlock, newSelection, newEditorState } = createBlock(editorState, data, pluginType);
  window.getSelection().removeAllRanges();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        newEditorState: EditorState.forceSelection(newEditorState, newSelection),
        newBlock,
      });
    }, 0);
  });
};

export const createBlock = (editorState, data, type) => {
  const currentEditorState = editorState;
  const contentState = currentEditorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', cloneDeep(data));
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(currentEditorState, entityKey, ' ');
  const recentlyCreatedKey = newEditorState.getSelection().getAnchorKey();
  // when adding atomic block, there is the atomic itself, and then there is a text block with one space,
  // so get the block before the space
  const newBlock = newEditorState.getCurrentContent().getBlockBefore(recentlyCreatedKey);
  const newSelection = SelectionState.createEmpty(newBlock.getKey());
  return { newBlock, newSelection, newEditorState };
};

export const deleteBlock = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const previousBlock = contentState.getBlockBefore(blockKey) || block;
  const anchorOffset = previousBlock.key === blockKey ? 0 : previousBlock.text.length;
  const selectionRange = new SelectionState({
    anchorKey: previousBlock.key,
    anchorOffset,
    focusKey: blockKey,
    focusOffset: block.text.length,
    hasFocus: true,
  });
  const newContentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  return EditorState.push(editorState, newContentState, 'remove-range');
};

export const deleteBlockText = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const selectionRange = createSelection({
    blockKey,
    anchorOffset: 0,
    focusOffset: block.text.length,
  });
  const newContentState = Modifier.replaceText(contentState, selectionRange, '');
  return EditorState.push(editorState, newContentState, 'remove-range');
};

export const getSelectedBlocks = editorState => {
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const selection = getSelection(editorState);
  const firstIndex = findIndex(blocks, block => block.getKey() === selection.getAnchorKey());
  const lastIndex = findLastIndex(blocks, block => block.getKey() === selection.getFocusKey());

  return blocks.slice(firstIndex, lastIndex + 1);
};

export const getSelectionRange = (editorState, block) => {
  const selection = getSelection(editorState);
  const blockKey = block.getKey();
  const anchorKey = selection.getAnchorKey();
  const focusKey = selection.getFocusKey();
  const anchorOffset = selection.getAnchorOffset();
  const focusOffset = selection.getFocusOffset();
  let range;

  if (anchorKey === blockKey && focusKey === blockKey) {
    range = [anchorOffset, focusOffset];
  } else if (anchorKey === blockKey) {
    range = [anchorOffset, block.getLength()];
  } else if (focusKey === blockKey) {
    range = [0, focusOffset];
  } else {
    range = [0, block.getLength()];
  }

  return range;
};

export const isInSelectionRange = ([start, end], range) => {
  return !(start <= range[0] && end <= range[0]) && !(start >= range[1] && end >= range[1]);
};

function getSelectedLinks(editorState) {
  return flatMap(getSelectedBlocks(editorState), block =>
    getSelectedLinksInBlock(block, editorState)
  );
}

function getSelectedLinksInBlock(block, editorState) {
  const selectionRange = getSelectionRange(editorState, block);

  return getLinkRangesInBlock(block, editorState.getCurrentContent())
    .filter(linkRange => isInSelectionRange(selectionRange, linkRange))
    .map(linkRange => ({
      key: block.getKey(),
      range: linkRange,
    }));
}

export function getLinkRangesInBlock(block, contentState) {
  const ranges = [];
  block.findEntityRanges(
    value => {
      const key = value.getEntity();
      return key && contentState.getEntity(key).type === 'LINK';
    },
    (start, end) => ranges.push([start, end])
  );

  return ranges;
}

function removeLink(editorState, blockKey, [start, end]) {
  const selection = createSelection({ blockKey, anchorOffset: start, focusOffset: end });
  const newContentState = Modifier.removeInlineStyle(
    RichUtils.toggleLink(editorState, selection, null).getCurrentContent(),
    selection,
    'UNDERLINE'
  );

  return EditorState.push(editorState, newContentState, 'change-inline-style');
}

export function createEntity(editorState, { type, mutability = 'MUTABLE', data }) {
  return editorState
    .getCurrentContent()
    .createEntity(type, mutability, data)
    .getLastCreatedEntityKey();
}

function getSelection(editorState) {
  let selection = editorState.getSelection();
  //todo: seems like this is wrong. Should be start/end key. Anchor/focus key have diffrent meaning. (reference https://developer.mozilla.org/en-US/docs/Web/API/Selection#Glossary)
  if (selection.getIsBackward()) {
    selection = new SelectionState({
      anchorKey: selection.getFocusKey(),
      anchorOffset: selection.getFocusOffset(),
      focusKey: selection.getAnchorKey(),
      focusOffset: selection.getAnchorOffset(),
    });
  }

  return selection;
}

export const getEntities = (editorState, entityType = null) => {
  const currentContent = editorState.getCurrentContent();
  const entities = [];

  currentContent.getBlockMap().forEach(block => {
    block.findEntityRanges(character => {
      const char = character.getEntity();
      const entity = !!char && currentContent.getEntity(char);
      // regular text block
      if (entity === false) {
        entities.push({ type: 'text' });
      } else if (!entityType || entity.getType() === entityType) {
        entities.push(entity);
      }
    });
  });
  return entities;
};

const countByType = obj => countBy(obj, x => x.type);

const getBlockTypePlugins = blocks =>
  blocks.filter(block => block.type !== 'unstyled' && block.type !== 'atomic');

export function getPostContentSummary(editorState) {
  if (Object.entries(editorState).length === 0) return;
  const blocks = editorState.getCurrentContent().getBlocksAsArray();
  const entries = getEntities(editorState);
  const blockPlugins = getBlockTypePlugins(blocks);
  const pluginsDetails = entries
    .filter(entry => entry.type !== 'text')
    .map(entry => ({ type: entry.type, data: entry.data }));
  return {
    pluginsCount: {
      ...countByType(blockPlugins),
      ...countByType(entries),
    },
    pluginsDetails,
  };
}

//ATM, it only looks for deleted plugins.
//onChanges - for phase 2?
//Added Plugins - checked elsewhere via toolbar clicks
export const createCalcContentDiff = editorState => {
  let prevState = editorState;
  return debounce((newState, { shouldCalculate, onCallbacks }) => {
    if (!shouldCalculate) return;
    const countByType = obj => countBy(obj, x => x.type);
    const prevEntities = countByType(getEntities(prevState));
    const currEntities = countByType(getEntities(newState));
    const prevBlocks = prevState.getCurrentContent().getBlocksAsArray();
    const currBlocks = newState.getCurrentContent().getBlocksAsArray();
    const prevBlockPlugins = countByType(getBlockTypePlugins(prevBlocks));
    const currBlockPlugins = countByType(getBlockTypePlugins(currBlocks));

    const prevPluginsTotal = Object.assign(prevEntities, prevBlockPlugins);
    const currPluginsTotal = Object.assign(currEntities, currBlockPlugins);

    const pluginsDeleted = [];
    Object.keys(prevPluginsTotal).forEach(type => {
      const deletedCount = prevPluginsTotal[type] - (currPluginsTotal[type] || 0);
      times(deletedCount, () => pluginsDeleted.push(type));
    });

    onCallbacks({ pluginsDeleted });
    prevState = newState;
  }, 300);
};

// a selection of the new content from the last change
function createLastChangeSelection(editorState) {
  const content = editorState.getCurrentContent();
  const selectionBefore = content.getSelectionBefore();
  return content.getSelectionAfter().merge({
    anchorKey: selectionBefore.getStartKey(),
    anchorOffset: selectionBefore.getStartOffset(),
  });
}

export function fixPastedLinks(editorState, { anchorTarget, relValue }) {
  const lastChangeSelection = createLastChangeSelection(editorState);
  const links = getSelectedLinks(setSelection(editorState, lastChangeSelection));
  const content = editorState.getCurrentContent();
  links.forEach(({ key: blockKey, range }) => {
    const block = content.getBlockForKey(blockKey);
    const entityKey = block.getEntityAt(range[0]);
    const data = entityKey && content.getEntity(entityKey).getData();
    const url = data.url || data.href;
    if (url) {
      content.replaceEntityData(entityKey, {
        url,
        target: anchorTarget || '_self',
        rel: relValue || 'noopener noreferrer',
      });
    }
  });
  return editorState;
}

export function getFocusedBlockKey(editorState) {
  const selection = editorState.getSelection();
  return selection.isCollapsed() && selection.getAnchorKey();
}

export function getBlockInfo(editorState, blockKey) {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const entityKey = block.getEntityAt(0);
  const entity = (entityKey && contentState.getEntity(entityKey)) || {};
  const entityData = entity.data;
  const type = entity.type;

  return { type: type || 'text', entityData };
}

export function getBlockType(editorState) {
  const contentState = editorState.getCurrentContent();
  const blockKey = editorState.getSelection().getAnchorKey();
  const block = contentState.getBlockForKey(blockKey);
  return block.type;
}

export function setSelection(editorState, selection) {
  return EditorState.acceptSelection(editorState, selection);
}

export const isTypeText = blockType => {
  return TEXT_TYPES.some(type => type === blockType);
};

export function indentSelectedBlocks(editorState, adjustment) {
  const maxDepth = 4;
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const blockMap = contentState.getBlockMap();

  const adjustBlockDepth = (block, adjustment) => {
    let depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  };

  const getBlocks = () =>
    blockMap
      .toSeq()
      .skipUntil((_, k) => k === startKey)
      .takeUntil((_, k) => k === endKey)
      .concat([[endKey, blockMap.get(endKey)]]);

  const blocks = getBlocks(blockMap, startKey, endKey)
    .filter(block => isTypeText(block.getType()))
    .map(block => adjustBlockDepth(block, adjustment));

  const withAdjustment = contentState.merge({
    blockMap: blockMap.merge(blocks),
    selectionBefore: selection,
    selectionAfter: selection,
  });
  return EditorState.push(editorState, withAdjustment, 'adjust-depth');
}

export function setForceSelection(editorState, selection) {
  return EditorState.forceSelection(editorState, selection);
}

export function insertString(editorState, string) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const newContentState = Modifier.replaceText(contentState, selectionState, string);
  return EditorState.push(editorState, newContentState, 'insert-string');
}

export function getCharacterBeforeSelection(editorState) {
  let character;
  const selectionState = editorState.getSelection();
  const start = selectionState.getStartOffset() - 1;

  if (start >= 0) {
    const anchorKey = selectionState.getAnchorKey();
    const contentState = editorState.getCurrentContent();
    const currentContentBlock = contentState.getBlockForKey(anchorKey);
    character = currentContentBlock.getText().slice(start, start + 1);
  }
  return character;
}

export function deleteCharacterBeforeCursor(editorState) {
  let newState;
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    const start = selectionState.getStartOffset() - 1;
    const newSelection = selectionState.set('anchorOffset', start);
    const newContentState = Modifier.replaceText(contentState, newSelection, '');
    newState = EditorState.push(editorState, newContentState, 'delete-string');
  }
  return newState;
}
