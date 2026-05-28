import React, { useState } from "react";
import "./Dropdown.css";

import {
  ENGLISH,
  FRENCH,
} from "../../../utils/image-constannts";

const Dropdown = () => {

  const options = [
    {
      label: "EN",
      image: ENGLISH,
    },

    {
      label: "FR",
      image: FRENCH,
    },
  ];

  // FIRST OPTION DEFAULT SELECTED

  const [selected, setSelected] =
    useState(options[0]);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const handleSelect = (item) => {
    setSelected(item);
    setShowDropdown(false);
  };

  return (
    <div className="dropdown-container">

      {/* DROPDOWN HEADER */}

      <div
        className="dropdown-header"
        onClick={() =>
          setShowDropdown(!showDropdown)
        }
      >

        {/* SELECTED ITEM */}

        <div className="selected-option">

          <img
            src={selected.image}
            alt={selected.label}
            className="flag-image"
            style={{ width: "22px",height:"22px" }}
          />

          <span>{selected.label}</span>

        </div>

        <span className="arrow-icon">
          {showDropdown ? "▲" : "▼"}
        </span>

      </div>

      {/* DROPDOWN LIST */}

      {showDropdown && (
        <div className="dropdown-list">

          {options.map((item, index) => (

            <div
              key={index}
              className={`dropdown-item ${
                selected.label === item.label
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleSelect(item)
              }
            >

              <img
                src={item.image}
                alt={item.label}
                className="flag-image"
                style={{ width: "30px" }}
              />

              <span>{item.label}</span>

            </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default Dropdown;