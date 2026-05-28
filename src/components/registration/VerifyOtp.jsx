import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyOtpApi, resendOtpApi } from "../../api/authApi";
import {
    setOtpVerified,
    setToken,
} from "../../redux/slices/registrationSlice";
import { Link, useNavigate } from "react-router-dom";

import OTPInput from "../common/OTPInput";
import Button from "../common/Button";
import { LeftArrow } from "../../utils/image-constannts";
import { toast } from "react-toastify";

const OTP_TIME = 10;

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(OTP_TIME);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(
        (state) => state.registration.token
    );

    const email = useSelector(
        (state) => state.registration.email
    );

    // -----------------------------
    // TIMER (stable + clean)
    // -----------------------------
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) =>
                prev > 0 ? prev - 1 : 0
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // -----------------------------
    // FORMAT TIME
    // -----------------------------
    const formatTime = useCallback((seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    }, []);

    // -----------------------------
    // OTP VALIDATION
    // -----------------------------
    const isOtpValid = useMemo(() => {
        return otp.length === 6 && /^\d{6}$/.test(otp);
    }, [otp]);

    const canSubmit = isOtpValid && !loading && timeLeft > 0;
    const canResend = timeLeft === 0 && !resendLoading;

    // -----------------------------
    // VERIFY OTP
    // -----------------------------
    const handleVerify = useCallback(async () => {
        if (!canSubmit) return;
        dispatch(setOtpVerified(true));
        navigate("/register");

        // try {
        //     setLoading(true);

        //     const response = await verifyOtpApi({ otp, token });
        //     const res = response?.data;
        //     if (res?.status === "success") {
        //         dispatch(setOtpVerified(true));
        //         toast.success(res?.data?.message || "OTP Verified Successfully");
        //         navigate("/register");
        //     } else {
        //         toast.error(res?.message || "Invalid OTP");
        //     }
        // } catch (error) {
        //     console.error("OTP Verify Error:", error);

        //     toast.error(
        //         error?.response?.data?.message || "Invalid OTP"
        //     );
        // } finally {
        //     setLoading(false);
        // }
    }, [canSubmit, otp, token, dispatch, navigate]);

    // -----------------------------
    // BACK ACTION
    // -----------------------------
    const handleBack = useCallback(() => {
        dispatch(setToken(null));
        navigate(-1);
    }, [dispatch, navigate]);

    // -----------------------------
    // RESEND OTP
    // -----------------------------
    const handleResendOtp = useCallback(async () => {
        if (!canResend) return;

        try {
            setResendLoading(true);
            setOtp("");
            setTimeLeft(OTP_TIME);

            toast.success("OTP Sent Successfully");

            // const response = await resendOtpApi({ email });
            // const res = response?.data;
            // if (res?.status === true) {
            //     setOtp("");
            //     setTimeLeft(OTP_TIME);

            //     toast.success(res?.data?.message || "OTP Sent Successfully");
            //     // update token only if backend sends new one
            //     if (res?.data?.token) {
            //         dispatch(setToken(res.data.token));
            //     }
            // } else {
            //     toast.error(res?.message || "Something went wrong");
            // }
        } catch (error) {
            console.error("Resend OTP Error:", error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to resend OTP"
            );
        } finally {
            setResendLoading(false);
        }
    }, [canResend, email, dispatch]);

    // -----------------------------
    // UI
    // -----------------------------
    return (
        <div className="woliba_form">
            <h1>Input verification code</h1>

            <p>
                We’ve sent a 6-digit OTP to your work email.
                Please enter it below to continue.
            </p>

            {/* OTP INPUT */}
            <OTPInput value={otp} onChange={setOtp} />

            {/* TIMER */}
            <p
                style={{
                    marginTop: "10px",
                    color:
                        timeLeft === 0 ? "#333" : "#333",
                    fontWeight: 500,
                }}
            >
                Resend OTP in : {formatTime(timeLeft)}
            </p>
            {/* RESEND OTP */}
            <div style={{ marginTop: "15px" }}>
                <span
                    onClick={canResend ? handleResendOtp : undefined}
                    style={{
                        cursor: canResend ? "pointer" : "not-allowed",
                        color: canResend ? "rgb(255 0 0)" : "#9ca3af",
                        fontWeight: 500,
                        userSelect: "none",
                    }}
                >
                    {resendLoading
                        ? "Resending..."
                        : canResend
                            ? "Resend OTP"
                            : `Resend`}
                </span>
            </div>
            {/* ACTION BUTTONS */}
            <div className="otp_button_box">
                <Button
                    className="light"
                    icon={LeftArrow}
                    title="Back"
                    onClick={handleBack}
                />

                <Button
                    title={
                        loading
                            ? "Verifying..."
                            : "Submit"
                    }
                    onClick={handleVerify}
                    disabled={!canSubmit}
                />
            </div>


        </div>
    );
};

export default VerifyOtp;