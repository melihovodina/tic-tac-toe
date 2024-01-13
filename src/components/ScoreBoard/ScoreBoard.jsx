import React, { useEffect, useState } from 'react';
import './scoreBoard.css';
import '../../styles/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Menu/Menu';
import { db } from '../../firebase';
import { ref, get } from 'firebase/database';

const ScoreBoard = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('wins');
  const [activeButton, setActiveButton] = useState('wins');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const users = Object.values(snapshot.val());
        users.sort((a, b) => {
          if (sortBy === 'wins') {
            return b.score.user - a.score.user;
          } else if (sortBy === 'streak') {
            return b.streak - a.streak;
          }
        });
        setPlayers(users);
      }
    };

    fetchUsers();
  }, [sortBy]);

  const handleClick = (type) => {
    setSortBy(type);
    setActiveButton(type);
  }

  return (
    <div className='main'>
      <NavBar/>
      <div className='scoreboard'>
        <h1>ScoreBoard:</h1>
        <div className='score_buttons'>
          <button className={`score_button ${activeButton === 'wins' ? 'active' : ''}`} onClick={() => handleClick('wins')}>Wins</button>
          <button className={`score_button ${activeButton === 'streak' ? 'active' : ''}`} onClick={() => handleClick('streak')}>Streak</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Wins</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score ? player.score.user : 0}</td>
                <td>{player.streak || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreBoard;
