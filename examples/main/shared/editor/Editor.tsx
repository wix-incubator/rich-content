import React, { ElementType, PureComponent } from 'react';
import { RichContentEditor, RichContentEditorProps } from 'wix-rich-content-editor';
import { testVideos } from '../utils/mock';
import * as Plugins from './EditorPlugins';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { mockImageUploadFunc, mockImageNativeUploadFunc } from '../utils/fileUploadUtil';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import {
  DraftContent,
  TextToolbarType,
  TranslationFunction,
  AvailableExperiments,
  EventName,
  PluginEventParams,
  OnPluginAction,
  // getLangDir,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../src/types';
// import {
//   FloatingToolbarContainer,
//   Toolbar,
//   StaticToolbarContainer,
// } from 'wix-rich-content-toolbars-new';
// import 'wix-rich-content-toolbars-new/dist/styles.min.css';
import { RicosEditor, RicosEditorProps, RicosEditorType } from 'ricos-editor';

const anchorTarget = '_blank';
const rel = { nofollow: true };
const STATIC_TOOLBAR = 'static';

interface ExampleEditorProps {
  theme?: RichContentEditorProps['theme'];
  isMobile?: boolean;
  t: TranslationFunction;
  staticToolbar?: boolean;
  externalToolbarToShow: TOOLBARS;
  locale?: string;
  externalToolbar?: ElementType;
  shouldNativeUpload?: boolean;
  scrollingElementFn?: any;
  testAppConfig?: TestAppConfig;
  mockImageIndex?: number;
  contentState?: DraftContent;
  injectedContent?: DraftContent;
  onRicosEditorChange?: RicosEditorProps['onChange'];
  experiments?: AvailableExperiments;
  externalPopups: boolean;
}

interface State {
  // activeEditor?: RicosEditorType | RichContentEditor;
}

export default class Editor extends PureComponent<ExampleEditorProps, State> {
  getToolbarSettings: RichContentEditorProps['config']['getToolbarSettings'];
  config: RichContentEditorProps['config'];
  helpers: RichContentEditorProps['helpers'];
  editor: RicosEditorType;
  ricosPlugins: RicosEditorProps['plugins'];
  staticToolbarContainer: HTMLDivElement;
  staticToolbarRef!: Element;

  constructor(props: ExampleEditorProps) {
    super(props);
    this.initEditorProps();
    const { scrollingElementFn, testAppConfig = {} } = props;
    const { toolbarConfig } = testAppConfig;
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
      ...(testAppConfig.pluginsConfig || {}),
    };

    const pluginsConfig = Plugins.getConfig(additionalConfig, props.shouldNativeUpload);

    if (toolbarConfig) {
      const getToolbarSettings = toolbarConfig.addPluginMenuConfig
        ? () => [
            { name: 'SIDE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
            { name: 'MOBILE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
          ]
        : () => [];
      pluginsConfig.getToolbarSettings = getToolbarSettings;
    }

    this.getToolbarSettings = pluginsConfig.getToolbarSettings;
    this.config = pluginsConfig;
    this.ricosPlugins = Object.entries(Plugins.ricosEditorPlugins).map(([pluginType, plugin]) =>
      pluginType in pluginsConfig ? plugin(pluginsConfig[pluginType]) : plugin()
    );
    // this.state = { activeEditor: null };
  }

  // componentDidMount() {
  //   this.setState({ activeEditor: this.editor });
  // }

  initEditorProps() {
    const onPluginAction: OnPluginAction = async (
      eventName: EventName,
      params: PluginEventParams
    ) => console.log(eventName, params);
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (plugin_id, entry_point, version) =>
        console.log('biPluginAdd', plugin_id, entry_point, version),
      onPluginAddStep: async params => console.log('onPluginAddStep', params),
      onPluginAddSuccess: async (plugin_id, entry_point, params, version) =>
        console.log('biPluginAddSuccess', plugin_id, entry_point, params, version),
      onPluginDelete: async params => console.log('biPluginDelete', params),
      onPluginChange: async (plugin_id, changeObj, version) =>
        console.log('biPluginChange', plugin_id, changeObj, version),
      onPublish: async (postId, pluginsCount, pluginsDetails, version) =>
        console.log('biOnPublish', postId, pluginsCount, pluginsDetails, version),
      onOpenEditorSuccess: async (...args) => console.log('onOpenEditorSuccess', ...args),
      onContentEdited: async params => console.log('onContentEdited', params),
      onToolbarButtonClick: async params => console.log('onToolbarButtonClick', params),
      onPluginModalOpened: async params => console.log('onPluginModalOpened', params),
      onMenuLoad: async params => console.log('onMenuLoad', params),
      //
      // handleFileUpload: mockImageNativeUploadFunc,
      handleFileSelection: mockImageUploadFunc,
      onVideoSelected: (url, updateEntity) => {
        //todo should be moved to videoConfig (breaking change)
        const mockTimout = isNaN(this.props.mockImageIndex) ? null : 1;
        setTimeout(() => {
          const mockVideoIndex =
            this.props.mockImageIndex || Math.floor(Math.random() * testVideos.length);
          const testVideo = testVideos[mockVideoIndex];
          updateEntity(testVideo);
        }, mockTimout || 500);
      },
      onPluginAction,
    };
    this.setImageUploadHelper();
  }

  setImageUploadHelper = () => {
    const { shouldNativeUpload } = this.props;
    if (shouldNativeUpload) {
      this.helpers.handleFileUpload = mockImageNativeUploadFunc;
      delete this.helpers.handleFileSelection;
    } else {
      this.helpers.handleFileSelection = mockImageUploadFunc;
      delete this.helpers.handleFileUpload;
    }
  };

  renderExternalToolbar() {
    const { externalToolbar: ExternalToolbar, externalToolbarToShow } = this.props;
    if (ExternalToolbar && this.editor) {
      return (
        <div className="toolbar">
          <ExternalToolbar {...this.editor.getToolbarProps(externalToolbarToShow)} theme={theme} />
        </div>
      );
    }
    return null;
  }

  // renderTextFormattingToolbar() {
  //   const { activeEditor } = this.state;
  //   if (activeEditor) {
  //     const { buttons } = activeEditor.getToolbarProps(TOOLBARS.FORMATTING);
  //     const { isMobile, theme, locale, staticToolbar } = this.props;
  //     const buttonsAsArray = Object.values(buttons);
  //     const editorCommands = activeEditor.getEditorCommands();
  //     const selection = (editorCommands as any)._getSelection();
  //     const showFormattingToolbar = !selection.isCollapsed() && selection.getHasFocus();
  //     const t = activeEditor.getT();
  //     const removeToolbarFocus = () => activeEditor.removeToolbarFocus();
  //     const formattingToolbarButtonsKeys = this.config.formattingToolbarButtons;
  //     const ToolbarToRender = (
  //       <Toolbar
  //         theme={theme}
  //         isMobile={isMobile}
  //         t={t}
  //         buttons={buttonsAsArray}
  //         editorCommands={editorCommands}
  //         formattingToolbarButtonsKeys={formattingToolbarButtonsKeys}
  //       />
  //     );
  //     const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? 'static' : null;
  //     return textToolbarType === 'static' ? (
  //       <div style={{ flex: 'none' }} dir={getLangDir(locale)}>
  //         <StaticToolbarContainer>{ToolbarToRender}</StaticToolbarContainer>
  //       </div>
  //     ) : (
  //       <div style={{ flex: 'none' }} dir={getLangDir(locale)}>
  //         <FloatingToolbarContainer
  //           isMobile={isMobile}
  //           showFormattingToolbar={showFormattingToolbar}
  //           removeToolbarFocus={removeToolbarFocus}
  //         >
  //           {ToolbarToRender}
  //         </FloatingToolbarContainer>
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  // setActiveEditor = ref => {
  //   const activeEditor = ref || this.editor;
  //   this.setState({ activeEditor });
  // };

  render() {
    const {
      staticToolbar,
      isMobile,
      locale,
      contentState,
      injectedContent,
      onRicosEditorChange,
      experiments,
      externalPopups,
    } = this.props;
    const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? STATIC_TOOLBAR : null;
    const useStaticTextToolbar = textToolbarType === STATIC_TOOLBAR;

    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        <div ref={ref => (this.staticToolbarContainer = ref)} />
        <div className="editor">
          {/* {experiments?.newFormattingToolbar?.enabled && this.renderTextFormattingToolbar()} */}
          <RicosEditor
            ref={ref => (this.editor = ref)}
            onChange={onRicosEditorChange}
            content={contentState}
            injectedContent={injectedContent}
            linkSettings={{ anchorTarget, rel }}
            locale={locale}
            cssOverride={theme}
            toolbarSettings={{
              useStaticTextToolbar: useStaticTextToolbar,
              textToolbarContainer: useStaticTextToolbar && this.staticToolbarContainer,
              getToolbarSettings: this.getToolbarSettings,
            }}
            isMobile={isMobile}
            placeholder={'Add some text!'}
            plugins={this.ricosPlugins}
            linkPanelSettings={{ ...Plugins.uiSettings.linkPanel, externalPopups }}
            _rcProps={{ helpers: this.helpers }}
            experiments={experiments}
          >
            <RichContentEditor /*setActiveEditor={this.setActiveEditor}*/ />
          </RicosEditor>
        </div>
      </div>
    );
  }
}
