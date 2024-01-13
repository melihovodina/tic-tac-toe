import React from 'react'
import AppRouter from './components/AppRouter';
import {BrowserRouter} from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppRouter/>
      </div>
    </BrowserRouter> 
 )
}

export default App