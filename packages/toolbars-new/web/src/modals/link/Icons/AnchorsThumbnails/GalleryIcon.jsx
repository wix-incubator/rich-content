/* eslint-disable max-len */
import React from 'react';

const GalleryIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 19 19"
    width="19"
    height="19"
    {...props}
  >
    <defs>
      <path
        id="gallery-plugin-insert-path"
        d="M3 3h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 1v4h7V4H3zm10-1h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 1v4h3V4h-3zM3 10h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm0 1v4h3v-4H3zm6-1h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm0 1v4h7v-4H9z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="gallery-plugin-insert-mask">
        <use xlinkHref="#gallery-plugin-insert-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#gallery-plugin-insert-path" />
    </g>
  </svg>
);

export default GalleryIcon;
