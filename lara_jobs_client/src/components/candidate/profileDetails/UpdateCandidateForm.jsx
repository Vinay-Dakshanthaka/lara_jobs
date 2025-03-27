import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateCandidateBasicDetails } from '../../../api/candidate';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateCandidateForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot be more than 50 characters')
            .required('Name is required'),
        pin_code: Yup.string()
            .matches(/^\d{6}$/, 'Pin code must be a 6-digit number')
            .required('Pin code is required'),
    });

    // Function to handle the form submission
    const handleSubmit = async (values) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('Authorization token is missing.');
            return;
        }

        try {
            const response = await updateCandidateBasicDetails(values);
            toast.success('Updated your details')
            setSuccessMessage('Details updated successfully!');
            navigate('/signin');
            setErrorMessage('');
        } catch (error) {
            toast.error('Failed to update your details. Pleas try again after some time.')
            setErrorMessage('Failed to update details. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 border rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Update Your Details</h2>

                {errorMessage && (
                    <div className="bg-red-100 text-red-600 p-4 mb-4 rounded">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 text-green-600 p-4 mb-4 rounded">
                        {successMessage}
                    </div>
                )}

                <Formik
                    initialValues={{
                        name: '',
                        pin_code: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pin_code" className="block text-sm font-medium text-gray-700">
                                    Pin Code
                                </label>
                                <Field
                                    type="text"
                                    id="pin_code"
                                    name="pin_code"
                                    value={values.pin_code}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your pin code"
                                />
                                <ErrorMessage name="pin_code" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Update Details
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateCandidateForm;
