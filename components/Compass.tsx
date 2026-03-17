import React from 'react';

export const Compass: React.FC = () => {
  return (
    <div className="compass-container">
      {/* Outer Ring SVG */}
      <svg className="ring outer-ring" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r="248" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="10 10" />
        <circle cx="250" cy="250" r="230" stroke="#E5E7EB" strokeWidth="1" />
        <path d="M250 0V20 M250 480V500 M0 250H20 M480 250H500" stroke="#9CA3AF" strokeWidth="2" />
      </svg>
      
      {/* Inner Circle SVG */}
      <svg className="ring inner-circle" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="125" cy="125" r="120" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M125 20L135 40H115L125 20Z" fill="#37352F" />
      </svg>
      
      <div className="center-hole"></div>
    </div>
  );
};
