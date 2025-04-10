import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-details">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name?.charAt(0) || 'U'}{user.lastName?.charAt(0) || ''}
            </div>
            <h2>{user.name} {user.lastName}</h2>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            {/* Add more profile fields as needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default Profile;