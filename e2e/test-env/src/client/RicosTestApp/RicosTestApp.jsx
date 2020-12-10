import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RicosEditor } from 'ricos-editor';
import { RicosViewer } from 'ricos-viewer';
import { default as editorPlugins } from './editorPlugins';
import { default as viewerPlugins } from './viewerPlugins';
import './styles.global.scss';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import theme from '../../../../../examples/main/shared/theme/theme';
import { testVideos } from '../../../../../examples/main/shared/utils/mock';
import {
  mockTestImageUpload,
  mockTestImageNativeUpload,
  mockTestFileUpload,
  mockTestFileNativeUpload,
} from '../../../../../examples/main/shared/utils/fileUploadUtil';
import { createPreview } from 'wix-rich-content-preview';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { ricosPalettes } from '../../../../tests/resources/palettesExample';
import { themes } from '../consumersThemes/themes';

const onVideoSelected = (url, updateEntity) => {
  setTimeout(() => updateEntity(testVideos[1]), 1);
};
const determinePalette = paletteType =>
  paletteType ? (paletteType === 'light' ? ricosPalettes[1] : ricosPalettes[9]) : undefined;
const setBackground = palette => (palette ? { backgroundColor: palette.bgColor } : {});
const setForeground = palette => (palette ? { color: palette.textColor } : {});
const customStyles = {
  h2: {
    fontFamily: 'Times',
    fontSize: '26px',
    color: 'orange',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  h3: {
    fontFamily: 'Tahoma',
    fontSize: '20px',
    color: 'purple',
    textDecoration: 'none',
  },
  quote: {
    lineHeight: '24px',
    fontWeight: 'bold',
    color: 'ocean',
    textDecoration: 'underline',
  },
  link: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'brown',
  },
  hashtag: {
    color: 'purple',
  },
};
class RicosTestApp extends PureComponent {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
  }

  renderEditor = () => {
    const { contentState, onRicosEditorChange, locale, isMobile, testAppConfig = {} } = this.props;
    const { addPluginMenuConfig, footerToolbarConfig } = testAppConfig.toolbarConfig || {};
    const { skipCssOverride, paletteType, useCustomStyles } = testAppConfig.theme || {};
    const { consumer } = testAppConfig;
    const consumerThemeConfig = { isViewer: false, isSeo: false, isMobile };
    const consumerTheme = themes[consumer]?.(consumerThemeConfig);
    const palette = determinePalette(paletteType);
    const isNativeUpload = testAppConfig?.isNativeUpload;

    const createToolbarSettings = (addPluginMenuConfig, footerToolbarConfig) => ({
      getToolbarSettings: () => [
        { name: TOOLBARS.SIDE, addPluginMenuConfig },
        {
          name: TOOLBARS.MOBILE,
          addPluginMenuConfig,
        },
        { name: TOOLBARS.FOOTER, footerToolbarConfig },
      ],
    });

    const uploadHandler = isNativeUpload
      ? {
          onFileSelected: mockTestFileNativeUpload,
        }
      : {
          handleFileSelection: mockTestFileUpload,
        };
    const nativeFileUploadConfig = {
      'wix-draft-plugin-file-upload': uploadHandler,
    };

    return (
      <RicosEditor
        plugins={editorPlugins(testAppConfig.plugins)}
        placeholder={'Add some text!'}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        theme={{ ...(palette || {}), customStyles: useCustomStyles ? customStyles : {} }}
        cssOverride={consumerTheme ? consumerTheme : !skipCssOverride && theme}
        toolbarSettings={createToolbarSettings(addPluginMenuConfig, footerToolbarConfig)}
        onChange={onRicosEditorChange}
      >
        <RichContentEditor
          config={{ ...testAppConfig.pluginsConfig, ...nativeFileUploadConfig }}
          helpers={{
            onVideoSelected,
            handleFileSelection: !isNativeUpload ? mockTestImageUpload : undefined,
            handleFileUpload: isNativeUpload ? mockTestImageNativeUpload : undefined,
          }}
        />
      </RicosEditor>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode, testAppConfig = {} } = this.props;
    const { skipCssOverride, paletteType, useCustomStyles } = testAppConfig.theme || {};
    const { consumer } = testAppConfig;
    const consumerThemeConfig = { isViewer: true, isSeo: seoMode, isMobile };
    const consumerTheme = themes[consumer]?.(consumerThemeConfig);
    const palette = determinePalette(paletteType);
    return (
      <RicosViewer
        plugins={viewerPlugins(testAppConfig.plugins)}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        theme={{ ...(palette || {}), customStyles: useCustomStyles ? customStyles : {} }}
        cssOverride={consumerTheme ? consumerTheme : !skipCssOverride && theme}
        seoSettings={seoMode}
        preview={testAppConfig.showDefaultPreview && createPreview()}
      />
    );
  };

  render() {
    const { isMobile, testAppConfig = {} } = this.props;
    const { theme: { paletteType } = {}, applyOuterStyle } = testAppConfig;
    const palette = determinePalette(paletteType);
    const addStyle = applyOuterStyle
      ? { color: 'white', fontFamily: 'Times', backgroundColor: 'black' }
      : {};
    return (
      <div
        className={`testApp ${isMobile ? 'mobile' : ''}`}
        style={{ ...setBackground(palette), ...addStyle }}
      >
        <div>
          <h3 style={setForeground(palette)}>Editor</h3>
          <div className="rcWrapper rce" id="RicosEditorContainer" data-hook="ricos-editor">
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3 style={setForeground(palette)}>Viewer</h3>
          <div
            className="rcWrapper rcv"
            id="RicosViewerContainer"
            data-hook="ricos-viewer"
            ref={this.viewerRef}
          >
            {this.renderViewer()}
            <TextSelectionToolbar container={this.viewerRef.current}>
              {selectedText => <TwitterButton selectedText={selectedText} />}
            </TextSelectionToolbar>
          </div>
        </div>
      </div>
    );
  }
}

RicosTestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  localeResource: PropTypes.object,
  onRicosEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
  testAppConfig: PropTypes.object,
};

export default windowContentStateHoc(RicosTestApp);
