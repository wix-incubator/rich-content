import { EditorState } from 'wix-rich-content-editor-common';
import { COMPONENT_DATA, directions, EXPANDED } from '../../defaults';
import { Store, generateKey } from 'wix-rich-content-common';

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

interface ComponentData {
  config: {
    expandState: string;
    direction: string;
    expandOnlyOne: boolean | undefined;
  };
  pairs: Pair[];
}

const EMPTY_PAIR_VALUE = { title: EditorState.createEmpty(), content: EditorState.createEmpty() };

export class CollapsibleList {
  componentData: ComponentData;

  store: Store;

  constructor(store: Store, componentData: ComponentData) {
    this.store = store;
    this.componentData = componentData;
  }

  getData = (): ComponentData => this.componentData;

  getConfig = (): ComponentData['config'] => this.getData().config;

  getPairs = (): Pair[] => this.getData().pairs;

  getPair = (idx: number): Pair => this.getPairs()[idx];

  getTitle = (idx: number): EditorState => this.getPair(idx).title || EditorState.createEmpty();

  getContent = (idx: number): EditorState => this.getPair(idx).content || EditorState.createEmpty();

  getDirection = (): string => this.getConfig().direction;

  changeDirection = () => {
    const direction = this.getDirection() === directions.LTR ? directions.RTL : directions.LTR;
    const updatedData = { config: { ...this.getConfig(), direction } };
    this.updateData(updatedData);
  };

  getExpandState = (): string => this.getConfig().expandState;

  setExpandState = (expandState: string) => {
    const updatedData = { config: { ...this.getConfig(), expandState } };

    if (expandState === EXPANDED) {
      updatedData.config.expandOnlyOne = undefined;
    }

    this.updateData(updatedData);
  };

  getExpandOnlyOne = (): boolean | undefined => this.getConfig().expandOnlyOne;

  toggleExpandOnlyOne = () => {
    const updatedData = {
      config: { ...this.getConfig(), expandOnlyOne: !this.getExpandOnlyOne() },
    };
    this.updateData(updatedData);
  };

  setData = (data: ComponentData) => {
    this.store.set(COMPONENT_DATA, data);
  };

  updateData = data => {
    const componentData = this.getData();
    this.setData({ ...componentData, ...data });
  };

  setTitle = (idx: number, editorState: EditorState) => {
    const pair = { title: editorState };
    this.setPair(idx, pair);
  };

  setContent = (idx: number, editorState: EditorState) => {
    const pair = { content: editorState };
    this.setPair(idx, pair);
  };

  setPair = (idx: number, updatedPair) => {
    const pairs = [...this.getPairs()];
    const currentPair = this.getPair(idx);
    const newPair = {
      ...(!currentPair.title || !currentPair.content ? EMPTY_PAIR_VALUE : {}),
      ...currentPair,
      ...updatedPair,
    };
    pairs.splice(idx, 1, newPair);
    this.updateData({ pairs });
  };

  createNewPair = () => {
    return {
      key: generateKey(),
      title: EditorState.createEmpty(),
      content: EditorState.createEmpty(),
    };
  };

  insertNewPair = () => {
    const pairs = this.getPairs();
    this.updateData({ pairs: [...pairs, this.createNewPair()] });
  };

  reorderPairs = (startIdx: number, endIdx: number) => {
    const pairs = this.getPairs();
    const [pairToMove] = pairs.splice(startIdx, 1);
    pairs.splice(endIdx, 0, pairToMove);

    this.updateData({ pairs });
  };

  deletePair = (pairIndex: number) => {
    const pairs = this.getPairs();
    pairs.splice(pairIndex, 1);

    this.updateData({ pairs });
  };
}
