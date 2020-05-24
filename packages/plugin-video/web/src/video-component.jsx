import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import { Loader, ErrorMsgWithIcon } from 'wix-rich-content-editor-common';
import { get } from 'lodash';
import VideoViewer from './video-viewer';
import styles from '../statics/styles/default-video-styles.scss';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';

const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
});

class VideoComponent extends React.Component {
  static type = { VIDEO_TYPE_LEGACY, VIDEO_TYPE };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps;
    this.state = {
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

  static getDerivedStateFromProps(props) {
    const {
      componentState: { error },
    } = props;
    if (error) {
      const errorMsg = error?.msg;
      return { errorMsg };
    } else if (error === false) {
      return { errorMsg: undefined };
    }
    return {};
  }

  handlePlayerFocus() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this).querySelector('iframe, video');
    if (element) {
      element.tabIndex = -1;
    }
  }

  handleReady = () => {
    if (!this.state.isLoaded && !this.props.componentData.tempData) {
      this.setState({ isLoaded: true });
    }
  };

  renderOverlay = (styles, t) => {
    const { isLoaded } = this.state;
    const overlayText = t('VideoComponent_Overlay');
    return (
      <div className={classNames(styles.video_overlay)}>
        {isLoaded && <span className={styles.video_overlay_message}>{overlayText}</span>}
      </div>
    );
  };

  renderLoader = () => {
    const isCustomVideo = get(this.props, 'componentData.isCustomVideo');
    return (
      <div className={this.styles.videoOverlay}>
        <Loader type={'medium'} isVerySlowFakeLoader={isCustomVideo} />
      </div>
    );
  };

  onReload = () => {
    this.setState({ isLoaded: false });
  };

  renderPlayer = () => {
    const {
      theme,
      componentData,
      disabled,
      disableRightClick,
      settings,
      setComponentUrl,
    } = this.props;
    return (
      <VideoViewer
        ref={this.setPlayer}
        componentData={componentData}
        settings={settings}
        onReady={this.handleReady}
        disabled={disabled}
        disableRightClick={disableRightClick}
        theme={theme}
        setComponentUrl={setComponentUrl}
        onReload={this.onReload}
        isLoaded={this.state.isLoaded}
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
    const { isPlayable, isLoaded, errorMsg } = this.state;
    const containerClassNames = classNames(this.styles.video_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="videoPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={e => this.onKeyDown(e, onClick)}
        draggable
      >
        {!isPlayable && this.renderOverlay(this.styles, this.props.t)}
        {this.renderPlayer()}
        {!isLoaded && !errorMsg && this.renderLoader()}
        {errorMsg && <ErrorMsgWithIcon errorMsg={errorMsg} />}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disableRightClick: PropTypes.bool,
  disabled: PropTypes.bool,
  setComponentUrl: PropTypes.func,
};

export { VideoComponent as Component, DEFAULTS };
