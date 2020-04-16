import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import UrlInputModal from 'wix-rich-content-editor-common/dist/lib/UrlInputModal.cjs.js';

export default class SoundCloudURLInputModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      submittedInvalidUrl: false,
    };
  }

  onConfirm = () => {
    const { url } = this.state;
    if (url && ReactPlayer.canPlay(url)) {
      const { componentData, helpers, pubsub, onConfirm } = this.props;
      if (onConfirm) {
        onConfirm({ ...componentData, src: url });
      } else {
        pubsub.update('componentData', { src: url });
      }

      if (helpers && helpers.onVideoSelected) {
        helpers.onVideoSelected(url, data =>
          pubsub.update('componentData', { metadata: { ...data } })
        );
      }

      helpers.closeModal();
    } else {
      this.setState({ submittedInvalidUrl: true });
    }
  };

  render() {
    const { url, submittedInvalidUrl } = this.state;
    const { doneLabel, cancelLabel, t, isMobile, languageDir, helpers } = this.props;

    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        url={url}
        t={t}
        languageDir={languageDir}
        title={
          !isMobile ? t('SoundCloudUploadModal_Header') : t('SoundCloudUploadModal_Header_Mobile')
        }
        submittedInvalidUrl={submittedInvalidUrl}
        dataHook={'soundCloudUploadModal'}
        saveLabel={doneLabel}
        cancelLabel={cancelLabel}
        setUrl={url => this.setState({ url })}
        errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
        placeholder={t('SoundCloudUploadModal_Input_Placeholder')}
        onCloseRequested={helpers.closeModal}
      />
    );
  }
}

SoundCloudURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};

SoundCloudURLInputModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
