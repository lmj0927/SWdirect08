import axios from "axios";
import React, { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [Email, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();

  const callApi = async () => {
    try {
      const requestBody = {Email, Password};
      const response = await axios.post("/api/login",  requestBody , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.status);
      setResponseData(response.data);

    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const handleLogin = async () => {
    try {
      
      callApi();

      navigate('/home');

    } catch (error) {
      console.error('Error during login:', error);
    }
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
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="login-button button" onClick={handleLogin}>
            Login
          </button>
          <input
          type="password"
          id="password"
          className="login-textinput1 input"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
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
