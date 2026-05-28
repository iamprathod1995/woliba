import api from "./axios";

export const verifyCompany = (data) => {
  return api.post(
    "/verify-by-company-name-and-password",
    data
  );
};

export const saveUserAndSendOtp = (data) => {
  return api.post(
    "/save-user-details-and-send-otp",
    data
  );
};

export const verifyOtpApi = (data) => {
  return api.post(
    "/verify-otp-for-user-registration",
    data
  );
};

export const resendOtpApi = (data) => {
  return api.post(
    "/send-otp-for-user-registration",
    data
  );
};