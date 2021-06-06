import { DATA_FIELDS_MAP, isDataFieldName, isRichContent } from './../utils';
import { transform, isObject, pickBy, identity } from 'lodash';
import { Node, Decoration, RichContent } from 'ricos-schema';
import { TO_RICOS_DATA_FIELD } from '../../draft/consts';
import { JSONContent } from '@tiptap/core';
import { isDecoration, isNode } from '../utils';

declare const a: RichContent;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProseMirror = <T extends RichContent | Node | Record<string, any>>(
  richContent: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): T extends RichContent | Node ? JSONContent : Record<string, any> => {
  const jsonContent = isRichContent(richContent)
    ? RichContent.toJSON(richContent)
    : isNode(richContent)
    ? Node.toJSON(richContent)
    : JSON.parse(JSON.stringify(richContent)); // remove undefined values
  const { proseContent } = convertToProse({ proseContent: jsonContent });
  return proseContent;
};

const PROSE_DATA_FIELDS_MAP = Object.fromEntries(
  Object.values(TO_RICOS_DATA_FIELD)
    .concat('textData')
    .map(value => [value, 'attrs'])
);
const FIELDS_MAP = {
  nodes: 'content',
  decorations: 'marks',
  ...PROSE_DATA_FIELDS_MAP,
};

const fieldMapper = (fieldName: string | number | symbol, value) =>
  isDataFieldName(fieldName, value) ? 'attrs' : FIELDS_MAP[fieldName] || fieldName;

const typeToLower = (object: Node | Decoration) => ({ ...object, type: object.type.toLowerCase() });

const addDocType = (content: RichContent) => ({ type: 'doc', ...content });

const moveMetadata = ({ metadata, ...content }: RichContent) => ({
  ...content,
  attrs: { metadata },
});

const flattenTextData = (node: Node) => {
  const { textData, ...newNode } = node;
  return { ...newNode, ...textData };
};

const moveToData = (node: Node) => {
  const { style, key, ...rest } = node;
  const dataFieldName = DATA_FIELDS_MAP[node.type];
  const dataField = { ...node[dataFieldName], ...pickBy({ style, key }, identity) };
  return { ...rest, [dataFieldName]: dataField };
};

const convertValue = value => {
  let newValue = value;
  if (isRichContent(newValue)) {
    newValue = addDocType(newValue);
    newValue = moveMetadata(newValue);
  }
  if (newValue?.textData) {
    newValue = flattenTextData(newValue);
  }
  if (isNode(newValue)) {
    newValue = moveToData(newValue);
  }
  if (isNode(newValue) || isDecoration(newValue)) {
    newValue = typeToLower(newValue);
  }
  return newValue;
};

const convertToProse = obj => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transform<any, any>(obj, (result, value, key) => {
    const convertedValue = convertValue(value);
    const convertedKey = fieldMapper(key, convertedValue);
    result[convertedKey] = isObject(convertedValue)
      ? convertToProse(convertedValue)
      : convertedValue;
  });
};