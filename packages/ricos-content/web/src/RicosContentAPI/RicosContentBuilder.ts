import { pick, merge } from 'lodash/fp';
import {
  ButtonData,
  CodeData,
  DividerData,
  FileData,
  GalleryData,
  GiphyData,
  HTMLData,
  HeadingData,
  ImageData,
  LinkPreviewData,
  MapData,
  Node,
  Node_Type,
  ParagraphData,
  PollData,
  RichContent,
  SoundCloudData,
  TextData,
  VideoData,
} from 'ricos-schema';
import {
  addNode as add,
  toTextDataArray,
  removeNode,
  setNode as set,
  updateNode as update,
  toggleNodeType,
} from './builder-utils';
import { ContentBuilder } from '../types';

const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.ACTION_BUTTON]: { buttonData: data as ButtonData },
    [Node_Type.CODEBLOCK]: { codeData: data as CodeData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.HEADING]: { headingData: data as HeadingData },
    [Node_Type.FILE]: { fileData: data as FileData },
    [Node_Type.GALLERY]: { galleryData: data as GalleryData },
    [Node_Type.GIPHY]: { giphyData: data as GiphyData },
    [Node_Type.HTML]: { htmlData: data as HTMLData },
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.LINK_BUTTON]: { buttonData: data as ButtonData },
    [Node_Type.LINK_PREVIEW]: { LinkPreviewData: data as LinkPreviewData },
    [Node_Type.MAP]: { mapData: data as MapData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
    [Node_Type.POLL]: { pollData: data as PollData },
    [Node_Type.SOUND_CLOUD]: { SoundCloudData: data as SoundCloudData },
    [Node_Type.TEXT]: { textData: data as TextData },
    [Node_Type.VIDEO]: { videoData: data as VideoData },
  }[type]);

type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

type AddTextMethodParams<T> = AddMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
};

type SetMethodParams<TData> = {
  data: TData;
  key: string;
  content: RichContent;
};

type SetTextMethodParams<T> = SetMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
};

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

export const setupContentBuilder = (
  generateKey: () => string
): ContentBuilder & { RicosContentBuilder: RicosBuilder } => {
  function createNode(type: Node_Type, data: unknown): Node {
    return { key: generateKey(), type, ...dataByNodeType(type, data), nodes: [] };
  }

  function createTextNode(type: Node_Type, text: TextData[], data: unknown): Node {
    return {
      ...createNode(type, data),
      nodes: text.map(textData => ({
        nodes: [],
        key: generateKey(),
        type: Node_Type.TEXT,
        ...dataByNodeType(Node_Type.TEXT, textData),
      })),
    };
  }

  function addNode({
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return add({ node, index, before, after, content });
  }

  function addTextNode({
    text,
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return add({ node, index, before, after, content });
  }

  function setNode({
    data,
    type,
    key,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return set({ node, key, content });
  }

  function setTextNode({
    text,
    data,
    type,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return set({ node, key, content });
  }

  function toggleTextNode({
    text,
    data,
    type,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return toggleNodeType({
      node,
      key,
      content,
      convert: ({ sourceNode, targetNode }) =>
        pick(Object.keys(sourceNode), merge(targetNode, sourceNode)),
      canToggle: ({ targetNode }) =>
        [
          Node_Type.PARAGRAPH,
          Node_Type.CODEBLOCK,
          Node_Type.BLOCKQUOTE,
          Node_Type.LIST_ITEM,
          Node_Type.HEADING,
        ].includes(targetNode.type),
    });
  }

  function updateNode({
    data,
    type,
    key,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return update({ node, key, content });
  }

  function updateTextNode({
    text,
    data,
    type,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return update({ node, key, content });
  }

  class RicosContentBuilder {
    removeNode!: (key: string, content: RichContent) => RichContent;
  }

  const builderApis = {};

  [
    { name: 'Paragraph', type: Node_Type.PARAGRAPH, dataT: {} as ParagraphData },
    { name: 'Heading', type: Node_Type.HEADING, dataT: {} as HeadingData },
    { name: 'Code', type: Node_Type.CODEBLOCK, dataT: {} as CodeData },
    { name: 'Blockquote', type: Node_Type.BLOCKQUOTE, dataT: {} as never },
    { name: 'BulletListItem', type: Node_Type.BULLET_LIST, dataT: {} as never },
    { name: 'OrderedListItem', type: Node_Type.ORDERED_LIST, dataT: {} as never },
  ].forEach(({ name, type, dataT }) => {
    builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
      data,
      text,
      index,
      before,
      after,
      content,
    }: AddTextMethodParams<typeof dataT>): RichContent {
      return addTextNode({
        text,
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };

    builderApis[`update${name}`] = RicosContentBuilder.prototype[`update${name}`] = function({
      data,
      text,
      key,
      content,
    }: SetTextMethodParams<typeof dataT>) {
      return updateTextNode({
        text,
        data,
        type,
        key,
        content,
      });
    };

    builderApis[`set${name}`] = RicosContentBuilder.prototype[`set${name}`] = function({
      data,
      key,
      content,
    }: SetTextMethodParams<typeof dataT>) {
      return setTextNode({
        data,
        type,
        key,
        content,
      });
    };

    builderApis[`toggle${name}`] = RicosContentBuilder.prototype[`toggle${name}`] = function({
      data,
      key,
      content,
    }: SetTextMethodParams<typeof dataT>) {
      return toggleTextNode({
        data,
        type,
        key,
        content,
      });
    };
  });

  [
    { name: 'Image', type: Node_Type.IMAGE, dataT: {} as ImageData },
    { name: 'Divider', type: Node_Type.DIVIDER, dataT: {} as DividerData },
    { name: 'LinkPreview', type: Node_Type.LINK_PREVIEW, dataT: {} as LinkPreviewData },
    { name: 'Poll', type: Node_Type.POLL, dataT: {} as PollData },
    { name: 'SoundCloud', type: Node_Type.SOUND_CLOUD, dataT: {} as SoundCloudData },
    { name: 'File', type: Node_Type.FILE, dataT: {} as FileData },
    { name: 'Gallery', type: Node_Type.GALLERY, dataT: {} as GalleryData },
    { name: 'Map', type: Node_Type.MAP, dataT: {} as MapData },
    { name: 'Video', type: Node_Type.VIDEO, dataT: {} as VideoData },
    { name: 'LinkButton', type: Node_Type.LINK_BUTTON, dataT: {} as ButtonData },
    { name: 'ActionButton', type: Node_Type.ACTION_BUTTON, dataT: {} as ButtonData },
    { name: 'Giphy', type: Node_Type.GIPHY, dataT: {} as GiphyData },
    { name: 'Html', type: Node_Type.HTML, dataT: {} as HTMLData },
  ].forEach(({ name, type, dataT }) => {
    builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
      data,
      index,
      before,
      after,
      content,
    }: AddMethodParams<typeof dataT>): RichContent {
      return addNode({
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };

    builderApis[`update${name}`] = RicosContentBuilder.prototype[`update${name}`] = function({
      data,
      key,
      content,
    }: SetMethodParams<typeof dataT>) {
      return updateNode({ data, type, key, content });
    };

    builderApis[`set${name}`] = RicosContentBuilder.prototype[`set${name}`] = function({
      data,
      key,
      content,
    }: SetMethodParams<typeof dataT>) {
      return setNode({ data, type, key, content });
    };
  });

  RicosContentBuilder.prototype.removeNode = removeNode;

  return {
    RicosContentBuilder: (RicosContentBuilder as unknown) as RicosBuilder,
    ...(builderApis as ContentBuilder),
    removeNode,
  };
};
