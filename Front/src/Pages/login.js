import React from 'react'

import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };
  const handleJoin = () => {
    navigate('/join');
  };
  return (
    <div className="login-container">
      <div className="login-login">
        <form className="login-form">
          <span className="login-text">
            <span>LOGIN</span>
          </span>
          <input
            type="text"
            placeholder="ID"
            className="login-textinput input"
          />
          <button type="submit" className="login-button button" onClick={handleLogin}>
            Login
          </button>
          <input
            type="password"
            placeholder="Password"
            className="login-textinput1 input"
          />
          <button type="submit" className="login-button1 button" onClick={handleJoin}>
            <span>
              <span>Join</span>
              <br></br>
            </span>
          </button>
        </form>
        <span className="login-text5">
          <span>Teaming</span>
        </span>
        <span className="login-text7">효율적인 팀 매칭 서비스</span>
      </div>
    </div>
  )
}

export default Login
