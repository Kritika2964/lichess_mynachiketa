import React, { useState } from 'react';

function UserProfile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`https://lichess.org/api/user/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProfile(null);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        placeholder="Enter Lichess username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Get Profile</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profile && (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
          <h3>{profile.username}</h3>
          {profile.profile?.bio && <p>Bio: {profile.profile.bio}</p>}
          <p>Number of Games Played: {profile.count?.all || 'N/A'}</p>
          <h4>Ratings:</h4>
          <ul>
            <li>Blitz: {profile.perfs?.blitz?.rating || 'N/A'}</li>
            <li>Bullet: {profile.perfs?.bullet?.rating || 'N/A'}</li>
            <li>Classical: {profile.perfs?.classical?.rating || 'N/A'}</li>
            <li>Rapid: {profile.perfs?.rapid?.rating || 'N/A'}</li>
          </ul>
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
