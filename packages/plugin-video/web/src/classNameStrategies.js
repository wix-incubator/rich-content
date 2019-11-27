import styles from '../statics/styles/video-viewer.scss';
import { mergeStyles } from 'wix-rich-content-editor-common';

export const containerClassName = theme => {
  const mergedStyles = mergeStyles({ styles, theme });
  return mergedStyles.video_container;
};
