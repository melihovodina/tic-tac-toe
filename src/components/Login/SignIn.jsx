import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { ref, get, orderByChild, equalTo, query } from 'firebase/database';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { CgSpinner } from 'react-icons/cg'; 
import './login.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (loading) return;
  
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(code);
        console.log(result.user);
        localStorage.setItem('currentUserName', name); // Сохраните имя пользователя в localStorage
        navigate('/bot-game', { state: { userName: name } }); // Передайте имя пользователя как состояние
      } catch (error) {
        console.error('Error confirming code:', error);
      }
    } else {
      try {
        const userRef = ref(db, 'users');
        const snapshot = await get(query(userRef, orderByChild('name'), equalTo(name)));

        if (!snapshot.exists()) {
          alert('Пользователь не найден');
          return;
        }

        const userData = Object.values(snapshot.val())[0];

        if (userData.password !== password) {
          alert('Неверный пароль');
          return;
        }

        setLoading(true);

        setTimeout(async () => {
          const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);
          const confirmation = await signInWithPhoneNumber(auth, userData.phone, recaptchaVerifier);

          setConfirmationResult(confirmation);
          setLoading(false);
        }, 1000); 
      } catch (error) {
        console.error('Error signing in:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className='login'>
      <h1 className='login_head'>Sign in</h1>
      <form className='login_form' onSubmit={handleSubmit}>
        {!confirmationResult ? (
          <>
            <div className={`validate-input ${!initialRender && loading ? 'fadeOut' : 'fadeIn'}`}>
              <input type="text" className="main-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <span className="focus-main-input"></span>
            </div>
            <div className={`validate-input ${!initialRender && loading ? 'fadeOut' : 'fadeIn'}`}>
              <input type="password" className="main-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="focus-main-input"></span>
            </div>
          </>
        ) : (
          <div className={`validate-input ${!initialRender && loading ? 'fadeOut' : 'fadeIn'}`}>
            <input type="text" className="main-input" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
            <span className="focus-main-input"></span>
          </div>
        )}
        {loading ? (
          <CgSpinner size={20} className="spinner fadeIn"/> // Используйте CgSpinner вместо span
        ) : (
          <button className={`login_button ${!initialRender && loading ? 'fadeOut' : 'fadeIn'}`}>
            <p>{confirmationResult ? 'Confirm' : 'Sign in'}</p>
          </button>
        )}
      </form>
      <div id="recaptcha-container"></div>
      <p>Dont have an account?</p> <a className='link' onClick={() => navigate('/sign-up')}> Sign up</a>
    </div>
  );
};

export default SignIn;
