/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent, ReactElement } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap, debounce } from 'lodash';
import { set, get } from 'local-storage';
import { ErrorBoundary, Fab, SectionHeader, SectionContent, ExternalToolbar } from './Components';
import {
  generateKey,
  loadStateFromStorage,
  saveStateToStorage,
  disableBrowserBackButton,
} from './utils';
import { SectionSettings, OnVisibilityChanged } from './types';
import { DraftContent } from 'wix-rich-content-common';
import ContentStateEditorType from './Components/ContentStateEditor';
import { EditorState } from 'draft-js';
import { RichContent } from 'ricos-schema';
import { ensureDraftContent, ensureRicosContent } from 'ricos-content/libs/migrateSchema';
import { themeStrategy } from 'ricos-common';
import { FONTS, EXPERIMENTS, ricosPalettes } from '../../../e2e/tests/resources';

const ContentStateEditor = React.lazy(() => import('./Components/ContentStateEditor'));
const Editor = React.lazy(() => import('../shared/editor/Editor'));
const Viewer = React.lazy(() => import('../shared/viewer/Viewer'));
const Preview = React.lazy(() => import('../shared/preview/Preview'));

interface ExampleAppProps {
  isMobile?: boolean;
  onContentStateChange?: (contentState: DraftContent) => void;
  contentState?: DraftContent;
  injectedContent?: DraftContent;
  setLocale?: (locale: string) => void;
  locale?: string;
  allLocales?: string[];
  editorState?: EditorState;
  onEditorChange?: (editorState: EditorState) => void;
  onRicosEditorChange?: (contentState: DraftContent) => void;
  localeResource?: Record<string, string>;
}

interface ExampleAppState {
  containerKey?: string;
  isEditorShown?: boolean;
  isViewerShown?: boolean;
  isPreviewShown?: boolean;
  isContentStateShown?: boolean;
  viewerResetKey?: number;
  previewResetKey?: number;
  editorResetKey?: number;
  shouldMockUpload?: boolean;
  shouldMultiSelectImages?: boolean;
  shouldNativeUpload?: boolean;
  shouldUseNewContent?: boolean;
  [key: string]: any;
}

