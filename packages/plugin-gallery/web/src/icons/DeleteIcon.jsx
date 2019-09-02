/* eslint-disable max-len */
import React from 'react';

const DeleteIcon = props => (
  <svg width="19" height="19" viewBox="0 0 19 19" {...props}>
    <defs>
      <path
        id="delete-icon-path"
        d="M13 4h2.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H15v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2H6V3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1zm-.857 0V3H6.857v1h5.286zM14 5H5v10.8c0 .11.09.2.2.2h8.6a.2.2 0 0 0 .2-.2V5zM7.2 7h.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2zm4 0h.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="delete-icon-mask" fill="#fff">
        <use xlinkHref="#delete-icon-path" />
      </mask>
      <use xlinkHref="#delete-icon-path" />
      <g mask="url(#delete-icon-mask)">
        <path d="M1 1h17v17H1z" />
      </g>
    </g>
  </svg>
);

export default DeleteIcon;
/* eslint-enable max-len */
