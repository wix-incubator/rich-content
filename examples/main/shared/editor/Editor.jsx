import React, { PureComponent } from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import { convertToRaw } from 'draft-js';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { testImages, testVideos } from './mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles
import { SimplifiedRCE, themeStrategy, pluginsStrategy } from 'wix-rich-content-wrapper';
import inlineToolbarTheme from '../theme/toolbars/inline-toolbar.theme.scss';
import pluginButton from 'wix-rich-content-plugin-button';
import pluginImage from 'wix-rich-content-plugin-image';
import pluginHtml from 'wix-rich-content-plugin-html';
import pluginDivider from 'wix-rich-content-plugin-divider';
import pluginGallery from 'wix-rich-content-plugin-gallery';

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
        }, 500);
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

  handleChange = editorState => {
    this.setState({ editorState });
    if (typeof window !== 'undefined') {
      // ensures that tests fail when entity map is mutated
      const raw = convertToRaw(editorState.getCurrentContent());
      // const raw = deepFreeze(rr);
      window.__CONTENT_STATE__ = raw;
      window.__CONTENT_SNAPSHOT__ = {
        ...raw,
        // blocks keys are random so for snapshot diffing they are changed to indexes
        blocks: raw.blocks.map((block, index) => ({ ...block, key: index })),
      };
    }
    this.props.onChange && this.props.onChange(editorState);
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
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType = this.props.staticToolbar && !this.props.isMobile ? 'static' : null;
    //const { onRequestClose } = this.state.modalProps || {};
    return (
      <div className="editor">
        {MobileToolbar && <MobileToolbar />}
        {TextToolbar && (
          <div className="toolbar-wrapper">
            <TextToolbar />
          </div>
        )}
        <SimplifiedRCE
          settings={{
            plugins: [pluginButton(), pluginDivider(), pluginGallery(), pluginHtml(), pluginImage()],
            theme: "Default",
          }}
          helpers={this.helpers}
          onChange={this.handleChange}
          placeholder={'Add some text!'}
          //ref={editor => (this.editor = editor)}
          isMobile={this.props.isMobile}
          textToolbarType={textToolbarType}
          editorKey="random-editorKey-ssr"
          anchorTarget={anchorTarget}
          relValue={relValue}
          locale={this.props.locale}
          localeResource={this.props.localeResource}>
          <RichContentEditor
            placeholder={'Add some text!'}
            ref={editor => (this.editor = editor)}
            //helpers={this.helpers}
            //plugins={Plugins.editorPlugins}
            //config={Plugins.config}
            //editorState={this.props.editorState}
            //initialState={this.props.initialState}
            isMobile={this.props.isMobile}
            textToolbarType={textToolbarType}
            //theme={theme}
            editorKey="random-editorKey-ssr"
            anchorTarget={anchorTarget}
            relValue={relValue}
            locale={this.props.locale}
            localeResource={this.props.localeResource}
          // siteDomain="https://www.wix.com"
          />
        </SimplifiedRCE>
        {/* <ReactModal
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
        </ReactModal> */}
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
