import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DobPicker.css";
const DobPicker = () => {
  const [dob, setDob] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <label>Date of Birth</label>

      <DatePicker
        selected={dob}
        onChange={(date) => setDob(date)}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        placeholderText="Select date"
        maxDate={new Date()}
      />
    </div>
  );
};

export default DobPicker;