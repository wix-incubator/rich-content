/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import styles from './ToolbarContainer.scss';

interface StaticToolbarContainerProps {
  children: ReactElement;
  isMobile?: boolean;
  removeToolbarFocus: () => void;
}

class StaticToolbarContainer extends Component<StaticToolbarContainerProps> {
  toolbarContainerRef?: HTMLDivElement | null;

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
      this.props.removeToolbarFocus?.();
    }
  };

  render() {
    const { children, isMobile } = this.props;
    return (
      <div
        tabIndex={0}
        ref={this.setToolbarContainerRef}
        className={classNames(
          styles.container,
          styles.staticContainer,
          isMobile && styles.staticContainerMobile
        )}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </div>
    );
  }
}

export default StaticToolbarContainer;
