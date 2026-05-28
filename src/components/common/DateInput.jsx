import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "./DobPicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { DATEICON } from "../../utils/image-constannts";

const DateInput = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempDate, setTempDate] = useState(value || ""); // ✅ temp state

  const handleOpen = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setTempDate(value || ""); // reset if user cancels
  };

  const handleDone = () => {
    onChange({
      target: {
        name,
        value: tempDate,
      },
    });

    setShowModal(false);
  };

  return (
    <div className="input_group">

      {/* LABEL */}
      {label && <label>{label}</label>}

      {/* INPUT */}
      <div className="input_wrapper position-relative">
        <input
          name={name}
          type="text"
          value={value || ""}
          disabled={disabled}
          placeholder="Select Date"
          readOnly
          className="form-control"
        />

        <span
          className="date_icon"
          onClick={handleOpen}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <img src={DATEICON} alt="date" width="20" />
        </span>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex justify-content-center date_model">
          <DatePicker
            selected={tempDate ? new Date(tempDate) : null}
            onChange={(date) => {
              const formatted = date
                ? date.toISOString().split("T")[0]
                : "";

              setTempDate(formatted);
            }}
            inline
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </Modal.Body>

        <Modal.Footer>


          <Button variant="primary" onClick={handleDone}>
            Done
          </Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
};

export default DateInput;