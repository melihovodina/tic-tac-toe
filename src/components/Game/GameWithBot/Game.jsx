import React, { useState, useEffect } from 'react';
import Board from './Board';
import CalcWinner from '../CalcWinner';
import NavBar from '../../Menu/Menu';
import { db } from '../../../firebase';
import { ref, get, set } from 'firebase/database';

const Game2 = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('currentUserName');
    setPlayerName(name);
  }, [currentSquares, xIsNext]);

  const updateScore = async (winner) => {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const userId = Object.keys(usersData).find(key => usersData[key].name === playerName);

      if (userId) {
        const userData = usersData[userId];
        if (userData && userData.score) {
          if (winner) {
            userData.score[winner === 'X' ? 'user' : 'bot']++;
            if (winner === 'X') {
              userData.streak = (userData.streak || 0) + 1;
            }
          } else {
            userData.streak = 0;
          }
          const userRef = ref(db, 'users/' + userId);
          await set(userRef, userData);
        }
      }
    }
  };   

  useEffect(() => {
    const winner = CalcWinner(currentSquares);
    if (winner || !currentSquares.includes(null)) {
      updateScore(winner);
    }
  }, [currentSquares, playerName]);
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move ' + move : 'Restart game';
    return (
      <div className="history" key={move}>
        <button className="history-button" onClick={() => jumpTo(move)}><p>{description}</p></button>
      </div>
    );
  });

  return (
    <div className="game">
      <NavBar/>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <h1>History:</h1>
        {moves}
      </div>
    </div>
  );
}

export default Game2;
