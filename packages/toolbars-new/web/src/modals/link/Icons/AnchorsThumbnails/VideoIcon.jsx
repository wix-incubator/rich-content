/* eslint-disable max-len */
import React from 'react';

const VideoIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 19 19"
    width="19"
    height="19"
    {...props}
  >
    <defs>
      <path
        id="video-icon-path"
        d="M14 7l2.842-1.421A.8.8 0 0 1 18 6.294v6.412a.8.8 0 0 1-1.158.715L14 12v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v2zm0 3.9l2.708 1.354a.2.2 0 0 0 .29-.179V6.922a.2.2 0 0 0-.29-.178L14 8.098V10.9zM2 5v9h11V5H2z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="video-icon-mask">
        <use xlinkHref="#video-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#video-icon-path" />
    </g>
  </svg>
);

export default VideoIcon;
