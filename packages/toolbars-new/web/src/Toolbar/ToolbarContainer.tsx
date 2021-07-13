/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component, ReactElement } from 'react';
import styles from './ToolbarContainer.scss';

interface ToolbarContainerProps {
  toolbarPosition: Record<string, any>;
  children: ReactElement;
}

interface State {
  toolbarPosition: Record<string, any> | undefined;
}

class ToolbarContainer extends Component<ToolbarContainerProps, State> {
  toolbarContainerRef?: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      toolbarPosition: {},
    };
  }

  componentDidMount() {
    this.setState({ toolbarPosition: this.getToolbarPosition() });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toolbarPosition !== this.props.toolbarPosition) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toolbarPosition: this.getToolbarPosition() });
    }
  }

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  focus = () => this.toolbarContainerRef?.focus();

  getToolbarPosition = () => {
    const { toolbarPosition } = this.props;
    const {
      x,
      y,
      offsetLeftInsideContainer,
      containerWidth = 0,
      extraTopOffset,
      extraLeftOffset = 0,
    } = toolbarPosition || {};
    if (this.toolbarContainerRef) {
      const top = y ? `${y - extraTopOffset}px` : null;
      const toolbarWidth = this.toolbarContainerRef.offsetWidth;
      if (offsetLeftInsideContainer + toolbarWidth < containerWidth) {
        return { top, left: x - extraLeftOffset };
      } else {
        return { top, right: 0 };
      }
    }
  };

  render() {
    const { children } = this.props;
    const { toolbarPosition } = this.state;
    return (
      <div
        tabIndex={0}
        ref={this.setToolbarContainerRef}
        className={styles.container}
        style={{
          ...toolbarPosition,
        }}
      >
        {children}
      </div>
    );
  }
}

export default ToolbarContainer;
