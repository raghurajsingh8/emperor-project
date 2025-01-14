import React from "react";

const Step4 = ({ formData }) => {
  return (
    <div>
      <h2>Result Page</h2>
      <p>Here are your results:</p>
      <p>Location: {formData.userLocation}</p>
      <p>Name: {formData.userName}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
    </div>
  );
};

export default Step4;
