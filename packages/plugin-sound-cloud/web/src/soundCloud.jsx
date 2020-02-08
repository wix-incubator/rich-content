import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import SoundCloudViewer from './soundCloud-viewer';
import styles from '../statics/styles/default-sound-cloud-styles.scss';
import { SOUND_CLOUD_TYPE } from './types';

const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
});

const MAX_WAIT_TIME = 5000;

class SoundCloud extends Component {
  static type = {
    SOUND_CLOUD_TYPE,
  };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps;
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable,
    };
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
    return (
      !this.state.isPlayable &&
      this.player &&
      findDOMNode(this.player).querySelector('iframe') &&
      (findDOMNode(this.player).querySelector('iframe').tabIndex = -1)
    );
  }
  /* eslint-enable react/no-find-dom-node */

  handlePlay = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isLoading: true });
    setTimeout(() => this.handleReady(), MAX_WAIT_TIME);
  };

  handleSoundCloudStart = player => {
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
      <div className={classNames(styles.soundCloud_overlay)}>
        {isLoaded && <span className={styles.soundCloud_overlay_message}>{overlayText}</span>}
      </div>
    );
  };

  renderPlayer = () => {
    const { componentData, theme, disabled } = this.props;
    return (
      <SoundCloudViewer
        ref={this.setPlayer}
        componentData={componentData}
        onReady={this.handleReady}
        onStart={this.handleStart}
        theme={theme}
        disabled={disabled}
      />
    );
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { className, onClick } = this.props;
    const { isPlayable } = this.state;
    const containerClassNames = classNames(this.styles.soundCloud_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="soundCloudPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={e => this.onKeyDown(e, onClick)}
        draggable
      >
        {!isPlayable && this.renderOverlay(this.styles, this.props.t)}
        {this.renderPlayer()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

SoundCloud.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export { SoundCloud as Component, DEFAULTS };
