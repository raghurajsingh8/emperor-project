import React, { useState } from "react";
import BillCalculator from "./BillCalculator";

const Step1 = ({ onNext, updateFormData }) => {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleChoice = (choice) => {
    if (choice === "no") {
      updateFormData({ knowsBill: false });
      setShowCalculator(true);
    } else {
      updateFormData({ knowsBill: true });
      onNext();
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      margin: "0 auto",
      maxWidth: "600px",
      height: "100vh",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#4caf50",
      color: "#fff",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    calculatorWrapper: {
      marginTop: "20px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Do you know your electricity bill?</h2>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => handleChoice("yes")}
        >
          Yes
        </button>
        <button
          style={styles.button}
          onClick={() => handleChoice("no")}
        >
          Calculate Here
        </button>
      </div>
      {showCalculator && (
        <div style={styles.calculatorWrapper}>
          <BillCalculator />
        </div>
      )}
    </div>
  );
};

export default Step1;
