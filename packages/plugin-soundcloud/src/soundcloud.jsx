import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import SoundCloudViewer from './soundcloud-v';
import styles from '../statics/styles/default-soundcloud-styles.scss';
import { SOUNDCLOUD_TYPE_LEGACY, SOUNDCLOUD_TYPE } from './types';

const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};

const MAX_WAIT_TIME = 5000;

class Soundcloud extends Component {

  static type = {
    SOUNDCLOUD_TYPE_LEGACY,
    SOUNDCLOUD_TYPE
  };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps || props.blockProps.readOnly === true;
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable,
    };
    this.styles = mergeStyles({ styles, theme: this.props.theme });
  }

  setPlayer = player => {
    this.player = player;
  };

  componentDidMount() {
    this.handlePlayerFocus();
  }

  componentDidUpdate() {
    this.handlePlayerFocus();
  }

  /* eslint-disable react/no-find-dom-node */
  // TODO: get rid of this ASAP!
  // Currently, there's no other means to access the player inner iframe
  handlePlayerFocus() {
    return !this.state.isPlayable && this.player && findDOMNode(this.player).querySelector('iframe') &&
      (findDOMNode(this.player).querySelector('iframe').tabIndex = -1);
  }
  /* eslint-enable react/no-find-dom-node */

  handlePlay = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isLoading: true });
    setTimeout(() => this.handleReady(), MAX_WAIT_TIME);
  };

  handlesoundcloudStart = player => {
    if (this.player !== player) {
      this.setState({
        isLoading: false,
        isLoaded: false,
      });
    }
  };

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderOverlay = (styles, t) => {
    const { isLoaded } = this.state;
    const overlayText = t('SoundCloudComponent_Overlay');
    return (
      <div className={classNames(styles.soundcloud_overlay)}>
        {isLoaded && <span className={styles.soundcloud_overlay_message}>{overlayText}</span>}
      </div>);
  };

  renderPlayer = () => {
    const { componentData } = this.props;
    return (
      <SoundCloudViewer
        ref={this.setPlayer}
        componentData={componentData}
        onReady={this.handleReady}
        onStart={this.handleStart}
      />
    );
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    const { styles } = this;
    const { className, onClick, t } = this.props;
    const { isPlayable } = this.state;
    const containerClassNames = classNames(styles.soundcloud_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div data-hook="soundcloudPlayer" onClick={onClick} className={containerClassNames} onKeyDown={e => this.onKeyDown(e, onClick)}>
        {!isPlayable && this.renderOverlay(styles, t)}
        {this.renderPlayer()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

Soundcloud.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export { Soundcloud as Component, DEFAULTS };
