import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
}

export const ClientModal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto">
            {/* Outer container to create the frosted glass effect */}
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm backdrop-brightness-150"></div>
            {/* Modal container with margins for spacing and max size control */}
            <div className="relative m-20 bg-white p-5 rounded-2xl shadow-2xl max-w-3xl max-h-[80vh] overflow-auto">
                {children}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Close</button>
            </div>
        </div>
    );
};

