import React from 'react'

import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };
  return (
    <div className="login-container">
      <div className="login-login">
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1ed0d881-45f8-4ff2-ab98-c412c553a50d/ea6e98f4-e3c0-4564-9664-f3751863c6ba?org_if_sml=12383&amp;force_format=original"
          alt="Rectangle64260"
          className="login-rectangle64"
        />
        <span className="login-text">
          <span>LOGIN</span>
        </span>
        <span className="login-text2">
          <span>Teaming</span>
        </span>
        <span className="login-text4">효율적인 팀 매칭 서비스</span>
        <button type="submit" className="login-button button" onClick={handleLogin}>
          Login
        </button>
        <input type="text" placeholder="ID" className="login-textinput input" />
        <input
          type="password"
          placeholder="Password"
          className="login-textinput1 input"
        />
        <button type="submit" className="login-button1 button">
          <span>
            <span>Join</span>
            <br></br>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Login
