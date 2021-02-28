import React, { useState } from 'react';
import { VideoSettingsProps } from '../types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/video-settings.scss';
import {
  SettingsSection,
  LabeledToggle,
  SettingsPanelFooter,
  SettingsMobileHeader,
} from 'wix-rich-content-plugin-commons';

const VideoSettings: React.FC<VideoSettingsProps> = ({
  componentData,
  helpers,
  pubsub,
  theme,
  t,
  isMobile,
  settings,
}) => {
  const disableDownload = settings.disableDownload || componentData?.config?.disableDownload;
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(!disableDownload);
  const styles = mergeStyles({ styles: Styles, theme });

  const onToggle = () => setIsDownloadEnabled(!isDownloadEnabled);
  const closeModal = () => helpers.closeModal?.();
  const onDoneClick = () => {
    const newComponentData = { ...componentData, config: { disableDownload: !isDownloadEnabled } };
    pubsub.update('componentData', newComponentData);
    closeModal();
  };

  const mobileSettingsProps = {
    t,
    theme,
    dataHookPrefix: 'VideoSettingsMobileHeader',
    cancelLabel: t('SettingsPanelFooter_Cancel'),
    saveLabel: t('SettingsPanelFooter_Save'),
    isMediaSettingsModal: true,
    cancel: closeModal,
    save: onDoneClick,
  };
  return (
    <div
      data-hook="settings"
      className={classNames(styles.videoSettings, {
        [styles.videoSettings_mobile]: isMobile,
      })}
    >
      {isMobile ? (
        <SettingsMobileHeader {...mobileSettingsProps} />
      ) : (
        <>
          <div className={styles.videoSettingsTitle}>{t('VideoPlugin_Settings_Header')}</div>
          <div className={styles.separator} />
        </>
      )}
      <SettingsSection theme={theme} className={classNames(styles.videoSettings_toggleContainer)}>
        <LabeledToggle
          theme={theme}
          checked={isDownloadEnabled}
          label={t('VideoPlugin_Settings_VideoCanBeDownloaded_Label')}
          onChange={onToggle}
          tooltipText={t('VideoPlugin_Settings_VideoCanBeDownloaded_Tooltip')}
          dataHook="videoDownloadToggle"
        />
      </SettingsSection>
      {!isMobile && (
        <SettingsPanelFooter
          className={styles.videoSettings_footer}
          fixed
          theme={theme}
          cancel={closeModal}
          save={onDoneClick}
          t={t}
        />
      )}
    </div>
  );
};

export default VideoSettings;
