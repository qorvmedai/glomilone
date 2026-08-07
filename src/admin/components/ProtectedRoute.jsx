import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RiLoader4Line } from 'react-icons/ri';
import '../admin.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-root admin-loading-screen">
        <div className="admin-loading-card">
          <img src="/assets/logo.png" alt="GLOMILONE" className="admin-loading-logo" />
          <RiLoader4Line className="admin-spinner spin" />
          <p className="admin-loading-text">Authenticating Admin Access…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
