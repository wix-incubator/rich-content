import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getVisibleSelectionRect } from '@wix/draft-js';
import Measure from 'react-measure';
import ClickOutside from 'react-click-outside';
import { debounce } from 'lodash';
import { DISPLAY_MODE } from 'wix-rich-content-common';
import Styles from '../../../../statics/styles/inline-toolbar.scss';

const TOOLBAR_OFFSET = 5;

const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

const displayOptionStyles = {
  [DISPLAY_MODE.NORMAL]: {},
  [DISPLAY_MODE.FLOATING]: { position: 'absolute' },
};

export default class InlineToolbar extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    defaultTextAlignment: PropTypes.oneOf(['left', 'right', 'center']),
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    helpers: PropTypes.object,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    t: PropTypes.func,
    visibilityFn: PropTypes.func,
    displayOptions: PropTypes.shape({
      displayMode: PropTypes.string,
    }),
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    toolbarDecorationFn: PropTypes.func,
  };

  static defaultProps = {
    displayOptions: {
      displayMode: DISPLAY_MODE.NORMAL,
    },
    offset: { x: 0, y: 0 },
    toolbarDecorationFn: () => null,
  };

  constructor(props) {
    super(props);
    const { offset, displayOptions } = props;
    let position;

    if (displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
      position = { '--offset-top': `${offset.y}px`, '--offset-left': `${offset.x}px` };
    }
    this.state = {
      position,
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: false,
      showLeftArrow: false,
    };

    this.ToolbarDecoration = props.toolbarDecorationFn();
  }

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
  }

  onOverrideContent = overrideContent => {
    this.setState({ overrideContent });
  };

  onExtendContent = extendContent => this.setState({ extendContent });

  setKeepOpen = keepOpen => this.setState({ keepOpen });

  onClickOutside = () => {
    if (this.state.overrideContent || this.state.extendContent) {
      this.setState({ overrideContent: null, extendContent: null });
    }
  };

  getRelativePosition() {
    const relativeParent = getRelativeParent(this.toolbar.parentElement);
    const halfToolbarWidth = this.toolbar.clientWidth / 2;
    const toolbarHeight = this.toolbar.clientHeight;
    const toolbarParentRect = (relativeParent || document.body).getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect) {
      return { top: 0, left: 0 };
    }

    let top;
    if (!this.props.isMobile) {
      top = selectionRect.top - toolbarParentRect.top - toolbarHeight - TOOLBAR_OFFSET;
    } else {
      top = selectionRect.bottom - toolbarParentRect.top + TOOLBAR_OFFSET;
    }

    let left =
      selectionRect.left - toolbarParentRect.left + selectionRect.width / 2 - halfToolbarWidth;
    // make sure we're not out of bounds, adjust position if we are
    if (selectionRect.left - toolbarParentRect.left < halfToolbarWidth) {
      left = 0;
    } else if (left + this.toolbar.clientWidth > toolbarParentRect.width) {
      left = toolbarParentRect.width - this.toolbar.clientWidth;
    }

    top += this.props.offset.y;
    left += this.props.offset.x;

    return { top, left };
  }

  onSelectionChanged = debounce(() => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    this.setState({ isVisible: this.shouldBeVisible() });
    if (!this.toolbar || this.state.overrideContent || this.state.extendContent) {
      return;
    }

    const { displayOptions } = this.props;

    if (displayOptions.displayMode === DISPLAY_MODE.NORMAL && !this.state.keepOpen) {
      const { top, left } = this.getRelativePosition();
      this.setState({ position: { '--offset-top': `${top}px`, '--offset-left': `${left}px` } });
    }
  }, 40);

  getTabIndexByVisibility = () => (this.isVisible() ? 0 : -1);

  shouldBeVisible = () => {
    const { pubsub, visibilityFn } = this.props;
    const { overrideContent, extendContent, keepOpen } = this.state;

    let isVisible = false;
    if (visibilityFn) {
      const editorState = pubsub.get('getEditorState')();
      isVisible = visibilityFn(editorState);
    }

    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly
    return isVisible || overrideContent || extendContent || keepOpen;
  };

  isVisible = () => this.state.isVisible;

  getStyle() {
    const { displayOptions } = this.props;
    const { position } = this.state;
    const style = { ...position };
    const defaultDispayStyles = {
      visibility: this.isVisible() ? 'visible' : 'hidden',
      transform: this.isVisible() ? 'scale(1)' : 'scale(0)',
    };

    Object.assign(style, defaultDispayStyles, displayOptionStyles[displayOptions.displayMode]);

    return style;
  }

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection
      ? 0
      : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    if (this.props.isMobile) {
      return;
    }

    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth,
    });
  };

  renderToolbarContent() {
    const {
      theme,
      pubsub,
      structure,
      defaultTextAlignment,
      helpers,
      isMobile,
      anchorTarget,
      relValue,
      t,
    } = this.props;
    const {
      showLeftArrow,
      showRightArrow,
      overrideContent: OverrideContent,
      extendContent: ExtendContent,
    } = this.state;

    const tabIndex = this.isVisible() ? 0 : -1;
    const toolbarStyle = this.getStyle();
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};

    const buttonClassNames = classNames(
      Styles.inlineToolbar_buttons,
      toolbarStyles && toolbarStyles.inlineToolbar_buttons,
      {
        [Styles.inlineToolbar_overrideContent]: !!OverrideContent,
        [toolbarStyles.inlineToolbar_overrideContent]: !!OverrideContent,
      }
    );
    const extendClassNames = classNames(
      Styles.inlineToolbar_extend,
      toolbarStyles && toolbarStyles.inlineToolbar_extend
    );

    const scrollableClassNames = classNames(
      Styles.inlineToolbar_scrollableContainer,
      toolbarStyles && toolbarStyles.inlineToolbar_scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    const arrowClassNames = classNames(
      Styles.inlineToolbar_responsiveArrow,
      toolbarStyles.inlineToolbar_responsiveArrow
    );
    const leftArrowIconClassNames = classNames(
      Styles.inlineToolbar_responsiveArrowLeft_icon,
      toolbarStyles.responsiveArrowLeft_icon
    );
    const rightArrowIconClassNames = classNames(
      Styles.inlineToolbar_responsiveArrowRight_icon,
      toolbarStyles.responsiveArrowRight_icon
    );

    const childrenProps = {
      theme,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
      setKeepOpen: this.setKeepOpen,
      defaultTextAlignment,
      isVisible: toolbarStyle.visibility === 'visible',
      isMobile,
      helpers,
      anchorTarget,
      relValue,
      t,
      tabIndex,
    };

    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div className={buttonClassNames}>
          <Measure
            client
            scroll
            innerRef={ref => (this.scrollContainer = ref)}
            onResize={({ scroll, client }) =>
              this.setToolbarScrollButton(scroll.left, scroll.width, client.width)
            }
          >
            {({ measure, measureRef }) => (
              <div className={scrollableClassNames} ref={measureRef} onScroll={() => measure()}>
                {OverrideContent ? (
                  <OverrideContent {...childrenProps} />
                ) : (
                  structure.map((Button, index) => <Button key={index} {...childrenProps} />)
                )}
              </div>
            )}
          </Measure>
          {hasArrow && (
            <button
              tabIndex={tabIndex}
              className={arrowClassNames}
              data-hook="inlineToolbarRightArrow"
              onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
            >
              <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
            </button>
          )}
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </ClickOutside>
    );
  }

  render() {
    if (!this.isVisible()) {
      return null;
    }
    const { theme } = this.props;
    const { toolbarStyles } = theme || {};

    const props = {
      className: classNames(Styles.inlineToolbar, toolbarStyles && toolbarStyles.inlineToolbar),
      style: this.getStyle(),
      tabIndex: this.isVisible() ? 0 : -1,
      role: 'toolbar',
      'aria-orientation': 'horizontal',
      'data-hook': 'inlineToolbar',
    };

    if (this.ToolbarDecoration) {
      const { ToolbarDecoration } = this;
      return (
        <ToolbarDecoration refCallback={this.handleToolbarRef} {...props}>
          {this.renderToolbarContent()}
        </ToolbarDecoration>
      );
    }

    return (
      <div ref={this.handleToolbarRef} {...props}>
        {this.renderToolbarContent()}
      </div>
    );
  }
}
