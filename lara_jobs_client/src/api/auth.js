export const sendOtp = async (email) => {
  try {
    return "sendOtp"
  } catch (error) {
    console.error("Error sending OTP", error);
    throw new Error("Unable to send OTP");
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    return "verifyOtp"
  } catch (error) {
    console.error("Error verifying OTP", error);
    throw new Error("Invalid OTP");
  }
};

export const sendPhoneOtp = async (phone) => {
  try {
    return "sendPhoneOtp"
  } catch (error) {
    console.error("Error sending phone OTP", error);
    throw new Error("Unable to send OTP");
  }
};

export const verifyPhoneOtp = async (phone, otp) => {
  try {
  return "verifyPhoneOtp"
  } catch (error) {
    console.error("Error verifying phone OTP", error);
    throw new Error("Invalid OTP");
  }
};
