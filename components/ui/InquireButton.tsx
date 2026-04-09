"use client";
import { useState } from 'react';
import InquiryModal from './InquiryModal';

interface InquireButtonProps {
  project: {
    _id: string;
    title: string;
  };
}

export default function InquireButton({ project }: InquireButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-primary" 
        style={{ 
          width: '100%',
          padding: '1.25rem', 
          justifyContent: 'center',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Get A Custom Quote
      </button>

      <InquiryModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        project={project} 
      />
    </>
  );
}
