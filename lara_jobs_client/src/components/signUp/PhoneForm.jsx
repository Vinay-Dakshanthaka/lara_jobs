import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { sendPhoneOtp, verifyPhoneOtp } from "../../api/auth";

const PhoneForm = ({ onPhoneVerified }) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSubmitPhone = async (values) => {
    try {
      await sendPhoneOtp(values.phone);
      setOtpSent(true);
      setPhone(values.phone);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const handleVerifyPhoneOtp = async (values) => {
    try {
      await verifyPhoneOtp(phone, values.otp);
      setOtpVerified(true);
      onPhoneVerified();
    } catch (error) {
      console.error("Error verifying OTP", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 border rounded-lg">
        {!otpSent ? (
          <Formik
            initialValues={{ phone: "" }}
            onSubmit={handleSubmitPhone}
          >
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Send OTP
              </button>
            </Form>
          </Formik>
        ) : !otpVerified ? (
          <Formik
            initialValues={{ otp: "" }}
            onSubmit={handleVerifyPhoneOtp}
          >
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Verify OTP
              </button>
            </Form>
          </Formik>
        ) : null}
      </div>
    </div>
  );
};

export default PhoneForm;
