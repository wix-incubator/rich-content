/* eslint-disable max-len */
import React from 'react';

const BlockQuoteIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="block-quote-icon-path"
        d="M11.2 4h4.6c.11 0 .2.09.2.2v4.533c0 .852-.095 1.655-.284 2.408a6.033 6.033 0 0 1-.875 1.983 4.501 4.501 0 0 1-1.488 1.364c-.598.341-1.32.512-2.165.512v-2.132c.495 0 .904-.12 1.224-.362.321-.242.584-.562.788-.96.204-.397.343-.845.416-1.343.073-.497.109-.83.109-1.314H11.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2zm-8 0h4.6c.11 0 .2.09.2.2v4.533c0 .852-.095 1.655-.284 2.408a6.033 6.033 0 0 1-.875 1.983 4.501 4.501 0 0 1-1.488 1.364c-.598.341-1.32.512-2.165.512v-2.132c.495 0 .904-.12 1.224-.362.321-.242.584-.562.788-.96.204-.397.343-.845.416-1.343.073-.497.109-.83.109-1.314H3.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="block-quote-icon-mask">
        <use xlinkHref="#block-quote-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#block-quote-icon-path" />
    </g>
  </svg>
);

export default BlockQuoteIcon;
