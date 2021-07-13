/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './ToolbarContainer.scss';

interface StaticToolbarContainerProps {
  children: ReactElement;
  isMobile?: boolean;
}

class StaticToolbarContainer extends Component<StaticToolbarContainerProps> {
  toolbarContainerRef?: HTMLDivElement | null;

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

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
      >
        {children}
      </div>
    );
  }
}

export default StaticToolbarContainer;
