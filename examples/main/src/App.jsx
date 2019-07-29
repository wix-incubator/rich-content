/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { compact, flatMap } from 'lodash';
import { convertToRaw, createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import {
  ContentStateEditor,
  ErrorBoundary,
  Fab,
  SectionHeader,
  SectionContent,
} from './Components';
import {
  generateKey,
  getStateFromObject,
  isMobile,
  loadStateFromStorage,
  saveStateToStorage,
} from './utils';
const Editor = React.lazy(() => import('./editor/Editor'));
const Viewer = React.lazy(() => import('./viewer/Viewer'));

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.isMobile = isMobile();
    this.state = this.getInitialState();
  }

  getInitialState() {
    const containerKey = generateKey('container');
    const editorState = createEmpty();
    const localState = loadStateFromStorage();
    return {
      containerKey,
      editorState,
      isEditorShown: true,
      isViewerShown: !this.isMobile,
      isContentStateShown: false,
      viewerResetKey: 0,
      editorResetKey: 0,
      ...localState,
    };
  }

  componentDidMount() {
    window && window.addEventListener('resize', this.onContentStateEditorResize);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.onContentStateEditorResize);
  }

  setContentStateEditor = ref => (this.contentStateEditor = ref);

  onContentStateEditorChange = obj => {
    this.setState(getStateFromObject(obj));
  };

  onContentStateEditorResize = () =>
    this.contentStateEditor && this.contentStateEditor.refreshLayout();

  onEditorChange = editorState => this.setState({ editorState });

  onSectionVisibilityChange = (sectionName, isVisible) => {
    this.setState(
      { [`is${sectionName}Shown`]: isVisible, containerKey: generateKey('prefix') },
      () => {
        saveStateToStorage(this.state);
      }
    );
    this.onContentStateEditorResize();
  };

  renderEditor = () => {
    const { isEditorShown, editorState, staticToolbar } = this.state;
    const settings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            editorIsMobile: !state.editorIsMobile,
            editorResetKey: state.editorResetKey + 1,
          })),
      },
    ];
    if (!isMobile()) {
      settings.push({
        name: 'Static Toolbar',
        action: () => this.setState(state => ({ staticToolbar: !state.staticToolbar })),
      });
    }
    return (
      isEditorShown && (
        <ReflexElement key={`editor-section-${this.state.viewerResetKey}`} className="section">
          <SectionHeader
            title="Editor"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Editor
                onChange={this.onEditorChange}
                editorState={editorState}
                isMobile={this.state.editorIsMobile || this.isMobile}
                staticToolbar={staticToolbar}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderViewer = () => {
    const { isViewerShown, editorState } = this.state;
    const settings = [
      {
        name: 'Mobile',
        action: () =>
          this.setState(state => ({
            viewerIsMobile: !state.viewerIsMobile,
            viewerResetKey: state.viewerResetKey + 1,
          })),
      },
    ];
    const viewerState = JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent()))); //emulate initilState passed in by consumers
    return (
      isViewerShown && (
        <ReflexElement key={`viewer-section-${this.state.viewerResetKey}`} className="section">
          <SectionHeader
            title="Viewer"
            settings={settings}
            onHide={this.onSectionVisibilityChange}
          />
          <SectionContent>
            <ErrorBoundary>
              <Viewer
                initialState={viewerState}
                isMobile={this.state.viewerIsMobile || this.isMobile}
              />
            </ErrorBoundary>
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  renderContentState = () => {
    const { isContentStateShown, editorState } = this.state;
    return (
      isContentStateShown && (
        <ReflexElement
          key="contentstate-section"
          className="section"
          onStopResize={this.onContentStateEditorResize}
        >
          <SectionHeader title="Content State" onHide={this.onSectionVisibilityChange} />
          <SectionContent isLoadedLazily={false}>
            <ContentStateEditor
              ref={this.setContentStateEditor}
              onChange={this.onContentStateEditorChange}
              contentState={convertToRaw(editorState.getCurrentContent())}
            />
          </SectionContent>
        </ReflexElement>
      )
    );
  };

  setSectionVisibility = (sectionName, isVisible) =>
    this.setState({ [`show${sectionName}`]: isVisible });

  renderSections = () => {
    const sections = compact([this.renderEditor(), this.renderViewer(), this.renderContentState()]);

    return flatMap(sections, (val, i, arr) =>
      arr.length - 1 !== i
        ? [val, <ReflexSplitter className="splitter" propagate={true} key={`splitter-${i}`} />]
        : val
    );
  };

  render() {
    const { isEditorShown, isViewerShown, isContentStateShown } = this.state;
    const showEmptyState = !isEditorShown && !isViewerShown && !isContentStateShown;

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
          isMobile={this.isMobile}
          isEditorShown={isEditorShown}
          isViewerShown={isViewerShown}
          isContentStateShown={isContentStateShown}
          toggleSectionVisibility={this.onSectionVisibilityChange}
        />
      </div>
    );
  }
}

export default hot(App);
