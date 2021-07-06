import React from 'react';
import PropTypes from 'prop-types';
import { ErrorIcon } from '../Icons';
import styles from '../../statics/styles/media-item-error-msg.scss';
import classnames from 'classnames';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { MediaUploadErrorKey } from 'wix-rich-content-common';

const errorMessages = {
  [MediaUploadErrorKey.GENERIC]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.SIZE_LIMIT]: 'UploadFile_Error_Size_Item',
};

export default function MediaItemErrorMsg(props) {
  const { error, t, isTooltip } = props;
  const errorMsg = t(errorMessages[error.key]) || error.msg || t('UploadFile_Error_Generic_Item');
  const errorIconStyles = classnames(styles.errorIcon, !isTooltip && styles.errorIconWithMessage);
  return (
    <div className={styles.error}>
      {isTooltip ? (
        <Tooltip content={errorMsg} isError>
          <ErrorIcon className={errorIconStyles} />
        </Tooltip>
      ) : (
        <>
          <ErrorIcon className={errorIconStyles} />
          <div className={styles.errorMsg}>{errorMsg}</div>
        </>
      )}
    </div>
  );
}

MediaItemErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  isTooltip: PropTypes.bool,
};
