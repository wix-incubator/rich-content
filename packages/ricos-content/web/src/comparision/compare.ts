/** Based on https://gist.github.com/Yimiprod/7ee176597fef230d1451 */
/* eslint-disable no-console, @typescript-eslint/no-explicit-any, fp/no-delete */

import {
  transform,
  isEqualWith,
  isEqual,
  isObject,
  omit,
  pick,
  cloneDeepWith,
  cloneDeep,
} from 'lodash';

const IGNORED_KEYS = ['updatedDate', 'tempData', 'isCustomVideo'];
const IGNORED_POLL_CONFIG_KEYS = ['alignment', 'size', 'width'];
const IGNORED_SRC_KEYS = ['id', 'original_file_name'];
const IGNORED_BUTTON_DESIGN_KEYS = ['activeButton', 'padding'];
const OEMBED_KEYS = ['thumbnail_url', 'width', 'height'];

/**
 * Deep diff between two object, using lodash
 * @param object Object compared
 * @param base   Object to compare with
 * @return       Return a new object who represent the diff
 */
export function compare(object, base, options: { verbose?: boolean; ignoredKeys?: string[] } = {}) {
  const { verbose, ignoredKeys } = options;
  const allIgnoredKeys = [...IGNORED_KEYS, ...(ignoredKeys || [])];

  const objectWithoutIgnored = omitDeep(cloneDeep(object), allIgnoredKeys);
  const basetWithoutIgnored = omitDeep(cloneDeep(base), allIgnoredKeys);

  objectWithoutIgnored.blocks && removeEmoji(object);
  basetWithoutIgnored.blocks && removeEmoji(base);

  function changes(object, base) {
    return transform<any, any>(object, (result, value, key) => {
      const baseValue = base[key];
      if (!isEqualWith(value, baseValue, comparator)) {
        const areObjects = isObject(value) && isObject(baseValue);
        const currentValue = areObjects ? changes(value, baseValue) : value;
        result[key] = currentValue;
        if (verbose && (!isObject(currentValue) || Object.keys(currentValue).length === 0)) {
          console.dir(
            {
              [key]: {
                from: baseValue,
                to: value,
              },
            },
            { depth: null }
          );
        }
      }
    });
  }

  return changes(objectWithoutIgnored, basetWithoutIgnored);
}

const comparator = (left, right, key) => {
  if (left?.enableVoteRole !== undefined || right?.enableVoteRole !== undefined) {
    return isEqual(omit(left, IGNORED_POLL_CONFIG_KEYS), omit(right, IGNORED_POLL_CONFIG_KEYS));
  }
  if (left?.thumbnail_url || right?.thumbnail_url) {
    return isEqual(pick(left, OEMBED_KEYS), pick(right, OEMBED_KEYS));
  }
  if (key === 'src') {
    return isEqual(omit(left, IGNORED_SRC_KEYS), omit(right, IGNORED_SRC_KEYS));
  }
  if (key === 'design') {
    return isEqual(omit(left, IGNORED_BUTTON_DESIGN_KEYS), omit(right, IGNORED_BUTTON_DESIGN_KEYS));
  }
  return undefined;
};

const removeEmoji = object => {
  const emojiEntityKeys: number[] = [];
  Object.entries<any>(object.entityMap).forEach(
    ([key, value]) => value.type === 'EMOJI_TYPE' && emojiEntityKeys.push(parseInt(key, 10))
  );
  object.entityMap = Object.entries<any>(object.entityMap).filter(
    ([, value]) => value.type !== 'EMOJI_TYPE'
  );
  object.blocks = object.blocks.map(block => ({
    ...block,
    entityRanges: block.entityRanges.filter(range => !emojiEntityKeys.includes(range.key)),
  }));
};

const omitDeep = (collection, excludeKeys: string[]) => {
  function omitFn(value) {
    if (value && typeof value === 'object') {
      excludeKeys.forEach(key => {
        delete value[key];
      });
    }
  }

  return cloneDeepWith(collection, omitFn);
};
