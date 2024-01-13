import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='navbar'>
      <div className='navbar_buttons'>
        <button className={`navbar_button ${location.pathname === '/sign-in' ? 'active' : ''}`} onClick={() => navigate('/sign-in')}>
            Exit
        </button>
        <h1 className='navbar_head'>Tic-Tac-Toe</h1>
        <button className={`navbar_button ${location.pathname === '/local-game' ? 'active' : ''}`} onClick={() => navigate('/local-game')}>
          Local game
        </button>
        <button className={`navbar_button ${location.pathname === '/bot-game' ? 'active' : ''}`} onClick={() => navigate('/bot-game')}>
          Game with bot
        </button>
        <button className={`navbar_button ${location.pathname === '/scoreboard' ? 'active' : ''}`} onClick={() => navigate('/scoreboard')}>
          Scoreboard
        </button>
      </div>
    </div>
  );
};

export default NavBar;
