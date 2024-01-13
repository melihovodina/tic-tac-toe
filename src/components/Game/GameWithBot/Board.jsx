import React, { useState, useEffect } from 'react';
import Square from './Square';
import CalcWinner from '../CalcWinner';
import '../game.css'

const Board = ({ xIsNext, squares, onPlay }) => {
  const [clickedSquares, setClickedSquares] = useState(Array(9).fill(false));
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (!xIsNext && !CalcWinner(squares) && squares.includes(null)) {
      const emptySquares = squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
      const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      setTimeout(() => handleClick(randomSquare), 500);
    }
    const name = localStorage.getItem('currentUserName');
    setPlayerName(name);
  }, [squares, xIsNext]);

  function handleClick(i) {
    if (CalcWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
    const nextClickedSquares = clickedSquares.slice();
    nextClickedSquares[i] = true;
    setClickedSquares(nextClickedSquares);
  }

  const winner = CalcWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + (winner === 'X' ? playerName : 'Bot');
    
  } else if (squares.every(square => square !== null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? playerName : 'Bot');
  }

  return (
    <>
      <div className="status"><h1>{status}</h1></div>
      <div className="board-row">
        <Square value={squares[0]} clicked={clickedSquares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} clicked={clickedSquares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} clicked={clickedSquares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} clicked={clickedSquares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} clicked={clickedSquares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} clicked={clickedSquares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} clicked={clickedSquares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} clicked={clickedSquares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} clicked={clickedSquares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default Board;
