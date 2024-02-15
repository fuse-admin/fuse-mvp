import React from 'react';
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  data: Record<string, string | null>;
  onClose: () => void;
  onSubmit: (data: Record<string, string | null>) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ data, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4 overflow-auto">
        <h2 className="text-xl font-extrabold text-yellow-500 text-center">Confirm Your Selections</h2>
        <div className="space-y-2">
          {Object.entries(data).map(([key, value], index) => (
            <p key={index} className="text-gray-700">
              <span>{key}:</span> {value || "No value selected"}
            </p>
          ))}
        </div>
        <div className='flex flex-row justify-between'>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="px-4 py-2 h-8 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
          >
            Close
          </Button>
        </div>
        <div className="flex justify-start">
          <Button
            onClick={() => onSubmit(data)}
            className="px-4 py-2 h-8 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
          >
            Submit Training
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
