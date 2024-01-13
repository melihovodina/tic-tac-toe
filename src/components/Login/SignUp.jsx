import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, get, push, set, orderByChild, equalTo, query } from 'firebase/database';
import './login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = ref(db, 'users');
      const snapshot = await get(query(userRef, orderByChild('name'), equalTo(name)));
      if (snapshot.exists()) {
        alert('Имя пользователя уже зарегистрировано');
        return;
      }
      const newUserRef = push(userRef);
      set(newUserRef, { name, password, phone, score: { user: 0, bot: 0 }, streak: 0 });
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='login'>
      <h1 className='login_head'>Sign up</h1>
      <form className='login_form' onSubmit={handleSubmit}>
        <div className="validate-input">
          <input type="text" className="main-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <span className="focus-main-input"></span>
        </div>
        <div className="validate-input">
          <input type="password" className="main-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="focus-main-input"></span>
        </div>
        <div className="validate-input">
          <input type="text" className="main-input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <span className="focus-main-input"></span>
        </div>
        <button className='login_button'><p>Sign up</p></button>
      </form>
    </div>
  );
};

export default SignUp;
