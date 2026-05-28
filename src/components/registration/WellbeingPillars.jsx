import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from "../common/Button";
import { LeftArrow, LOADER } from "../../utils/image-constannts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MAX_SELECTION = 3;

const WellbeingPillars = ({ prevStep }) => {
  const user = useSelector((state) => state.registration.user);

  const navigate = useNavigate();

  // =========================
  // FORM DATA STATE
  // =========================
  const [formData, setFormData] = useState({
    wellbeingPillars: [],
  });

  // =========================
  // LOCAL STATES
  // =========================
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selected = formData?.wellbeingPillars || [];

  // =========================
  // FETCH PILLARS
  // =========================
  useEffect(() => {
    const fetchPillars = async () => {
      
     setPillars([
                {
                    id: 1,
                    pillar_title: "Physical Wellbeing",
                    description: "Energy, movement, sleep, and routine care",
                },
                {
                    id: 2,
                    pillar_title: "Mental Wellbeing",
                    description: "Clarity, focus, and mindfulness",
                },
                {
                    id: 3,
                    pillar_title: "Emotional Wellbeing",
                    description: "Resilience, self-awareness, stress regulation",
                }
            ]);
            //   try {
          

            //     const res = await getWellbeingPillars();
            //     const response = res?.data;

            //     if (response?.status) {
            //       setPillars(response?.data || []);
            //     } else {
            //       console.warn("API returned false status");
            //       setPillars([]);
            //     }
            //   } catch (error) {
            //     console.error("Error fetching pillars:", error);
            //     setPillars([]);
            //   } finally {
            //     setLoading(false);
            //   }
    };

    fetchPillars();
  }, []);

  // =========================
  // TOGGLE PILLAR
  // =========================
  const togglePillar = (id) => {
    setFormData((prev) => {
      const current = prev?.wellbeingPillars || [];

      const isSelected = current.includes(id);

      let updated = [];

      if (isSelected) {
        updated = current.filter((item) => item !== id);
      } else {
        if (current.length >= MAX_SELECTION) {
          return prev;
        }

        updated = [...current, id];
      }

      return {
        ...prev,
        wellbeingPillars: updated,
      };
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload = {
        userId: user?.id,
        wellbeingPillars: selected,
      };

      console.log("SUBMIT PAYLOAD =>", payload);

      // API CALL
      /*
      const res = await completeRegistrationApi(payload);
      const response = res?.data;

      if (!response?.status) {
        toast.error(response?.message || "Registration failed");
        return;
      }
      */

      setTimeout(() => {
        toast.success("Registration Success");

        localStorage.setItem("welcome", "yes");

        navigate("/welcome");

        setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Submit error:", error);

      toast.error("Failed to submit data");

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