class ExampleApp extends PureComponent<ExampleAppProps, ExampleAppState> {
  editorSettings: SectionSettings[];
  viewerSettings: SectionSettings[];
  editorScrollingElementFn: () => Element;
  viewerScrollingElementFn: () => Element;
  contentStateEditor: ContentStateEditorType;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.initSectionsSettings();
    disableBrowserBackButton();
  }

  getInitialState() {
    const { isMobile } = this.props;
    const containerKey = generateKey('container');
    const localState = loadStateFromStorage();
    return {
      containerKey,
      isEditorShown: true,
      isViewerShown: !isMobile,
      isPreviewShown: false,
      isContentStateShown: false,
      viewerResetKey: 0,
      previewResetKey: 0,
      editorResetKey: 0,
      shouldMockUpload: true,
      shouldMultiSelectImages: false,
      shouldNativeUpload: false,
      shouldUseNewContent: false,
      styleElement: [],
      ...localState,
    };
  }

  componentDidMount() {
    this.editorScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('editor-example')[0];
    this.viewerScrollingElementFn = () =>
      typeof window !== 'undefined' && document.getElementsByClassName('viewer-example')[0];
    window && window.addEventListener('resize', this.onContentStateEditorResize);
    const contentState = this.loadContentStateFromLocalStorage();
    if (contentState) {
      this.props.onContentStateChange(contentState);
    }
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  componentDidUpdate(prevProps) {
    this.saveContentStateToLocalStorage(this.props.contentState);
  }

  saveContentStateToLocalStorage = debounce(contentState => set('contentState', contentState), 500);

  loadContentStateFromLocalStorage = (): DraftContent => get('contentState');

  setContentStateEditor = (ref: ContentStateEditorType) => (this.contentStateEditor = ref);

  onContentStateEditorResize = () =>
    this.contentStateEditor && this.contentStateEditor.refreshLayout();

  onSectionVisibilityChange: OnVisibilityChanged = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };

  onSetLocale = (locale: string) => {
    this.props.setLocale && this.props.setLocale(locale);
  };

  initSectionsSettings = () => {
    const {
      editorIsMobile,
      shouldMockUpload,
      shouldMultiSelectImages,
      staticToolbar,
      shouldNativeUpload,
      shouldUseNewContent,
    } = this.state;
    this.editorSettings = [
      {
        name: 'Mobile',
        active: editorIsMobile,
        action: () =>
          this.setState(state => ({
            editorIsMobile: !state.editorIsMobile,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
      {
        name: 'Mock Upload',
        active: shouldMockUpload,
        action: () =>
          this.setState(state => ({
            shouldMockUpload: !state.shouldMockUpload,
          })),
      },
      {
        name: 'Native Upload Mock',
        active: shouldNativeUpload,
        action: () =>
          this.setState(state => ({
            shouldNativeUpload: !state.shouldNativeUpload,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
      {
        name: 'Use New Content',
        active: shouldUseNewContent,
        action: () => {
          this.setState(state => ({
            shouldUseNewContent: !state.shouldUseNewContent,
          }));
        },
      },
      {
        name: 'Multi-Select Images',
        active: shouldMultiSelectImages,
        action: () =>
          this.setState(state => ({
            shouldMultiSelectImages: !state.shouldMultiSelectImages,
          })),
      },
      {
        name: 'Static Toolbar',
        active: staticToolbar,
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      },
      {
        name: 'Locale',
        active: this.props.locale,
        action: selectedLocale => this.onSetLocale(selectedLocale),
        items: this.props.allLocales,
      },
      {
        name: 'Experiments',
        getActive: this.getExperiments,
        action: this.onSetExperiment,
        items: EXPERIMENTS,
        itemsType: 'experiments',
      },
      {
        name: 'Palettes',
        getActive: this.getActivePalette,
        action: this.onPaletteChange,
        items: ricosPalettes,
        itemsType: 'palettes',
      },
      {
        name: 'Fonts',
        getActive: this.getActiveFont,
        action: this.onFontChange,
        items: FONTS,
        itemsType: 'fonts',
      },
    ];

    this.viewerSettings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            viewerIsMobile: !state.viewerIsMobile,
            viewerResetKey: state.viewerResetKey + 1,
          })),
      },
    ];
  };

  getActivePalette = () => this.state.activePalette;
  getExperiments = () => this.state.experiments;
  getActiveFont = () => this.state.activeFont;
  getThemeObj = () => {
    const { activeFont, activePalette } = this.state;
    const themeObj: any = {};
    activeFont && (themeObj.customStyles = FONTS[activeFont]);
    activePalette && (themeObj.palette = ricosPalettes[activePalette]);
    return themeObj;
  };

  onPaletteChange = i =>
    this.setState({
      styleElement: this.getHtmlTheme({ palette: ricosPalettes[i] }),
      activePalette: i,
    });

  onFontChange = i =>
    this.setState({ styleElement: this.getHtmlTheme({ customStyles: FONTS[i] }), activeFont: i });

  getHtmlTheme = themeObj => {
    const { html } = themeStrategy({ ricosTheme: { ...this.getThemeObj(), ...themeObj } });
    const htmls: ReactElement[] = [];
    if (html) {
      htmls.push(html);
    }
    return htmls;
  };

  onSetExperiment = (name: string, value: any) => {
    const experiments = {
      ...this.state.experiments,
      [name]: { enabled: value && value !== 'false', namespace: 'ricos', value },
    };
    this.setState({ experiments });
  };

  renderEditor = () => {
    const {
      allLocales,
      editorState,
      onEditorChange,
      locale,
      localeResource,
      isMobile,
      contentState,
      injectedContent,
      onRicosEditorChange,
    } = this.props;
    const {
      isEditorShown,
      staticToolbar,
      shouldMockUpload,
      shouldMultiSelectImages,
      editorIsMobile,
      isToolbarShown,
      shouldNativeUpload,
      shouldUseNewContent,
      experiments,
      styleElement,
    } = this.state;

    return (
      isEditorShown && (
        <ReflexElement
          key={`editor-section-${this.state.editorResetKey}`}
          className="section editor-example"
        >
          <SectionHeader
            title="Editor"
            settings={this.editorSettings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              {...styleElement}
              <Editor
                onChange={onEditorChange}
                editorState={editorState}
                isMobile={editorIsMobile || isMobile}
                shouldMockUpload={shouldMockUpload}
                shouldMultiSelectImages={shouldMultiSelectImages}
                shouldNativeUpload={shouldNativeUpload}
                shouldUseNewContent={shouldUseNewContent}
                staticToolbar={staticToolbar}
                locale={locale}
                localeResource={localeResource}
                scrollingElementFn={this.editorScrollingElementFn}
                externalToolbar={ExternalToolbar}
                contentState={contentState}
                injectedContent={injectedContent}
                onRicosEditorChange={onRicosEditorChange}
                experiments={experiments}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderPreview = () => {
    const { contentState, isMobile, locale, localeResource } = this.props;
    const { isPreviewShown } = this.state;
    const settings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            previewIsMobile: !state.previewIsMobile,
            previewResetKey: state.previewResetKey + 1,
          })),
      },
    ];
    return (
      isPreviewShown && (
        <ReflexElement
          key={`preview-section-${this.state.previewResetKey}`}
          className="section preview-example"
        >
          <SectionHeader
            title="Preview"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Preview
                initialState={ensureDraftContent(contentState)}
                isMobile={this.state.previewIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderViewer = () => {
    const { contentState, isMobile, locale, localeResource } = this.props;
    const { isViewerShown, shouldUseNewContent, experiments } = this.state;

    return (
      isViewerShown && (
        <ReflexElement
          key={`viewer-section-${this.state.viewerResetKey}`}
          className="section viewer-example"
        >
          <SectionHeader
            title="Viewer"
            settings={this.viewerSettings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Viewer
                initialState={contentState}
                isMobile={this.state.viewerIsMobile || isMobile}
                locale={locale}
                localeResource={localeResource}
                scrollingElementFn={this.viewerScrollingElementFn}
                shouldUseNewContent={shouldUseNewContent}
                experiments={experiments}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { contentState, onContentStateChange } = this.props;
    const { isContentStateShown, shouldUseNewContent } = this.state;
    return (
      isContentStateShown && (
        <ReflexElement
          key="contentstate-section"
          className="section"
          onStopResize={this.onContentStateEditorResize}
        >
          <SectionHeader title="Content State" onHide={this.onSectionVisibilityChange} />
          <SectionContent>
            <ContentStateEditor
              ref={this.setContentStateEditor}
              onChange={onContentStateChange}
              contentState={contentState}
              shouldUseNewContent={shouldUseNewContent}
            />
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  setSectionVisibility: OnVisibilityChanged = (sectionName, isVisible) =>
    this.setState({ [`show${sectionName}`]: isVisible });

  renderSections = () => {
    const sections = compact([
      this.renderEditor(),
      this.renderViewer(),
      this.renderPreview(),
      this.renderContentState(),
    ]);

    return flatMap(sections, (val, i, arr) =>
      arr.length - 1 !== i
        ? [val, <ReflexSplitter className="splitter" propagate={true} key={`splitter-${i}`} />]
        : val
    );
  };

  render() {
    const { isMobile } = this.props;
    const { isEditorShown, isViewerShown, isContentStateShown, isPreviewShown } = this.state;
    const showEmptyState =
      !isEditorShown && !isViewerShown && !isContentStateShown && !isPreviewShown;
    this.initSectionsSettings();

    return (
      <div className="wrapper">
        <ReflexContainer orientation="vertical" windowResizeAware={true} className="container">
          {showEmptyState ? (
            <div className="empty-state">Wix Rich Content</div>
          ) : (
            this.renderSections()
          )}
        </ReflexContainer>
        <Fab
          isMobile={isMobile}
          isEditorShown={isEditorShown}
          isViewerShown={isViewerShown}
          isPreviewShown={isPreviewShown}
          isContentStateShown={isContentStateShown}
          toggleSectionVisibility={this.onSectionVisibilityChange}
        />
      </div>
    );
  }
}

export default hot(ExampleApp);
