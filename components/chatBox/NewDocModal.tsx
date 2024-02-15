import React, { useState } from 'react';
import SubDocUploader from './SubDocUploader';
import SubDocTrainer from './SubDocTrainer';
import { useAuth } from '@clerk/nextjs';

// Import your step components here
const Step3Content = () => <div>Content for Step 3...</div>;

interface NewDocModalProps {
    isOpen: boolean;
    onClose: () => void;
}



export const NewDocModal: React.FC<NewDocModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const [fileUrl, setFileUrl] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const { orgId } = useAuth();

    const handleFileUploadComplete = (url: string, name: string) => {
        setFileUrl(url);
        setFileName(name);
        goToNextStep();
    }

    const handleTrainingSubmission = async (selectedData: Record<string, string | null>) => {
        const payload = {
            ...selectedData,
            fileUrl: fileUrl,
            orgId: orgId,
        };

        try {
            const response = await fetch('/api/submitTrainingData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Failed to submit the data');
            console.log('Data submitted successfully');
        } catch (error) {
            console.error('Failed to submit the data', error);
        }
    };


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
                return <SubDocUploader onFileUploadComplete={handleFileUploadComplete} />;
            case 2:
                return <SubDocTrainer fileUrl={fileUrl} onSubmit={handleTrainingSubmission}/>;
            case 3:
                return <Step3Content />;
            default:
                return <div><SubDocUploader onFileUploadComplete={handleFileUploadComplete} /></div>; // You can modify this message as needed
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center h-screen overflow-hidden">
            <div className="relative bg-white rounded-xl shadow-2xl w-3/4 max-h-[80vh] overflow-y-auto p-4 flex flex-col">
                
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
                <div className="flex justify-between pt-4 border-t border-yellow-500">
                    {currentStep > 1 && (
                        <button 
                            onClick={goToPreviousStep} 
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        >
                            Prev
                        </button>
                    )}
                    <div> {/* Empty div for centering the Next button with flex */}
                    </div>
                    {currentStep < totalSteps ? (
                        <button 
                            onClick={goToNextStep} 
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
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
