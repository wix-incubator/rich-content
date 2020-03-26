import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import { get, includes, merge, debounce } from 'lodash';
import Measure from 'react-measure';
import createEditorToolbars from './Toolbars';
import createPlugins from './createPlugins';
import { createKeyBindingFn, initPluginKeyBindings } from './keyBindings';
import handleKeyCommand from './handleKeyCommand';
import handleReturnCommand from './handleReturnCommand';
import blockStyleFn from './blockStyleFn';
import { combineStyleFns } from './combineStyleFns';
import { getStaticTextToolbarId } from './Toolbars/toolbar-id';
import {
  EditorState,
  convertFromRaw,
  TooltipHost,
  TOOLBARS,
  getBlockInfo,
  getFocusedBlockKey,
  calculateDiff,
  getPostContentSummary,
  Modifier,
} from 'wix-rich-content-editor-common';

import {
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  Version,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftStyles from '../../statics/styles/draft.rtlignore.scss';
import { convertFromHTML as draftConvertFromHtml } from 'draft-convert';
import pastedContentConfig from './utils/pastedContentConfig';

class RichContentEditor extends Component {
  static getDerivedStateFromError(error) {
    return { error };
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      editorBounds: {},
    };
    this.refId = Math.floor(Math.random() * 9999);

    props.config.uiSettings = merge(
      {
        blankTargetToggleVisibilityFn: anchorTarget => anchorTarget !== '_blank',
        nofollowRelToggleVisibilityFn: relValue => relValue !== 'nofollow',
      },
      props.config.uiSettings || {}
    );

    this.initContext();
    this.initPlugins();
  }

  componentDidUpdate() {
    this.handleBlockFocus(this.state.editorState);
  }

  handleBlockFocus(editorState) {
    const focusedBlockKey = getFocusedBlockKey(editorState);
    if (focusedBlockKey !== this.focusedBlockKey) {
      this.focusedBlockKey = focusedBlockKey;
      this.onChangedFocusedBlock(focusedBlockKey);
    }
  }

  onChangedFocusedBlock = blockKey => {
    const { onAtomicBlockFocus } = this.props;
    if (onAtomicBlockFocus) {
      if (blockKey) {
        const { type, entityData: data } = getBlockInfo(this.getEditorState(), blockKey);
        onAtomicBlockFocus({ blockKey, type, data });
      }
      onAtomicBlockFocus({});
    }
  };

  getEditorState = () => this.state.editorState;

  setEditorState = editorState => this.setState({ editorState });

  initContext = () => {
    const {
      theme,
      t,
      locale,
      anchorTarget,
      relValue,
      helpers = {},
      config,
      isMobile = false,
      shouldRenderOptimizedImages,
      initialIntent,
      siteDomain,
    } = this.props;

    this.contextualData = {
      theme: theme || {},
      t,
      locale,
      anchorTarget,
      relValue,
      helpers: {
        ...helpers,
        onPluginAdd: (...args) => helpers.onPluginAdd?.(...args, Version.currentVersion),
      },
      config,
      isMobile,
      setEditorState: this.setEditorState,
      getEditorState: this.getEditorState,
      getEditorBounds: this.getEditorBounds,
      languageDir: getLangDir(locale),
      shouldRenderOptimizedImages,
      initialIntent,
      siteDomain,
      setInPluginEditingMode: this.setInPluginEditingMode,
      getInPluginEditingMode: this.getInPluginEditingMode,
    };
  };

  getEditorBounds = () => this.state.editorBounds;

  initPlugins() {
    const { plugins, customStyleFn } = this.props;

    const { pluginInstances, pluginButtons, pluginTextButtons, pluginStyleFns } = createPlugins({
      plugins,
      context: this.contextualData,
    });
    this.initEditorToolbars(pluginButtons, pluginTextButtons);
    this.pluginKeyBindings = initPluginKeyBindings(pluginTextButtons);
    this.plugins = [...pluginInstances, ...Object.values(this.toolbars)];
    this.customStyleFn = combineStyleFns([...pluginStyleFns, customStyleFn]);
  }

  initEditorToolbars(pluginButtons, pluginTextButtons) {
    const { textAlignment } = this.props;
    const buttons = { pluginButtons, pluginTextButtons };

    this.toolbars = createEditorToolbars({
      buttons,
      textAlignment,
      refId: this.refId,
      context: this.contextualData,
    });
  }

  getToolbars = () => ({
    MobileToolbar: this.toolbars[TOOLBARS.MOBILE] ? this.toolbars[TOOLBARS.MOBILE].Toolbar : null,
    TextToolbar:
      this.props.textToolbarType === 'static' ? this.toolbars[TOOLBARS.STATIC].Toolbar : null,
  });

  getInitialEditorState() {
    const { editorState, initialState, anchorTarget, relValue } = this.props;
    if (editorState) {
      return editorState;
    }
    if (initialState) {
      const rawContentState = normalizeInitialState(initialState, { anchorTarget, relValue });
      return EditorState.createWithContent(convertFromRaw(rawContentState));
    } else {
      const emptyContentState = convertFromRaw({
        //this is needed for ssr. Otherwise the key will be generated randomly on both server and client.
        entityMap: {},
        blocks: [
          {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
          },
        ],
      });
      return EditorState.createWithContent(emptyContentState);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editorState !== nextProps.editorState) {
      this.setState({ editorState: nextProps.editorState });
    }
    if (this.props.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
    if (this.props.textToolbarType !== nextProps.textToolbarType) {
      this.setState({ textToolbarType: nextProps.textToolbarType });
    }
  }

  // TODO: get rid of this ASAP!
  // Currently, there's no way to get a static toolbar ref without consumer interference
  findFocusableChildForElement(id) {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  updateEditorState = editorState => {
    const onPluginDelete = this.props.helpers?.onPluginDelete;
    if (onPluginDelete) {
      calculateDiff(this.state.editorState, editorState, (...args) =>
        onPluginDelete(...args, Version.currentVersion)
      );
    }
    this.setEditorState(editorState);
    this.props.onChange?.(editorState);
  };

  handlePastedText = (text, html, editorState) => {
    const { handlePastedText } = this.props;
    if (handlePastedText) {
      return handlePastedText(text, html, editorState);
    }
    let contentState;
    if (html) {
      const htmlContentState = draftConvertFromHtml(pastedContentConfig)(html);
      contentState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        htmlContentState.getBlockMap()
      );
    } else {
      contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text
      );
    }

    const newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
    const resultEditorState = EditorState.set(newEditorState, {
      currentContent: contentState,
      selection: newEditorState.getSelection(),
    });

    this.updateEditorState(resultEditorState);
    return 'handled';
  };

  getCustomCommandHandlers = () => ({
    commands: [
      ...this.pluginKeyBindings.commands,
      {
        command: 'tab',
        modifiers: [],
        key: 'Tab',
      },
    ],
    commandHanders: {
      ...this.pluginKeyBindings.commandHandlers,
      tab: () => {
        if (this.getToolbars().TextToolbar) {
          const staticToolbarButton = this.findFocusableChildForElement(
            `${getStaticTextToolbarId(this.refId)}`
          );
          staticToolbarButton && staticToolbarButton.focus();
        } else {
          this.editor.blur();
        }
      },
    },
  });

  focus = () => setTimeout(this.editor.focus);

  blur = () => this.editor.blur();

  setEditor = ref => (this.editor = get(ref, 'editor', ref));

  inPluginEditingMode = false;

  setInPluginEditingMode = shouldEnable => {
    // As explained in https://github.com/facebook/draft-js/blob/585af35c3a8c31fefb64bc884d4001faa96544d3/src/component/handlers/DraftEditorModes.js#L14
    const mode = shouldEnable ? 'render' : 'edit';
    this.editor.setMode(mode);
    this.inPluginEditingMode = shouldEnable;
  };

  getInPluginEditingMode = () => this.inPluginEditingMode;

  componentWillUnmount() {
    this.updateBounds = () => '';
  }

  componentWillMount() {
    this.updateBounds = editorBounds => {
      this.setState({ editorBounds });
    };
  }

  renderToolbars = () => {
    const toolbarsToIgnore = [
      'MobileToolbar',
      'StaticTextToolbar',
      this.props.textToolbarType === 'static' ? 'InlineTextToolbar' : '',
    ];
    //eslint-disable-next-line array-callback-return
    const toolbars = this.plugins.map((plugin, index) => {
      const Toolbar = plugin.Toolbar || plugin.InlineToolbar || plugin.SideToolbar;
      if (Toolbar) {
        if (includes(toolbarsToIgnore, plugin.name)) {
          return null;
        }
        return <Toolbar key={`k${index}`} />;
      }
    });
    return toolbars;
  };

  renderInlineModals = () => {
    //eslint-disable-next-line array-callback-return
    const modals = this.plugins.map((plugin, index) => {
      if (plugin.InlineModals && plugin.InlineModals.length > 0) {
        return plugin.InlineModals.map((Modal, modalIndex) => {
          return <Modal key={`k${index}m${modalIndex}`} />;
        });
      }
    });
    return modals;
  };

  renderEditor = () => {
    const {
      helpers,
      editorKey,
      tabIndex,
      placeholder,
      spellCheck,
      stripPastedStyles,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      ariaActiveDescendantID,
      ariaAutoComplete,
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      ariaLabel,
      ariaMultiline,
      onBlur,
      onFocus,
      textAlignment,
      handleBeforeInput,
      handleReturn,
    } = this.props;
    const { editorState } = this.state;
    const { theme } = this.contextualData;

    return (
      <Editor
        ref={this.setEditor}
        handleReturn={
          handleReturn
            ? handleReturn(this.updateEditorState)
            : handleReturnCommand(this.updateEditorState)
        }
        editorState={editorState}
        onChange={this.updateEditorState}
        handleBeforeInput={handleBeforeInput}
        handlePastedText={this.handlePastedText}
        plugins={this.plugins}
        blockStyleFn={blockStyleFn(theme, this.styleToClass)}
        handleKeyCommand={handleKeyCommand(
          this.updateEditorState,
          this.getCustomCommandHandlers().commandHanders
        )}
        editorKey={editorKey}
        keyBindingFn={createKeyBindingFn(this.getCustomCommandHandlers().commands || [])}
        customStyleFn={this.customStyleFn}
        helpers={helpers}
        tabIndex={tabIndex}
        placeholder={placeholder || ''}
        spellCheck={spellCheck}
        stripPastedStyles={stripPastedStyles}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        ariaActiveDescendantID={ariaActiveDescendantID}
        ariaAutoComplete={ariaAutoComplete}
        ariaControls={ariaControls}
        ariaDescribedBy={ariaDescribedBy}
        ariaExpanded={ariaExpanded}
        ariaLabel={ariaLabel}
        ariaMultiline={ariaMultiline}
        onBlur={onBlur}
        onFocus={onFocus}
        textAlignment={textAlignment}
      />
    );
  };

  renderAccessibilityListener = () => (
    <AccessibilityListener isMobile={this.contextualData.isMobile} />
  );

  renderTooltipHost = () => <TooltipHost theme={this.contextualData.theme} />;

  styleToClass = ([key, val]) => `rich_content_${key}-${val.toString().replace('.', '_')}`;

  renderStyleTag = () => {
    const styleToCss = ([key, val]) => `${key}: ${val};`;
    const blocks = this.getEditorState()
      .getCurrentContent()
      .getBlockMap();
    const styles = {};
    blocks.forEach(block => {
      const { dynamicStyles = {} } = block.get('data').toJS();
      Object.entries(dynamicStyles).forEach(
        style => (styles[this.styleToClass(style)] = styleToCss(style))
      );
    });
    const css = Object.entries(styles).reduce(
      (cssString, [className, css]) => `${cssString}[dir] .${className} {${css}}`,
      ''
    );
    return <style id="dynamicStyles">{css}</style>;
  };

  onResize = debounce(({ bounds }) => this.updateBounds(bounds), 100);

  render() {
    const { onError } = this.props;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { isMobile } = this.props;
      const { theme } = this.contextualData;
      const wrapperClassName = classNames(draftStyles.wrapper, styles.wrapper, theme.wrapper, {
        [styles.desktop]: !isMobile,
        [theme.desktop]: !isMobile && theme && theme.desktop,
      });
      return (
        <Measure bounds onResize={this.onResize}>
          {({ measureRef }) => (
            <div
              style={this.props.style}
              ref={measureRef}
              className={wrapperClassName}
              dir={getLangDir(this.props.locale)}
            >
              {this.renderStyleTag()}
              <div className={classNames(styles.editor, theme.editor)}>
                {this.renderAccessibilityListener()}
                {this.renderEditor()}
                {this.renderToolbars()}
                {this.renderInlineModals()}
                {this.renderTooltipHost()}
              </div>
            </div>
          )}
        </Measure>
      );
    } catch (err) {
      onError(err);
      return null;
    }
  }
}

