import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from "../common/Button";
import { LeftArrow, LOADER } from "../../utils/image-constannts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getWellbeingPillars } from "../../api/wellbeingApi";
import { completeRegistrationApi } from "../../api/userApi";

const MAX_SELECTION = 3;

const WellbeingPillars = ({ formData, setFormData, prevStep, }) => {
  const user = useSelector((state) => state.registration.user);
  console.log('formData', formData);

  const navigate = useNavigate();

  // =========================
  // FORM DATA STATE
  // =========================


  // =========================
  // LOCAL STATES
  // =========================
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selected = formData?.wellbeing_pillars || [];

  // =========================
  // FETCH PILLARS
  // =========================
  useEffect(() => {
    const fetchPillars = async () => {


      try {


        const res = await getWellbeingPillars();
        const response = res?.data;

        if (response?.status) {
          setPillars(response?.data || []);
        } else {
          console.warn("API returned false status");
          setPillars([]);
        }
      } catch (error) {
        console.error("Error fetching pillars:", error);
        setPillars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPillars();
  }, []);

  // =========================
  // TOGGLE PILLAR
  // =========================
  // const togglePillar = (id) => {
  //   setFormData((prev) => {
  //     const current = prev?.wellbeingPillars || [];

  //     const isSelected = current.includes(id);

  //     let updated = [];

  //     if (isSelected) {
  //       updated = current.filter((item) => item !== id);
  //     } else {
  //       if (current.length >= MAX_SELECTION) {
  //         return prev;
  //       }

  //       updated = [...current, id];
  //     }

  //     return {
  //       ...prev,
  //       wellbeingPillars: updated,
  //     };
  //   });
  // };

  const togglePillar = (id) => {
    const current = formData?.wellbeing_pillars || [];

    const isSelected = current.includes(id);

    let updated = [];

    if (isSelected) {
      updated = current.filter((item) => item !== id);
    } else {
      if (current.length >= MAX_SELECTION) return;

      updated = [...current, id];
    }

    setFormData({
      ...formData,
      wellbeing_pillars: updated,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const res = await completeRegistrationApi(formData);
      const response = res?.data;

      if (response?.status !== "success") {
        toast.error(response?.message || "Registration failed");
        return;
      }

      const userData = response?.data;

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      toast.success("Registration completed successfully");

     
      navigate("/welcome");

    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit data");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // LOADER UI
  // =========================
  if (loading) {
    return (
      <div className="loader-screen">
        <img src={LOADER} alt="loading" />
        <h5>Loading your wellbeing pillars...</h5>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="wellbeing-container">
      <h1 className="heading">
        Select any {MAX_SELECTION} well-being pillars
      </h1>

      <div className="pillars-grid">
        {pillars.map((pillar) => {
          const isSelected = selected.includes(pillar.id);

          const order = selected.indexOf(pillar.id) + 1;

          return (
            <div
              key={pillar.id}
              className={`pillar-card ${isSelected ? "active" : ""}`}
              onClick={() => togglePillar(pillar.id)}
            >
              {isSelected && (
                <div className="selected-count">{order}</div>
              )}

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                />
              </div>

              <div className="content">
                <h3>{pillar.pillar_title}</h3>

                <p>{pillar.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="otp_button_box">
        <Button
          className="light"
          icon={LeftArrow}
          title="Back"
          onClick={prevStep}
          disabled={submitting}
        />

        <Button
          title={submitting ? "Submitting..." : "Done"}
          onClick={handleSubmit}
          disabled={
            selected.length !== MAX_SELECTION || submitting
          }
        />
      </div>
    </div>
  );
};

export default WellbeingPillars;