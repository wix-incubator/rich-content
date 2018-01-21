import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VideoUploadModal } from '../wix-draft-plugin-video/videoUploadModal';

export class VideoReplaceButton extends Component {
  constructor() {
    super();

    this.state = {
      isVideoUploadModalOpen: false,
      isValidUrl: true,
    };
  }

  handleVideoReplace = url => {
    this.closeVideoUploadModal();
    this.props.pubsub.update('componentData', { src: url });
  };

  openVideoUploadModal = () => {
    this.setState({ isVideoUploadModalOpen: true });
  };

  closeVideoUploadModal = () => {
    this.setState({ isVideoUploadModalOpen: false });
  };

  render() {
    const { icon, className } = this.props;
    return (
      <div className={className}>
        <button type="button" onClick={this.openVideoUploadModal}>
          {icon}
        </button>
        <VideoUploadModal isOpen={this.state.isVideoUploadModalOpen} onConfirm={this.handleVideoReplace} onCancel={this.closeVideoUploadModal} />
      </div>
    );
  }
}

VideoReplaceButton.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  pubsub: PropTypes.object.isRequired,
};
