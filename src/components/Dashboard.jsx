import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/styles.css";


function Dashboard() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/policies").then((response) => {
      setPolicies(response.data);
    });
  }, []);

  const deletePolicy = (id) => {
    axios.delete(`http://127.0.0.1:5000/policies/${id}`).then(() => {
      setPolicies(policies.filter((policy) => policy.id !== id));
    });
  };

  return (
    <div>
      <h1>Insurance Policies</h1>
      <Link to="/add">Add Policy</Link>
      <table>
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Customer Name</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.policy_number}</td>
              <td>{policy.customer_name}</td>
              <td>{policy.policy_type}</td>
              <td>{policy.premium_amount}</td>
              <td>
                <Link to={`/edit/${policy.id}`}>Edit</Link>
                <button onClick={() => deletePolicy(policy.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
