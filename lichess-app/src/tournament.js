import React, { useState, useEffect } from 'react';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://lichess.org/api/tournament');
        if (!response.ok) {
          throw new Error('Failed to fetch tournament data');
        }
        const data = await response.json();
        console.log(data); // Log to inspect the data structure

        // Assuming the tournaments are inside "created"
        setTournaments(data.created || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTournaments([]);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
      <h2>Upcoming Tournaments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created By</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>System</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Minutes</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Players</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tournaments) && tournaments.length > 0 ? (
            tournaments.map((tournament, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tournament.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tournament.createdBy}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tournament.system}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tournament.minutes}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tournament.nbPlayers}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>No tournaments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tournaments;
