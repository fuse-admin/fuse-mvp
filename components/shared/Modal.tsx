// Modal.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { on } from 'events';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="relative bg-white bg-opacity-30 shadow-2xl p-4 rounded-xl w-3/5 h-3/5 overflow-auto border border-gray-200"
           style={{
             backdropFilter: 'blur(80px)',
             WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
             backgroundColor: 'rgba(255, 255, 255, 0.5)' // Adjust white background opacity for glass effect
           }}>
        {children}
        <Button
            onClick={onClose}
            className="absolute top-0 right-0 mt-2 mr-2 px-4 py-2 h-8 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
          >
            Close
        </Button>
      </div>
    </div>
  );
};


export default Modal;
