import { useState, useCallback, useEffect } from "react";
import { verifyCompany } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { setCompany } from "../../redux/slices/registrationSlice";

const CompanyForm = () => {
    const [company_name, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [crash, setCrash] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState([]);
    if (crash) {
        throw new Error("Server is temporarily unavailable. Please try again later.");
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // -----------------------------
    // PASSWORD VALIDATION LOGIC
    // -----------------------------
    const validatePassword = useCallback((value) => {
        const errors = [];

        if (value.length < 8) {
            errors.push("Minimum 8 characters required");
        }

        if (!/[A-Z]/.test(value)) {
            errors.push("At least 1 uppercase letter required");
        }

        if (!/[0-9]/.test(value)) {
            errors.push("At least 1 number required");
        }

        return errors;
    }, []);

    // Live password validation
    useEffect(() => {
        if (password) {
            setPasswordErrors(validatePassword(password));
        } else {
            setPasswordErrors([]);
        }
    }, [password, validatePassword]);

    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!company_name.trim()) {
            newErrors.company_name = "Company name is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0 &&
            passwordErrors.length === 0
        );
    }, [company_name, password, passwordErrors]);

    // -----------------------------
    // SUBMIT HANDLER
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await verifyCompany({
                company_name,
                password,
            });

            if (response?.data?.status === "success") {
                toast.success("Company Verified Successfully");
                dispatch(setCompany(response.data.data[0]));
                navigate("/register");
            }
        } catch (error) {
            console.error("verifyCompany error:", error);
            toast.error("Invalid Company Credentials");
            const status = error?.response?.status;
            if (status >= 500) {
                setCrash(true); // optional
            }
        } finally {
            setLoading(false);
        }
        // toast.success("Company Verified Successfully");

        // dispatch(
        //     setCompany({
        //         id: 1,
        //         company_name: "Woliba",
        //         password: "Woliba@123!",
        //         spouse_or_dependent: 1,
        //         show_spouse: 0,
        //         show_dependent: 0,
        //     })
        // );
        // navigate("/register");
    };

    const isDisabled =
    !company_name ||
    !password ||
    passwordErrors.length > 0 ||
    loading;

    return (
        <div className="woliba_form">
            <h1>Registration</h1>

            <form onSubmit={handleSubmit}>
                {/* COMPANY NAME */}
                <Input
                    label="Company Name"
                    value={company_name}
                    onChange={(e) => {
                        setCompanyName(e.target.value);

                        setErrors((prev) => ({
                            ...prev,
                            company_name: "",
                        }));
                    }}
                />

                {errors.company_name && (
                    <p className="error_text">
                        {errors.company_name}
                    </p>
                )}

                {/* PASSWORD */}
                <Input
                    label="Company Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);

                        setErrors((prev) => ({
                            ...prev,
                            password: "",
                        }));
                    }}
                />

                {/* LIVE PASSWORD ERRORS */}
                {password.length > 0 && passwordErrors.length > 0 && (
                    <ul className="error_text">
                        {passwordErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}

                {/* SUBMIT BUTTON */}
                <div className="otp_button_box">
                    <Button
                        type="submit"
                       title={loading ? "Verifying..." : "Next"}
                        disabled={isDisabled}
                    />
                </div>
            </form>
        </div>
    );
};

export default CompanyForm;