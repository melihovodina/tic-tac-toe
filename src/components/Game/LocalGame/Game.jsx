import React, { useState } from 'react';
import Board from './Board';
import '../game.css'
import NavBar from '../../Menu/Menu';
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move ' + move;
    } else {
      description = 'Restart game';
    }
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

export default Game