import React, { useState } from "react";

const Step2 = ({ onNext, onPrev, updateFormData }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sunlight, setSunlight] = useState(6); // Default to 6 hours
  const [electricityRate, setElectricityRate] = useState(8); // Default to 8 ₹/kWh

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toFixed(6));
          setLongitude(longitude.toFixed(6));

          // Estimate sunlight hours based on latitude (basic logic)
          let avgSunlight = 6;
          if (latitude >= 8 && latitude <= 12) avgSunlight = 7;
          else if (latitude >= 20 && latitude <= 28) avgSunlight = 5.5;

          setSunlight(avgSunlight);
          alert(`Location detected: Latitude ${latitude}, Longitude ${longitude}, Avg Sunlight: ${avgSunlight} hours/day`);
        },
        () => alert("Location detection failed. Please set manually.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const adjustValue = (field, increment) => {
    if (field === "sunlight") {
      setSunlight((prev) => Math.max(0, prev + increment)); // Prevent negative sunlight
    } else if (field === "electricityRate") {
      setElectricityRate((prev) => Math.max(0, prev + increment)); // Prevent negative rate
    }
  };

  const handleSubmit = () => {
    updateFormData({
      latitude,
      longitude,
      sunlight,
      electricityRate,
    });
    onNext();
  };

  return (
    <div className="step2-container">
      <h2>Enter Location and Electricity Details</h2>

      <div className="form-group">
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
      </div>

      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
      </div>

      <button className="detect-location" onClick={detectLocation}>
        📍 Detect Location (Auto Sunlight)
      </button>

      <div className="form-group">
        <label>Sunlight Availability (Hours/Day):</label>
        <div className="adjust-buttons">
          <input type="number" value={sunlight} readOnly />
        </div>
      </div>

      <div className="form-group">
        <label>Electricity Rate (₹/kWh):</label>
        <div className="adjust-buttons">
          <input type="number" value={electricityRate} readOnly />
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={onPrev}>Back</button>
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
