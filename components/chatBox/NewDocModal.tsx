import React, { useState } from 'react';
import SubDocSuccess from '../shared/SubDocSuccess';
import SubDocUploader from './SubDocUploader';

// Import your step components here
const Step2Content = () => <div>Content for Step 2...</div>;
const Step3Content = () => <div>Content for Step 3...</div>;

interface NewDocModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewDocModal: React.FC<NewDocModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <SubDocUploader />;
            case 2:
                return <Step2Content />;
            case 3:
                return <Step3Content />;
            case 4:
                return <SubDocSuccess />;
            default:
                return <div><SubDocUploader /></div>; // You can modify this message as needed
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center h-screen overflow-hidden">
            <div className="relative bg-white rounded-xl shadow-2xl w-3/4 h-5/6 p-4 flex flex-col">
                
                {/* Close button at the top right */}
                <div className="self-end">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mb-4"
                    >
                        Close
                    </button>
                </div>
                
                {/* Step content */}
                <div className="flex-1">
                    {renderStepContent()}
                </div>
                
                {/* Navigation buttons at the bottom */}
                <div className="flex justify-between pt-4 border-t">
                    {currentStep > 1 && (
                        <button 
                            onClick={goToPreviousStep} 
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        >
                            Back
                        </button>
                    )}
                    <div> {/* Empty div for centering the Next button with flex */}
                    </div>
                    {currentStep < totalSteps ? (
                        <button 
                            onClick={goToNextStep} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            disabled
                            className="px-4 py-2 bg-blue-300 text-white rounded cursor-not-allowed"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
