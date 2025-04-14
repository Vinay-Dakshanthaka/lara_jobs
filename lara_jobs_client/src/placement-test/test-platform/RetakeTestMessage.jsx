import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';

const RetakeTestMessage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isEligible, daysLeft } = location.state || {};

    if (isEligible === undefined) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 text-center">
                <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mb-4" />
                <p className="text-2xl font-semibold text-gray-700 mb-2">Invalid Access</p>
                <p className="text-gray-500 mb-6">It seems you've accessed this page incorrectly.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center">
                <ExclamationTriangleIcon className="h-14 w-14 text-red-500 mx-auto mb-4" />

                <h2 className="text-3xl font-bold text-red-600 mb-2">You've Already Taken the Test</h2>

                <p className="text-gray-700 text-lg mb-3">
                        
                </p>

                <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                    <ClockIcon className="h-5 w-5 text-blue-500 animate-bounce" />
                    <span>
                        You can retake the test in <strong>{daysLeft}</strong> {daysLeft === 1 ? 'day' : 'days'}.
                    </span>
                </div>

                <button
                    onClick={() => navigate('/common-dashboard')}
                    className="mt-4 w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default RetakeTestMessage;
