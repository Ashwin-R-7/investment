import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import StockDashboard from './components/StockDashboard';
import PaymentPage from './components/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/styles.css';  // Adjust to point to the correct path if styles.css is in src/styles/


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<StockDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
