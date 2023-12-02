import axios from "axios";
import React, { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [username, setusername] = useState("");
  const [pwd, setpwd] = useState("");
  //const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();
  
  const callApi = async () => {
    try {
      const requestBody = {username, pwd};
      const response = await axios.post("/api/login_process",  requestBody , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      //await console.log(response.data);
      //console.log(response.data);
      //setResponseData(response.data);
     if(response.data.code == 200) navigate('/home');
    //  navigate('/home');
     //navigate('/home');

    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  /*const handleHome = () => {

    callApi();
    console.log(responseData);
    //if(responseData.state == "yse")
    navigate('/home');
    //else navigate('/join');

  };*/

  const handleHome = () => {
    callApi();
    navigate('/home');
    /*await callApi();
    if (responseData && responseData.state === "yes") {
      navigate('/home');
    } else {
      navigate('/join');
    }*/
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
          value={username}
          onChange={(e) => setusername(e.target.value)}
          />
          <button type="button" className="login-button button" onClick={ handleHome  }>
            Login
          </button>
          <input
          type="password"
          id="password"
          className="login-textinput1 input"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setpwd(e.target.value)}
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
