import React, { useEffect, useState } from 'react';
import profilePic from '../../assets/profile_pic_default.webp';
import { getCandidateDetails } from '../../api/candidate';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Loading from '../loading/Loading';

const Profile = () => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const res = await getCandidateDetails();
                console.log(res);
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
        <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="px-4 py-6">
                    <div className="text-center my-4">
                        <img
                            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src={image_url || profilePic}
                            alt="Profile picture"
                        />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white">
                                {name || 'N/A'}
                            </h3>
                            <h6 className="text-gray-300 dark:text-white mb-1 inline-flex items-center">
                                {email || 'N/A'} {emailVerificationIcon}
                            </h6>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                <svg
                                    className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                >
                                    <path
                                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                    />
                                </svg>
                                {town || 'N/A'} , {district || 'N/A'},
                                <br />
                                {state || 'N/A'}
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 mt-4">
                                <p><strong>Phone Number: +</strong> {phone_number || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
