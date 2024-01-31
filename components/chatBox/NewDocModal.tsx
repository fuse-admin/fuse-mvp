import React from 'react';

interface NewDocModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export const NewDocModal: React.FC<NewDocModalProps> = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center h-screen overflow-hidden">
            {/* Adding backdrop-filter for frosted glass effect */}
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm backdrop-brightness-150"></div>
            <div className="relative bg-white rounded-xl shadow-2xl w-3/4 h-5/6 p-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {/* Modal content goes here */}
                        {children}
                    </div>
                    <button 
                        onClick={onClose} 
                        className=" mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-4 self-start"
                        style={{marginTop: '0.5rem', marginRight: '1rem'}}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
