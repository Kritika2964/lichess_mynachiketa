import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://lichess.org/api/player/top/10/blitz');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        console.log(data); // Inspect the structure of data here

        // Access the "users" array inside the response object
        setPlayers(data.users || []); 
        setError(null);
      } catch (err) {
        setError(err.message);
        setPlayers([]);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard (Top 10 Blitz Players)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(players) && players.length > 0 ? (
            players.map((player, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.username}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.title || 'None'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.perfs?.blitz?.rating || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>No players found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
