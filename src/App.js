import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddPolicy from "./components/AddPolicy";
import EditPolicy from "./components/EditPolicy";
import "./styles/styles.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddPolicy />} />
        <Route path="/edit/:id" element={<EditPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
