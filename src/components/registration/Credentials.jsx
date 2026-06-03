import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/Input";
import Button from "../common/Button";
import DateInput from "../common/DateInput";
import { LeftArrow } from "../../utils/image-constannts";
import { useNavigate } from "react-router-dom";


const Credentials = ({ formData, setFormData, nextStep }) => {
    const token = useSelector((state) => state.registration.token);
    const user = useSelector((state) => state.registration.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [accepted, setAccepted] = useState(false);

    const [errors, setErrors] = useState({});
    const [passwordRules, setPasswordRules] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        special: false,
    });

    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&]).{8,32}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const checkPasswordMatch = (pass, confirmPass) => {
        if (!confirmPass) return setPasswordMatchError("");
        setPasswordMatchError(pass === confirmPass ? "" : "Passwords do not match. Please re-enter.");
    };

    const isPasswordValid =
        passwordRules.length &&
        passwordRules.uppercase &&
        passwordRules.lowercase &&
        passwordRules.special;

    const validateForm = () => {
        const newErrors = {};

        if (!password) newErrors.password = "Password is required";
        else if (!passwordRegex.test(password))
            newErrors.password = "Password must be 8-32 chars, include uppercase, lowercase & special character";

        if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (!birthday) newErrors.birthday = "Date of birth is required";

        if (!phone) newErrors.phone = "Phone number is required";
        else if (!phoneRegex.test(phone)) newErrors.phone = "Enter valid 10 digit phone number";

        if (!accepted) newErrors.accepted = "Please accept terms & conditions";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatDate = (date) => {
        if (!date) return "";

        if (typeof date !== "string") {
            date = String(date);
        }

        if (!date.includes("-")) return "";

        const [y, m, d] = date.split("-");
        return `${d}-${m}-${y}`;
    };
    const handleSubmit = () => {
        if (!validateForm()) return;

        const updatedForm = {
            ...formData,
            fname: user.fname,
            lname: user.lname,
            email:user.mail,
            password,
            token,
            birthday,
            phone_number: phone,
            accepted_privacy_policy: accepted,
        };

 
        setFormData(updatedForm);
        nextStep();
    };

    const isDisabled = !password || !confirmPassword || !birthday || !phone || !accepted;

    return (
        <div className="woliba_form credential_form">
            <h1>Login Credentials</h1>

            <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setErrors({ ...errors, password: "" });

                    setPasswordRules({
                        length: value.length >= 8 && value.length <= 32,
                        uppercase: /[A-Z]/.test(value),
                        lowercase: /[a-z]/.test(value),
                        special: /[@$!%*#?&]/.test(value),
                    });

                    checkPasswordMatch(value, confirmPassword);
                }}
            />

            {password.length > 0 && !isPasswordValid && (
                <div className="error_list">
                    <p style={{ color: passwordRules.length ? "green" : "red" }}>8–32 characters</p>
                    <p style={{ color: passwordRules.uppercase ? "green" : "red" }}>One uppercase letter</p>
                    <p style={{ color: passwordRules.lowercase ? "green" : "red" }}>One lowercase letter</p>
                    <p style={{ color: passwordRules.special ? "green" : "red" }}>One special character</p>
                </div>
            )}

            {errors.password && <p className="error_text">{errors.password}</p>}

            <Input
                label="Confirm Password"
                type="password"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);
                    setErrors({ ...errors, confirmPassword: "" });
                    checkPasswordMatch(password, value);
                }}
            />

            {passwordMatchError &&<div className="error_list"> <p>{passwordMatchError}</p></div>}
            {errors.confirmPassword && <div className="error_list"><p>{errors.confirmPassword}</p></div>}

            <DateInput
                label="Birthday"
                type="date"
                value={birthday}
                onChange={(e) => {
                    setBirthday(e.target.value);
                    setErrors({ ...errors, birthday: "" });
                }}
            />
            {errors.birthday && <div className="error_list"> <p >{errors.birthday}</p></div>}

            <Input
                label="Contact Number"
                placeholder="Enter contact number"
                value={phone}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!/^\d*$/.test(value)) return;

                    setPhone(value);
                    setErrors({ ...errors, phone: "" });

                    if (value.length < 10) setPhoneError("Must be 10 digits");
                    else setPhoneError("");
                }}
            />

            {phoneError && <div className="error_list"><p>{phoneError}</p></div>}
            {errors.phone && <div className="error_list"><p >{errors.phone}</p></div>}

            <div className="terms_box">
                <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => {
                        setAccepted(e.target.checked);
                        setErrors({ ...errors, accepted: "" });
                    }}
                />
                <p>
                    I agree to Terms of Service and Privacy Policy
                </p>
            </div>

            {errors.accepted && <div className="error_list"><p>{errors.accepted}</p></div>}

            <div className="otp_button_box">
                <Button className="light" icon={LeftArrow} title="Back" />
                <Button title="Next" onClick={handleSubmit} disabled={isDisabled} />
            </div>
        </div>
    );
};

export default Credentials;