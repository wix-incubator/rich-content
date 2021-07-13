/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftDefaultStyles from 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import rtlIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';
import {
  LINK_PREVIEW_TYPE,
  TABLE_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
  LINK_TYPE,
  IMAGE_TYPE,
  VIDEO_TYPE,
  GIPHY_TYPE,
  EMOJI_TYPE,
  FILE_UPLOAD_TYPE,
  DIVIDER_TYPE,
  CODE_BLOCK_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
  SPOILER_TYPE,
} from 'wix-rich-content-common';
import { cloneDeep } from 'lodash';
import { isCursorAtStartOfContent, selectAllContent } from 'wix-rich-content-editor-common';
import ClickOutside from 'react-click-outsider';

const SupportedTablePlugins = [
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
  LINK_TYPE,
  IMAGE_TYPE,
  VIDEO_TYPE,
  GIPHY_TYPE,
  EMOJI_TYPE,
  FILE_UPLOAD_TYPE,
  DIVIDER_TYPE,
  CODE_BLOCK_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
  SPOILER_TYPE,
];

class InnerRCE extends PureComponent {
  constructor(props) {
    super(props);
    const { config, editing } = props;
    this.config = this.cleanConfig(cloneDeep(config));
    this.plugins = this.getPlugins();
    this.state = {
      showToolbars: editing || false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.innerRCERenderedIn === TABLE_TYPE &&
      prevProps.editing === false &&
      prevProps.editing !== this.props.editing
    ) {
      this.handleAtomicPluginsBorders(true);
    }
  }

  getPlugins = () => {
    const { config, innerRCERenderedIn, plugins } = this.props;
    let pluginsList;
    if (config[innerRCERenderedIn].innerRCEPlugins) {
      pluginsList = config[innerRCERenderedIn].innerRCEPlugins;
    } else {
      pluginsList = plugins;
    }
    const innerRCEPlugins = pluginsList.filter(plugin =>
      SupportedTablePlugins.includes(plugin.functionName)
    );
    return innerRCEPlugins;
  };

  cleanConfig = config => {
    let clearConfig = config;
    clearConfig = this.removeAnchorFromLink(clearConfig);
    clearConfig = this.removeLinkPreview(clearConfig);
    return clearConfig;
  };

  removeLinkPreview = config => {
    if (config?.[LINK_PREVIEW_TYPE]) {
      config[LINK_PREVIEW_TYPE] = undefined;
    }
    return config;
  };

  removeAnchorFromLink = config => {
    if (config?.LINK?.linkTypes?.anchor) {
      config.LINK.linkTypes.anchor = false;
    }
    return config;
  };

  shouldTriggerOnChange = editorState =>
    !this.props.experiments?.UseUndoForPlugins?.enabled ||
    !['undo', 'redo'].includes(editorState.getLastChangeType());

  onChange = editorState => {
    this.shouldTriggerOnChange(editorState) && this.props.onChange(editorState);
    this.editorHeight = this.editorWrapper.offsetHeight;
  };

  getToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.ref.getToolbars();
    return { MobileToolbar, TextToolbar };
  };

  getToolbarProps = type => {
    const { buttons, context, pubsub } = this.ref.getToolbarProps(type);
    return { buttons, context, pubsub };
  };

  selectAllContent = forceSelection => selectAllContent(this.props.editorState, forceSelection);

  focus = () => this.ref.focus();

  setRef = ref => (this.ref = ref);

  setEditorWrapper = ref => (this.editorWrapper = ref);

  onBackspaceAtBeginningOfContent = editorState => {
    const { onBackspaceAtBeginningOfContent } = this.props;

    if (onBackspaceAtBeginningOfContent) {
      const contentState = editorState.getCurrentContent();
      const isUnstyledBlock = contentState.getBlocksAsArray()[0].getType() === 'unstyled';

      if (isCursorAtStartOfContent(editorState) && isUnstyledBlock) {
        onBackspaceAtBeginningOfContent();
      }
    }
  };

  onFocus = e => {
    e.stopPropagation();
    this.ref && this.props.setEditorToolbars(this.ref);
    // this.ref && this.props.setActiveEditor(this.ref);
    this.props.setInPluginEditingMode(true);
    if (!this.state.showToolbars) {
      this.setState({ showToolbars: true });
    }
  };

  onClickOutside = e => {
    if (
      this.state.showToolbars &&
      this.editorWrapper &&
      e.target &&
      !e.target.closest('[data-id=rich-content-editor-modal]') &&
      !e.target.closest('[class=ReactModalPortal]') &&
      !this.editorWrapper.contains(e.target) &&
      !e.target.closest('[data-hook=table-plugin-cell]') &&
      !e.target.closest('[data-id="toolbar"]')
    ) {
      this.setState({ showToolbars: false });
    }
  };

  handleAtomicPluginsBorders = enterEditing => {
    const { editing = true } = this.props;
    const { showToolbars } = this.state;
    const hideBorder = !showToolbars || !editing;
    if (this.editorWrapper) {
      const atomicBlocksNodeList = this.editorWrapper.querySelectorAll('[data-focus]');
      const atomicBlocks = Array.apply(null, atomicBlocksNodeList);
      atomicBlocks.forEach(block => {
        const blockDataFocus = enterEditing ? 'true' : block.getAttribute('data-focus');
        block.setAttribute('data-focus', hideBorder ? 'false' : blockDataFocus);
        block.style.boxShadow = hideBorder ? 'none' : '';
      });
    }
  };

  render() {
    const {
      theme,
      isMobile,
      additionalProps = {},
      readOnly,
      direction,
      toolbarsToIgnore = [],
      editorState,
      editing = true,
      innerRCERenderedIn,
      tablePluginMenu,
      ...rest
    } = this.props;
    const { showToolbars } = this.state;
    this.handleAtomicPluginsBorders();
    const renderedInTable = innerRCERenderedIn === TABLE_TYPE;
    if (renderedInTable && isMobile) {
      toolbarsToIgnore.push('SideToolbar');
    }
    const tableClassNames = classNames(
      styles.renderedInTable,
      draftDefaultStyles.renderedInTable,
      rtlIgnoredStyles.renderedInTable
    );
    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div
          data-id="inner-rce"
          onFocus={this.onFocus}
          className={classNames(
            styles.editor,
            theme.editor,
            renderedInTable && tableClassNames,
            'inner-rce'
          )}
          ref={this.setEditorWrapper}
        >
          <RichContentEditor
            {...rest} // {...rest} need to be before editorState, onChange, plugins
            ref={this.setRef}
            editorState={editorState}
            onChange={this.onChange}
            plugins={this.plugins}
            config={this.config}
            isMobile={isMobile}
            toolbarsToIgnore={['FooterToolbar', ...toolbarsToIgnore]}
            showToolbars={editing && showToolbars}
            isInnerRCE
            innerRCERenderedIn={innerRCERenderedIn}
            editorKey="inner-rce"
            readOnly={readOnly}
            onBackspace={this.onBackspaceAtBeginningOfContent}
            direction={direction}
            tablePluginMenu={tablePluginMenu}
            {...additionalProps}
          />
        </div>
      </ClickOutside>
    );
  }
}

InnerRCE.propTypes = {
  editorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
  additionalProps: PropTypes.object,
  onBackspaceAtBeginningOfContent: PropTypes.func,
  readOnly: PropTypes.bool,
  setEditorToolbars: PropTypes.func,
  // setActiveEditor: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  direction: PropTypes.string,
  toolbarsToIgnore: PropTypes.array,
  editing: PropTypes.bool,
  tablePluginMenu: PropTypes.bool,
  experiments: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InnerRCE;
