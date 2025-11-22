import React from 'react';

export default function SwitchIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d="M4 7H17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <polyline points="13,4 17,7 13,10" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 17H7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <polyline points="11,14 7,17 11,20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}