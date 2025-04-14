import React, { useEffect, useState } from 'react';
import profilePic from '../../assets/profile_pic_default.webp';
import { getCandidateDetails } from '../../api/candidate';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Loading from '../loading/Loading';
import CandidateTestResults from '../../placement-test/results/CandidateTestResults';
import CommonTestLink from '../../placement-test/dasboard-test-link/CommonTestLink';

const Profile = () => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const res = await getCandidateDetails();
                // console.log(res);
                setCandidate(res);
            } catch (error) {
                console.error('Error fetching details: ', error);
            }
        };

        fetchCandidateDetails();
    }, []);

    if (!candidate) {
        return <div><Loading /></div>;
    }

    const { name, email, email_verified, phone_number, district, state, town, image_url } = candidate;

    const emailVerificationIcon = email_verified ? (
        <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
    ) : null;

    return (
        <>
        <div className="min-h-screen  py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <img
                            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                            src={image_url || profilePic}
                            alt="Profile"
                        />
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900">{name || 'N/A'}</h3>
                            <h6 className="text-gray-600 flex items-center justify-center mt-1">
                                {email || 'N/A'} {emailVerificationIcon}
                            </h6>
                            <div className="text-sm text-gray-500 mt-2">
                                <div className="flex items-center justify-center gap-1">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    </svg>
                                    <span>{town || 'N/A'}, {district || 'N/A'}, {state || 'N/A'}</span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                <strong>Phone Number:</strong> +{phone_number || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <CommonTestLink />
            </div>

            <div className="mt-6">
                <CandidateTestResults />
            </div>
        </div>
    </>
    );
};

export default Profile;
