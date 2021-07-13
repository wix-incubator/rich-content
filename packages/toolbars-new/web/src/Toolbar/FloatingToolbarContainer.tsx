/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent, ReactElement } from 'react';
import styles from './ToolbarContainer.scss';
import { getVisibleSelectionRect, KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { debounce } from 'lodash';

const TOOLBAR_OFFSET = 5;

interface ToolbarContainerProps {
  children: ReactElement;
  isMobile?: boolean;
  showFormattingToolbar: boolean;
  removeToolbarFocus: () => void;
}

interface State {
  toolbarPosition: Record<string, any> | undefined;
  isVisible: boolean;
  keepOpen?: boolean;
}

class FloatingToolbarContainer extends PureComponent<ToolbarContainerProps, State> {
  toolbarContainerRef?: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.toolbarContainerRef = React.createRef();
    this.state = {
      toolbarPosition: {},
      isVisible: false,
    };
  }

  getRelativeParent = element => {
    if (!element) {
      return null;
    }
    // if (this.props.isInnerRCE) {
    //   return element.closest('[data-hook=root-editor]');
    // }
    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
      return element;
    }
    return this.getRelativeParent(element.parentElement);
  };

  getRelativePosition() {
    if (!this.toolbarContainerRef?.current) {
      return { top: 0, left: 0 };
    }
    const relativeParent = this.getRelativeParent(this.toolbarContainerRef.current.parentElement);
    const halfToolbarWidth = this.toolbarContainerRef.current.clientWidth / 2;
    const toolbarHeight = this.toolbarContainerRef.current.clientHeight;
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
      Math.round(selectionRect.left) -
      Math.round(toolbarParentRect.left) +
      Math.round(selectionRect.width / 2) -
      Math.round(halfToolbarWidth);
    // make sure we're not out of bounds, adjust position if we are
    if (selectionRect.left - toolbarParentRect.left < halfToolbarWidth) {
      left = 0;
    } else if (left + this.toolbarContainerRef.current.clientWidth > toolbarParentRect.width) {
      left = toolbarParentRect.width - this.toolbarContainerRef.current.clientWidth;
    }

    return { top, left };
  }

  componentDidMount() {
    const { top, left } = this.getRelativePosition();
    this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
  }

  componentDidUpdate = debounce(() => {
    const { top, left } = this.getRelativePosition();
    const { toolbarPosition, keepOpen } = this.state;
    const reactModalElement = document.querySelector('[data-id="rich-content-editor-modal"]');
    const pluginMenuElement = document.querySelector('[data-hook="addPluginMenu"]');
    const toolbarOnFocus = this.isToolbarOnFocus();
    if (
      !reactModalElement &&
      !pluginMenuElement &&
      (`${top}px` !== toolbarPosition?.top || `${left}px` !== toolbarPosition?.left) &&
      !keepOpen &&
      !toolbarOnFocus
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toolbarPosition: { top: `${top}px`, left: `${left}px` } });
    }
    const { showFormattingToolbar } = this.props;
    const { isVisible } = this.state;
    if (isVisible !== (showFormattingToolbar || this.state.keepOpen || toolbarOnFocus)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isVisible: showFormattingToolbar });
    }
  }, 40);

  isToolbarOnFocus = () => this.toolbarContainerRef?.current?.contains(document.activeElement);

  setKeepOpen = keepOpen => this.setState({ keepOpen });

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
      this.props.removeToolbarFocus?.();
    }
  };

  render() {
    const { children } = this.props;
    const { toolbarPosition, isVisible } = this.state;
    return (
      <div
        // ref={this.setToolbarContainerRef}
        ref={this.toolbarContainerRef}
        className={styles.container}
        style={{
          ...toolbarPosition,
          visibility: isVisible ? 'visible' : 'hidden',
          transform: isVisible ? 'scale(1)' : 'scale(0)',
        }}
        data-id="floating-toolbar"
        onKeyDown={this.onKeyDown}
      >
        {React.cloneElement(React.Children.only(children), { setKeepOpen: this.setKeepOpen })}
      </div>
    );
  }
}

export default FloatingToolbarContainer;
