import { CSSProperties, ComponentType } from 'react';
import { Styles as ReactModalStyles } from 'react-modal';
import { ComponentData, RicosContent } from 'ricos-content';
import {
  DecorationMode,
  TranslationFunction,
  Helpers,
  LegacyEditorPluginConfig,
  LegacyViewerPluginConfig,
} from '.';
import { BoundingRect } from 'react-measure';
import { ContentBlock, SelectionState, EditorState } from 'draft-js';

export { Pubsub, Store } from '../Utils/simplePubsub';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export type RichContentTheme = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
  modalTheme?: ModalStyles;
};

export type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Record<string, string>,
  isMobile: boolean,
  innerRCERenderedIn: string
) => string;

export type ContainerClassNameStrategy = (theme: RichContentTheme) => string;

export { TranslationFunction, ResourceKey as LocaleResource } from 'i18next';

export type AnchorTarget = HTMLAnchorElement['target'];
export type RelValue = HTMLAnchorElement['rel'];

export type GetEditorBounds = () => BoundingRect | undefined;

export type OpenModalFunction = (data: Record<string, unknown>) => void;
export type CloseModalFunction = () => void;

export type InnerModalType = {
  openInnerModal: OpenModalFunction;
  closeInnerModal: CloseModalFunction;
};

export type ModalDecorations = {
  decorationMode: DecorationMode;
  decorator: ComponentType;
}[];

export type OnConfirmFunction = (
  data
) => {
  newBlock: ContentBlock;
  newSelection: SelectionState;
  newEditorState: EditorState;
};

export type TextDirection = 'rtl' | 'ltr';

export interface SEOSettings {
  paywall?: {
    className?: string;
    index?: number;
  };
}

interface CommonContextType {
  theme: RichContentTheme;
  t: TranslationFunction;
  locale: string;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  helpers: Helpers;
  isMobile: boolean;
  iframeSandboxDomain?: string;
}

export interface EditorContextType extends CommonContextType {
  config: LegacyEditorPluginConfig;
  setEditorState: (editorState: EditorState) => void;
  getEditorState: () => EditorState;
  getEditorBounds: GetEditorBounds;
  languageDir: TextDirection;
  shouldRenderOptimizedImages?: boolean;
  siteDomain?: string;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  getInPluginEditingMode: () => boolean;
  innerModal: InnerModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInnerRCE: (params: any) => JSX.Element;
  innerRCERenderedIn?: string;
  disableKeyboardEvents: (shouldEnable: boolean) => void;
}

export interface ViewerContextType extends CommonContextType {
  config: LegacyViewerPluginConfig;
  disabled?: boolean;
  seoMode?: SEOSettings;
  disableRightClick?: boolean;
  contentState?: RicosContent;
  textAlignment?: 'left' | 'right';
}

export type Experiment = {
  value: string;
  enabled: boolean;
  namespace: string;
};

export type AvailableExperiments = Record<string, Experiment>;
