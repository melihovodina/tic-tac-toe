import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './myCircle.css'

const MyCircle = () => {
  return(
    <CSSTransition
      in={true}
      appear={true}
      timeout={600}
      classNames="circle"
    >
      <div className="circle"></div>
    </CSSTransition>
  )
}

export default MyCircle;
