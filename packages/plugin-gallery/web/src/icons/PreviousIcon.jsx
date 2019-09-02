/* eslint-disable max-len */
import React from 'react';

const PrevIcon = props => (
  <svg width="25" height="25" viewBox="0 0 25 25" {...props}>
    <defs>
      <path
        id="prev-path"
        d="M11.496 9.7l-5.43 5.176a.208.208 0 0 0 0 .304l.48.457a.234.234 0 0 0 .319 0l6.069-5.785a.21.21 0 0 0 0-.304l-6.07-5.785a.234.234 0 0 0-.319 0l-.479.457a.208.208 0 0 0 0 .304l5.43 5.176z"
      />
    </defs>
    <g fillRule="evenodd" transform="rotate(-180 12.5 12.5)">
      <circle cx="12.5" cy="12.5" r="12.5" opacity=".75" />
      <g transform="rotate(-90 12.5 9.5)">
        <mask id="prev-mask" fill="#fff">
          <use xlinkHref="#prev-path" />
        </mask>
        <use fill="#fff" fillRule="nonzero" transform="rotate(90 9.5 9.7)" xlinkHref="#prev-path" />
        <g fill="#FFF" mask="url(#prev-mask)" />
      </g>
    </g>
  </svg>
);

export default PrevIcon;
/* eslint-enable max-len */