RichContentEditor.publish = async (postId, editorState = {}, callBack = () => true) => {
  const postSummary = getPostContentSummary(editorState);
  callBack({ postId, ...postSummary });
};

RichContentEditor.propTypes = {
  editorKey: PropTypes.string,
  editorState: PropTypes.object,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  t: PropTypes.func,
  textToolbarType: PropTypes.oneOf(['inline', 'static']),
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  config: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  ariaActiveDescendantID: PropTypes.string,
  ariaAutoComplete: PropTypes.string,
  ariaControls: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaMultiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  textAlignment: PropTypes.oneOf(['left', 'right', 'center']),
  handleBeforeInput: PropTypes.func,
  handlePastedText: PropTypes.func,
  handleReturn: PropTypes.func,
  customStyleFn: PropTypes.func,
  locale: PropTypes.string.isRequired,
  shouldRenderOptimizedImages: PropTypes.bool,
  onAtomicBlockFocus: PropTypes.func,
  initialIntent: PropTypes.string,
  siteDomain: PropTypes.string,
  onError: PropTypes.func,
};

RichContentEditor.defaultProps = {
  config: {},
  spellCheck: true,
  customStyleFn: () => ({}),
  locale: 'en',
  onError: err => {
    throw err;
  },
};

export default RichContentEditor;
