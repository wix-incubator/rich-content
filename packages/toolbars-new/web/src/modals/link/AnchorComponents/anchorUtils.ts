export const filterAnchorableBlocks = (array, filter) => {
  return array.filter(block => block.anchorType === filter);
};
