import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './myCross.css'

const MyCross = () => {
  return(
    <CSSTransition
      in={true}
      appear={true}
      timeout={600}
      classNames="cross"
    >
      <div className="cross"></div>
    </CSSTransition>
  )
}

export default MyCross;
