import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="user-avatar">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>You have successfully logged into your account</p>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <div className="info-item">
              <ion-icon name="person-outline"></ion-icon>
              <div>
                <label>Full Name</label>
                <span>{user?.name}</span>
              </div>
            </div>
            
            <div className="info-item">
              <ion-icon name="mail-outline"></ion-icon>
              <div>
                <label>Email Address</label>
                <span>{user?.email}</span>
              </div>
            </div>
            
            <div className="info-item">
              <ion-icon name="calendar-outline"></ion-icon>
              <div>
                <label>Member Since</label>
                <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-actions">
            <button className="action-button">
              <ion-icon name="settings-outline"></ion-icon>
              Account Settings
            </button>
            <button className="action-button">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              Security
            </button>
            <button className="action-button">
              <ion-icon name="help-circle-outline"></ion-icon>
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;