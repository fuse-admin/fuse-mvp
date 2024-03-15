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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative bg-white shadow-xl p-4 rounded w-3/5 h-3/5 overflow-auto">
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
