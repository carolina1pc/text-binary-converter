import React from 'react';

const CopyIcon = ({ size = 20, title = 'Copy' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : 'presentation'}
  >
    {title ? <title>{title}</title> : null}
    <rect x="9" y="3" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="5" y="7" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M13 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M13 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default CopyIcon;