import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isValidUrl } from 'wix-rich-content-common';
import { UrlInputModal } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';

export default class EmbedURLInputModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData?.config?.link?.url || '',
      submittedInvalidUrl: false,
    };
  }

  onConfirm = () => {
    const { url } = this.state;
    if (url) {
      const { componentData, pubsub, onConfirm, helpers } = this.props;
      const { fetchData } = componentData;
      fetchData(url).then(({ html }) => {
        if (!isValidUrl(url)) {
          this.setState({ submittedInvalidUrl: true });
        } else {
          if (onConfirm) {
            const { size, alignment } = { ...DEFAULTS };

            onConfirm({
              ...componentData,
              html,
              config: {
                size,
                alignment,
                width: 350,
                link: { ...DEFAULTS.link, url },
              },
            });
          } else {
            pubsub.update('componentData', { url, html });
          }
          helpers.closeModal();
        }
      });
    }
  };

  render() {
    const { url, submittedInvalidUrl } = this.state;
    const {
      t,
      languageDir,
      componentData: { socialType },
      helpers,
    } = this.props;

    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        input={url}
        t={t}
        languageDir={languageDir}
        title={t(`EmbedURL_Social_${socialType}_Title`)}
        submittedInvalidUrl={submittedInvalidUrl}
        dataHook={'socialEmbedUploadModal'}
        saveLabel={t('EmbedURL_Common_CTA_Primary')}
        cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
        onInputChange={url => this.setState({ url })}
        errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
        placeholder={t(`EmbedURL_Social_${socialType}_Placeholder`)}
        onCloseRequested={helpers.closeModal}
      />
    );
  }
}

EmbedURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
};
