import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/styles.css";


function AddPolicy() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!policyNumber || !customerName || !policyType || !premiumAmount) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/policies", {
        policy_number: policyNumber,
        customer_name: customerName,
        policy_type: policyType,
        premium_amount: parseFloat(premiumAmount),
      });
      alert("Policy added successfully!");
      navigate("/");
    } catch (err) {
      setError("Error adding policy. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add New Policy</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Policy Number:</label>
        <input
          type="text"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          required
        />

        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label>Policy Type:</label>
        <input
          type="text"
          value={policyType}
          onChange={(e) => setPolicyType(e.target.value)}
          required
        />

        <label>Premium Amount:</label>
        <input
          type="number"
          value={premiumAmount}
          onChange={(e) => setPremiumAmount(e.target.value)}
          required
        />

        <button type="submit">Add Policy</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

export default AddPolicy;
