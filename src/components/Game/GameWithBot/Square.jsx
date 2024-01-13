import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import MyCross from '../../UI/MyCross/MyCross'
import MyCircle from '../../UI/MyCircle/MyCircle'
import '../game.css'
function Square({ value, clicked, onSquareClick }) {
  const handleClick = () => {
    onSquareClick();
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={400}
      classNames="square"
    >
      <button className={`square ${value} ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
        {value === 'X' ? <MyCross /> : value === 'O' ? <MyCircle /> : null}
      </button>
    </CSSTransition>
  );
}

export default Square;
