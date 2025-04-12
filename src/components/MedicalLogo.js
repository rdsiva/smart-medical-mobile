import React from 'react';

const MedicalLogo = ({ className }) => {
  return (
    <svg 
      className={className} 
      width="120" 
      height="120" 
      viewBox="0 0 120 120" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="60" fill="#2196F3" />
      <path 
        d="M40 60H80M60 40V80" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      <path 
        d="M60 30C43.4315 30 30 43.4315 30 60C30 76.5685 43.4315 90 60 90C76.5685 90 90 76.5685 90 60C90 43.4315 76.5685 30 60 30Z" 
        stroke="white" 
        strokeWidth="4" 
        fill="none" 
      />
    </svg>
  );
};

export default MedicalLogo;