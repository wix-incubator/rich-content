import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  validate,
  ViewportRenderer,
  pluginGiphySchema,
} from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import styles from '../statics/styles/giphy-viewer.scss';
import { DEFAULT_RESOLUTION } from './constants';

class GiphyViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginGiphySchema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginGiphySchema);
    }
  }

  getSourceUrl = () => {
    const { componentData } = this.props;
    let { sizes } = this.props.settings || {};
    sizes = { ...DEFAULT_RESOLUTION, ...sizes };
    const size = this.props.isMobile ? sizes.mobile : sizes.desktop;
    switch (size) {
      case 'original':
        return componentData.gif.originalMp4 || componentData.gif.originalUrl;
      case 'downsizedSmall':
        return componentData.gif.downsizedSmallMp4 || componentData.gif.originalUrl;
      default:
        return componentData.gif.originalUrl;
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const gifUrl = this.getSourceUrl();
    const { componentData } = this.props;
    /* eslint-disable jsx-a11y/no-redundant-roles */
    return (
      <ViewportRenderer theme={this.props.theme}>
        {gifUrl.endsWith('.mp4') ? (
          <video
            // video should be treated as an noninteractive git element
            // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
            role="img"
            autoPlay
            muted
            loop
            playsInline // required for autoplay in iOS
            aria-label="gif"
            className={this.styles.giphy_player}
            src={this.getSourceUrl()}
          />
        ) : (
          <img
            role="img"
            aria-label="gif"
            className={this.styles.giphy_player}
            src={componentData.gif.originalUrl}
            alt="gif"
          />
        )}
      </ViewportRenderer>
    );
    /* eslint-enable jsx-a11y/no-redundant-roles */
  }
}

GiphyViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

GiphyViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default GiphyViewer;
