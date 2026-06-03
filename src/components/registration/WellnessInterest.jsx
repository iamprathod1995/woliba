import { useEffect, useState } from "react";
import { ARROWDOWN, ARROWUP, LeftArrow } from "../../utils/image-constannts";
import Button from "../common/Button";
import { IMAGEBASE } from "../../utils/constants";
import { getWellnessInterest } from "../../api/wellbeingApi";

const WellnessInterest = ({ formData, setFormData, nextStep, prevStep }) => {
    const [openSection, setOpenSection] = useState(0);
    const [wellnessData, setWellnessData] = useState([]);
    const [loading, setLoading] = useState(false);

    const selected = formData.areas_of_interest || [];
console.log('wellnessData',wellnessData);

    useEffect(() => {
        fetchWellnessInterest();
    }, []);

     const fetchWellnessInterest = async () => {
            try {
                setLoading(true);
                const res = await getWellnessInterest();
                if (res?.data?.status) {
                    setWellnessData(res?.data?.data[0] || []);
                     setLoading(true);
                } else {
                    setWellnessData([]);
                }
            } catch (error) {
                console.error("Error fetching wellness interest:", error);
                setWellnessData([]);
            } finally {
                setLoading(false);
            }
        };

    const groupedData = wellnessData.reduce((acc, item) => {
        const key = item.interest_type || "Others";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const handleSelect = (id) => {
        const updated = selected.includes(id)
            ? selected.filter((item) => item !== id)
            : [...selected, id];

        setFormData({
            ...formData,
            areas_of_interest: updated,
        });
    };

    const toggleSection = (index) => {
        setOpenSection((prev) => (prev === index ? null : index));
    };

    return (
        <div className="wellness-wrapper">
            <div className="wellness-card">
                <h1 className="wellness-title">
                    Select wellness interests (Min 1 required)
                </h1>

                {loading && <p>Loading...</p>}

                {!loading &&
                    Object.keys(groupedData).map((section, index) => {
                        const isOpen = openSection === index;

                        return (
                            <div key={section} className="section-wrapper">
                                <div
                                    className="section-header"
                                    onClick={() => toggleSection(index)}
                                >
                                    <h2>{section}</h2>
                                    <img
                                        src={isOpen ? ARROWUP : ARROWDOWN}
                                        alt="toggle"
                                    />
                                </div>

                                {isOpen && (
                                    <div className="interest-grid">
                                        {groupedData[section].map((item) => {
                                            const isSelected = selected.includes(item.id);

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSelect(item.id)}
                                                    className={`interest-pill ${isSelected ? "selected" : ""
                                                        }`}
                                                >
                                                    <img
                                                        src={`${IMAGEBASE}/${isSelected
                                                                ? item.interest_white_icon
                                                                : item.interest_color_icon
                                                            }`}
                                                        alt={item.name}
                                                    />
                                                    <span>{item.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                <div className="otp_button_box">
                    <Button
                        className="light"
                        icon={LeftArrow}
                        title="Back"
                        onClick={prevStep}
                    />
                    <Button
                        title="Next"
                        disabled={selected.length === 0}
                        onClick={nextStep}
                    />
                </div>
            </div>
        </div>
    );
};

export default WellnessInterest;