import React, { PureComponent } from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import { convertToRaw } from 'wix-rich-content-editor-common';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { testImages, testVideos } from './mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const anchorTarget = '_blank';
const relValue = 'noopener';
let shouldMultiSelectImages = false;

export default class Editor extends PureComponent {
  state = {};
  constructor(props) {
    super(props);
    // ReactModal.setAppElement('#root');
    this.initEditorProps();
    const { scrollingElementFn, testAppPlugins } = props;
    const additionalConfig = { [GALLERY_TYPE]: { scrollingElement: scrollingElementFn } };
    const toolbarsConfig = {
      addPluginMenuConfig: {
        showSearch: true,
        splitToSections: true,
      },
    };
    const pluginsConfig = Plugins.getConfig(additionalConfig);
    console.log({ testAppPlugins });
    this.plugins = testAppPlugins
      ? testAppPlugins.map(plugin => Plugins.editorPluginsMap[plugin]).flat()
      : Plugins.editorPlugins;
    console.log('plugins:', this.plugins);
    this.config = { pluginsConfig: pluginsConfig, toolbarsConfig };
  }

  initEditorProps() {
    const mockUpload = (files, updateEntity) => {
      if (this.props.shouldMockUpload) {
        const mockImageIndex =
          this.props.mockImageIndex || Math.floor(Math.random() * testImages.length);
        const testItem = testImages[mockImageIndex];
        const data = {
          id: testItem.photoId,
          original_file_name: files && files[0] ? files[0].name : testItem.url,
          file_name: testItem.url,
          width: testItem.metadata.width,
          height: testItem.metadata.height,
        };
        setTimeout(() => {
          updateEntity({ data, files });
          console.log('consumer uploaded', data);
        }, 500);
      }
    };
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (plugin_id, entry_point, version) =>
        console.log('biPluginAdd', plugin_id, entry_point, version),
      onPluginDelete: async (plugin_id, version) =>
        console.log('biPluginDelete', plugin_id, version),
      onPluginChange: async (plugin_id, changeObj, version) =>
        console.log('biPluginChange', plugin_id, changeObj, version),
      onPublish: async (postId, pluginsCount, pluginsDetails, version) =>
        console.log('biOnPublish', postId, pluginsCount, pluginsDetails, version),
      //
      // onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
      handleFileSelection: (index, multiple, updateEntity, removeEntity, componentData) => {
        const count = componentData.items || shouldMultiSelectImages ? [1, 2, 3] : [1];
        const data = [];
        count.forEach(_ => {
          const testItem = testImages[Math.floor(Math.random() * testImages.length)];
          data.push({
            id: testItem.photoId,
            original_file_name: testItem.url,
            file_name: testItem.url,
            width: testItem.metadata.width,
            height: testItem.metadata.height,
          });
        });
        setTimeout(() => {
          updateEntity({ data });
        }, 500);
      },
      onVideoSelected: (url, updateEntity) => {
        setTimeout(() => {
          const mockVideoIndex =
            this.props.mockImageIndex || Math.floor(Math.random() * testVideos.length);
          const testVideo = testVideos[mockVideoIndex];
          updateEntity(testVideo);
        }, this.props.mockImageIndex || 500);
      },
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        try {
          document.documentElement.style.height = '100%';
          document.documentElement.style.position = 'relative';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        try {
          document.documentElement.style.height = 'initial';
          document.documentElement.style.position = 'initial';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null,
          modalContent: null,
        });
      },
    };
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.setEditorToolbars();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.staticToolbar !== this.props.staticToolbar) {
      this.setEditorToolbars();
    }
    if (prevProps.shouldMultiSelectImages !== this.props.shouldMultiSelectImages) {
      shouldMultiSelectImages = this.props.shouldMultiSelectImages;
    }
  }

  setEditorToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  };

  render() {
    const modalStyles = {
      content: {
        ...(this.state.modalStyles || modalStyleDefaults).content,
        ...theme.modalTheme.content,
      },
      overlay: {
        ...(this.state.modalStyles || modalStyleDefaults).overlay,
        ...theme.modalTheme.overlay,
      },
    };
    const {
      staticToolbar,
      isMobile,
      editorState,
      initialState,
      locale,
      localeResource,
      onChange,
      isSSR,
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType = staticToolbar && !isMobile ? 'static' : null;
    const { onRequestClose } = this.state.modalProps || {};

    const editorProps = {
      anchorTarget,
      relValue,
      locale,
      localeResource,
      theme,
      textToolbarType,
      isMobile,
      initialState,
      editorState,
    };
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div className="editor">
        {TopToolbar && (
          <div className="toolbar-wrapper">
            <TopToolbar />
          </div>
        )}
        <RichContentEditor
          placeholder={'Add some text!'}
          ref={editor => (this.editor = editor)}
          onChange={onChange}
          helpers={this.helpers}
          plugins={this.plugins}
          // config={Plugins.getConfig(additionalConfig)}
          config={this.config}
          editorKey="random-editorKey-ssr"
          // siteDomain="https://www.wix.com"
          {...editorProps}
        />

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={modalStyles}
          role="dialog"
          onRequestClose={onRequestClose || this.helpers.closeModal}
        >
          <RichContentEditorModal
            modalsMap={ModalsMap}
            locale={this.props.locale}
            {...this.state.modalProps}
          />
        </ReactModal>
      </div>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  staticToolbar: PropTypes.bool,
  locale: PropTypes.string,
  localeResource: PropTypes.object,
};
