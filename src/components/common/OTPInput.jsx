import { useRef } from "react";

const OTPInput = ({ value, onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (val, index) => {
    if (!/^\d*$/.test(val)) return; // only numbers

    const otpArr = value.split("");
    otpArr[index] = val;

    const newOtp = otpArr.join("").slice(0, 6);
    onChange(newOtp);

    // auto move next
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between otp_input_box">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="
            w-12 h-12
            border border-gray-300
            rounded-md
            text-center
            text-xl
            focus:border-orange-500
            focus:outline-none
            shadow-sm
          "
        />
      ))}
    </div>
  );
};

export default OTPInput;