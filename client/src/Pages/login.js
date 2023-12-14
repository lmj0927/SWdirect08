import axios from "axios";
import React, { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
 
const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const callApi = async () => {
    try {
      const requestBody = {email, password};
      const response = await axios.post("/api/login_process",  requestBody , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
     
     if(response.data.code == 202) {
      console.log(response.data);
      navigate('/home', {state: email}); }
      else console.log(response.data.reason)

    } catch (error) {
      console.error('Error in API call:', error);
    }

  };


  const handleHome = () => {
    callApi();
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
          id="email"
          className="login-textinput input"
          placeholder="ID"
          value={email}
          onChange={(e) => setEmail
        (e.target.value)}
          />
          <button type="button" className="login-button button" onClick={ handleHome }>
            Login
          </button>
          <input
          type="password"
          id="password"
          className="login-textinput1 input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="login-button1 button" onClick={ handleJoin }>
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
