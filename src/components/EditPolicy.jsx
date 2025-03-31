import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/styles.css";


function EditPolicy() {
  const { id } = useParams(); // Get policy ID from the URL
  const navigate = useNavigate();

  // State to store policy data
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [error, setError] = useState("");

  // State for search and filter functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [policies, setPolicies] = useState([]); // Stores the list of policies

  // Fetch existing policy details when component loads
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/policies/${id}`)
      .then((response) => {
        const policy = response.data;
        setPolicyNumber(policy.policy_number);
        setCustomerName(policy.customer_name);
        setPolicyType(policy.policy_type);
        setPremiumAmount(policy.premium_amount);
      })
      .catch(() => setError("Error fetching policy details"));
  }, [id]);

  // Fetch all policies for search and filter functionality
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/policies")
      .then((response) => setPolicies(response.data))
      .catch(() => setError("Error fetching policies"));
  }, []);

  // Handle form submission for updating policy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!policyNumber || !customerName || !policyType || !premiumAmount) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:5000/policies/${id}`, {
        policy_number: policyNumber,
        customer_name: customerName,
        policy_type: policyType,
        premium_amount: parseFloat(premiumAmount),
      });
      alert("Policy updated successfully!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError("Error updating policy. Please try again.");
    }
  };

  // Function to filter policies based on search input and selected type
  const filteredPolicies = policies.filter((policy) => {
    return (
      (policy.policy_number.includes(searchQuery) ||
        policy.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.policy_type.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType === "" || policy.policy_type.toLowerCase() === filterType.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Edit Policy</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Policy Number:</label>
        <input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} required />

        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

        <label>Policy Type:</label>
        <input type="text" value={policyType} onChange={(e) => setPolicyType(e.target.value)} required />

        <label>Premium Amount:</label>
        <input type="number" value={premiumAmount} onChange={(e) => setPremiumAmount(e.target.value)} required />

        <button type="submit">Update Policy</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>

      {/* Search and filter functionality */}
      <h2>Search and Filter Policies</h2>
      <input
        type="text"
        placeholder="Search by policy number, customer name, or type"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Health">Health</option>
        <option value="Life">Life</option>
        <option value="Auto">Auto</option>
      </select>

      {/* Display filtered policies */}
      <table border="1">
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Customer Name</th>
            <th>Policy Type</th>
            <th>Premium Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPolicies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.policy_number}</td>
              <td>{policy.customer_name}</td>
              <td>{policy.policy_type}</td>
              <td>{policy.premium_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditPolicy;
