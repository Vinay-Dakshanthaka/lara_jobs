import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendOtp, verifyOtp } from "../../api/auth";
import { ArrowLeftCircleIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

const EmailForm = ({ onOtpVerified }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // For API error message

  // Email validation schema with Yup
  const emailValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  // OTP validation schema with Yup
  const otpValidationSchema = Yup.object({
    otp : Yup.string().length(6,'Enter 6 digit OTP sent your email').required('OTP required'),
  })

  const handleSubmitEmail = async (values) => {
    try {
      setErrorMessage("");  
      await sendOtp(values.email);
      setOtpSent(true); 
    } catch (error) {
      setErrorMessage("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      setErrorMessage("");  // Reset error message
      await verifyOtp(values.email, values.otp);
      setOtpVerified(true);
      onOtpVerified();
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 border rounded-lg">
        {!otpSent ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}  // Add validation schema
            onSubmit={handleSubmitEmail}
          >
            {({ values }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md"
                    value={values.email}  // Ensure value is controlled
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Send OTP
                </button>
              </Form>
            )}
          </Formik>
        ) : !otpVerified ? (
          <>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={otpValidationSchema}  // Add OTP validation schema
              onSubmit={handleVerifyOtp}
            >
              {({ values }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      className="w-full px-4 py-2 border rounded-md"
                      value={values.otp}  // Ensure value is controlled
                    />
                    <div className="text-red-500 text-sm">
                      <ErrorMessage name="otp" />
                    </div>
                  </div>
                  {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                  >
                    Verify OTP
                  </button>
                </Form>
              )}
            </Formik>
            <div>
              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
                className="w-8 mt-4 bg-gray-500 text-white rounded-md text-center mx-auto"
              >
                <ArrowLeftIcon />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EmailForm;