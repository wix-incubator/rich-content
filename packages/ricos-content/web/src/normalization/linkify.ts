import { getUrlMatches } from '../urlValidators';
import {
  DraftContent,
  LinkRange,
  RicosEntityRange,
  RicosEntityMap,
  RicosEntity,
  RicosContentBlock,
  NormalizationProcessor,
} from '../types';

export const linkify: NormalizationProcessor<DraftContent> = (
  contentState,
  { anchorTarget, relValue }
) => {
  let lastKey =
    Object.keys(contentState.entityMap).length > 0
      ? Math.max(...Object.keys(contentState.entityMap).map(key => parseInt(key, 10))) + 1
      : 0;
  return contentState.blocks.reduce(
    (state, block) => {
      const { text } = block;
      const linkEntries = getUrlMatches(text)
        .filter(({ text: url, index: start, lastIndex: end }: LinkRange) => {
          const alreadyHasEntity = hasEntityInRange(block, start, end);
          const longEnough = url.length >= 6;
          return !alreadyHasEntity && longEnough;
        })
        .map(({ text: url, index: start, lastIndex: end }: LinkRange, idx: number) => {
          lastKey += idx;
          return createEntity(lastKey, url, start, end, anchorTarget, relValue);
        });
      return {
        blocks: [
          ...state.blocks,
          {
            ...block,
            entityRanges: [
              ...block.entityRanges,
              ...linkEntries.map(
                ({ entityRange }: { entityRange: RicosEntityRange }) => entityRange
              ),
            ],
          },
        ],
        entityMap: {
          ...linkEntries.reduce(
            (entityMap: RicosEntityMap, { mapEntry }: { mapEntry: RicosEntity }) => ({
              ...entityMap,
              ...mapEntry,
            }),
            state.entityMap
          ),
        },
      };
    },
    { blocks: [], entityMap: { ...contentState.entityMap } }
  );
};

const hasEntityInRange = (block: RicosContentBlock, start: number, end: number) =>
  block.entityRanges.some(({ offset, length }) => start < offset + length && end >= offset);

const createEntity = (
  entityKey: number,
  url: string,
  start: number,
  end: number,
  anchorTarget: string,
  relValue: string
) => {
  const entityRange = {
    offset: start,
    length: end - start,
    key: entityKey,
  };

  const mapEntry = {
    [entityKey]: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url,
        target: anchorTarget,
        rel: relValue,
      },
    },
  };

  return { entityRange, mapEntry };
};
