import { useSelector } from "react-redux";

import UserDetailsForm from "../components/registration/UserDetailsForm";

import CompanyForm from "../components/registration/CompanyForm";

import VerifyOtp from "../components/registration/VerifyOtp";

import CompleteRegistration from "../components/registration/CompleteRegistration";

import LoginLayout from "../components/layout/LoginLayout/LoginLayout";
import WellnessInterest from "../components/registration/WellnessInterest";
import WellbeingPillars from "../components/registration/WellbeingPillars";

const Registration = () => {

  const company = useSelector(
    (state) => state.registration.company
  );

  const token = useSelector(
    (state) => state.registration.token
  );

  // OTP VERIFIED

  const otpVerified = useSelector(
    (state) =>
      state.registration.otpVerified
  );

  

  return (

    <LoginLayout>

      {
        otpVerified ? (

          // FINAL SCREEN

          <CompleteRegistration />

        ) : token ? (

          // OTP SCREEN

          <VerifyOtp />

        ) : company ? (

          // USER DETAILS

          <UserDetailsForm />

        ) : (

          // COMPANY FORM

           <CompanyForm />
        

        )
      }

    </LoginLayout>
  );
};

export default Registration;