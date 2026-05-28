import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { saveUserAndSendOtp } from "../../api/authApi";
import {
    setToken,
    setUser,
} from "../../redux/slices/registrationSlice";

import Input from "../common/Input";
import Button from "../common/Button";

const UserDetailsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const company = useSelector(
        (state) => state.registration.company
    );

    const [payload, setPayload] = useState({
        mail: "",
        fname: "",
        lname: "",
    });

    const [errors, setErrors] = useState({});

    // Regex
    const emailRegex = useMemo(
        () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        []
    );

    const nameRegex = useMemo(
        () => /^[A-Za-z]+$/,
        []
    );

    // Validate field
    const validateField = useCallback(
        (name, value) => {
            const trimmedValue = value.trim();

            switch (name) {
                case "mail":
                    if (
                        trimmedValue &&
                        !emailRegex.test(trimmedValue)
                    ) {
                        return "Invalid email address";
                    }
                    break;

                case "fname":
                    if (
                        trimmedValue &&
                        !nameRegex.test(trimmedValue)
                    ) {
                        return "First name should contain only alphabets";
                    }
                    break;

                case "lname":
                    if (
                        trimmedValue &&
                        !nameRegex.test(trimmedValue)
                    ) {
                        return "Last name should contain only alphabets";
                    }
                    break;

                default:
                    return "";
            }

            return "";
        },
        [emailRegex, nameRegex]
    );

    // Handle input change
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            // Remove all spaces
            const sanitizedValue = value.replace(/\s/g, "");

            setPayload((prev) => ({
                ...prev,
                [name]: sanitizedValue,
            }));

            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, sanitizedValue),
            }));
        },
        [validateField]
    );

    // Form validation
    const isFormValid = useMemo(() => {
        return (
            payload.mail &&
            payload.fname &&
            payload.lname &&
            emailRegex.test(payload.mail) &&
            nameRegex.test(payload.fname) &&
            nameRegex.test(payload.lname) &&
            Object.values(errors).every((err) => !err)
        );
    }, [payload, errors, emailRegex, nameRegex]);

    // Submit form
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            const newErrors = {
                mail: payload.mail
                    ? validateField("mail", payload.mail)
                    : "Email is required",

                fname: payload.fname
                    ? validateField("fname", payload.fname)
                    : "First name is required",

                lname: payload.lname
                    ? validateField("lname", payload.lname)
                    : "Last name is required",
            };

            setErrors(newErrors);

            const hasErrors = Object.values(newErrors).some(
                (err) => err
            );

            if (hasErrors || !isFormValid) {
                toast.error(
                    "Please fill all required fields correctly"
                );
                return;
            }

            if (!company?.id) {
                toast.error("Company not found");
                return;
            }
            dispatch(setToken("RHhYcWxKL0dRM29TUk9VcG1Ic3NEdWU5SGxzPQ=="));
            dispatch(setUser(payload));
            toast.success("OTP Sent Successfully");

            // try {
            //     const requestPayload = {
            //         company_id: company.id,
            //         ...payload,
            //     };
            //     const response = await saveUserAndSendOtp(requestPayload);
            //     dispatch(setToken(response?.data?.data?.token));
            //     dispatch(setUser(payload));
            //     toast.success("OTP Sent Successfully");
            //     navigate("/verify-otp");
            // } catch (error) {
            //     console.error("OTP Error:", error);
            //     toast.error(
            //         error?.response?.data?.message ||
            //         "Something went wrong"
            //     );
            // }
        },
        [payload, company, dispatch, navigate, isFormValid, validateField,]
    );

    return (
        <div className="woliba_form">
            <h1>Registration</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Work Email"
                    type="email"
                    name="mail"
                    value={payload.mail}
                    onChange={handleChange}
                />

                {errors.mail && (
                    <div className="error_text">
                        <p>{errors.mail}</p>
                    </div>
                )}

                <Input
                    label="First Name"
                    name="fname"
                    value={payload.fname}
                    onChange={handleChange}
                />

                {errors.fname && (
                    <div className="error_text">
                        <p>{errors.fname}</p>
                    </div>
                )}

                <Input
                    label="Last Name"
                    name="lname"
                    value={payload.lname}
                    onChange={handleChange}
                />

                {errors.lname && (
                    <div className="error_text">
                        <p>{errors.lname}</p>
                    </div>
                )}

                <Input
                    label="Company Name"
                    value={company?.company_name || ""}
                    disabled
                />

                <div className="otp_button_box">
                    <Button
                        title="Verify Email"
                        type="submit"
                        disabled={!isFormValid}
                    />
                </div>
            </form>
        </div>
    );
};

export default UserDetailsForm;