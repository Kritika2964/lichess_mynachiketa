import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './profile.js';
import Leaderboard from './learderboards.js';
import Tournaments from './tournament.js';

function App() {
  return (
    <Router>
      <div>
        <h1>Lichess Web Application</h1>
        <nav>
          <ul>
            <li><Link to="/user">User Profile</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/tournaments">Tournaments</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
