import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSpinner from "./ReactSpinner";
import BTN from "./BTN"; // Assuming BTN is a custom component in the same directory

const QuizSettings = () => {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState({}); // State to store selected values
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchSettings = async () => {
      const apiURL = "http://localhost:5000/settings";
      try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load settings. Please try again later.");
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value, // Update the selected value for the specific key
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default navigation by the Link
    const allSelected = Object.keys(settings).every((key) =>
      selectedValues[key]
    );
    if (!allSelected) {
      alert("Please select all settings before starting the quiz.");
      return;
    }
    navigate("/quiz", { state: selectedValues });
  };

  return (
    <div className="settings">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : settings ? (
        Object.keys(settings).map((key, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`setting-${key}`}
              className="block text-white mb-2.5 text-sm"
            >
              {settings[key].label}
            </label>
            <select
              id={`setting-${key}`}
              className="w-full p-[10px] bg-[#fff] mb-5 text-[16px] text-[#1f2847] capitalize border-none rounded-[5px]"
              onChange={(e) => handleChange(key, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {settings[key].options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        ))
      ) : (
        <ReactSpinner loading={true} />
      )}

      <BTN
        onClick={handleSubmit} // Passes handleSubmit to BTN
        data="Start Quiz"
        li="quiz"
      />
    </div>
  );
};

export default QuizSettings;
