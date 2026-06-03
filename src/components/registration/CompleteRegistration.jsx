import { useState } from "react";
import Credentials from "./Credentials";
import WellnessInterest from "./WellnessInterest";
import WellbeingPillars from "./WellbeingPillars";


const CompleteRegistration = () => {
    const [step, setStep] = useState(1);

    // GLOBAL FORM DATA (ALL STEPS)
    const [formData, setFormData] = useState({
        password: "",
        birthday: "",
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        phone: "",
        accepted: false,
        areas_of_interest: [],
        wellbeing_pillars: [],
        user_type: 0,
        gender: "Male",
        profile_image: "",
        language_id: 1,
        smoke: "no",
        exercise_day_per_week: "3-4 days",
        average_sleep_per_night: "7-8 hours",
        average_water_intake: "8+ glasses",
        pain_experience: "rarely",
        prescription_intake: "none",
        physical_exam_frequency: "annually",

    });

    // NEXT
    const nextStep = () => setStep((prev) => prev + 1);

    // BACK
    const prevStep = () => setStep((prev) => prev - 1);

    // FINAL SUBMIT
    const handleFinalSubmit = async () => {
        const payload = {
            ...formData,
        };

        console.log("FINAL PAYLOAD:", payload);

        // API CALL HERE
        // await completeRegistrationApi(payload);
    };

    return (
        <>
            {/* STEP RENDERING */}
            {step === 1 && (
                <Credentials
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
                <WellnessInterest
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}

            {step === 3 && (
                <WellbeingPillars
                    formData={formData}
                    setFormData={setFormData}
                    prevStep={prevStep}
                    onSubmit={handleFinalSubmit}
                />
            )}
         </>
    );
};

export default CompleteRegistration;