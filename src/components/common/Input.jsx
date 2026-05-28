import React, { useState } from "react";
import { CLOSEEYE, EYE } from "../../utils/image-constannts";

const Input = ({
  label,
  name,              // ✅ ADD THIS
  type = "text",
  value,
  onChange,
  disabled = false,
}) => {

  const [showPassword, setShowPassword] =
    useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="input_group">

      {label && <label>{label}</label>}

      <div className="input_wrapper">

        <input
          name={name}              // ✅ IMPORTANT FIX
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />

        {type === "password" && (
          <span
            className="eye_icon"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <img src={CLOSEEYE} />
            ) : (
              <img src={EYE} />
            )}
          </span>
        )}

      </div>
    </div>
  );
};

export default Input;