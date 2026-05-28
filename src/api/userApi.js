import api from "./axios";

export const completeRegistrationApi = (data) => {
  return api.post("/user-registration", data);
};