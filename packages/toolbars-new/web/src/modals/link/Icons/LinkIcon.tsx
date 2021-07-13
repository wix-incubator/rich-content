/* eslint-disable max-len */
import React from 'react';

const LinkIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 19 19"
    width={19}
    height={19}
    {...props}
  >
    <defs>
      <path
        id="link-icon-path"
        d="M8 9h2V6.2c0-.11.09-.2.2-.2h3.3a3.5 3.5 0 0 1 0 7h-3.3a.2.2 0 0 1-.2-.2V10H8v2.8a.2.2 0 0 1-.2.2H4.5a3.5 3.5 0 0 1 0-7h3.3c.11 0 .2.09.2.2V9zm0 0V7.007H4.5a2.5 2.5 0 1 0 0 5H8V10H6.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2H8zm2 1v1.993h3.5a2.5 2.5 0 1 0 0-5H10V9h1.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H10z"
      />
    </defs>
    <use fillRule="evenodd" transform="rotate(-45 9 9.5)" xlinkHref="#link-icon-path" />
  </svg>
);

export default LinkIcon;
