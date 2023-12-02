import React, { useState, useEffect } from 'react';
import axios from "axios";
import './join_result.css'
import { useLocation, useNavigate } from 'react-router-dom';

const JoinResult = (props) => {
  
const location = useLocation();
console.log(location);


const callApi = async () => {
  try {
    const res = await axios.post("/api/join_result", { location },
     { "Content-Type": "application/json", withCredentials: true });
    console.log(res);
    //resopense = res.data;
  } catch (error) {
    console.error('Error in API call:', error);
  }
};

useEffect(() => {
  callApi();
}, []); // Include capturedName in the dependency array*/

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="join-result-container">
      <span className="join-result-text">Let&apos;s Teaming!</span>
      <span className="join-result-text1">
      hi {location.state.Uname}
      </span>
      <button type="button" className="join-result-button button" onClick={handleLogin}>
        <span>
          <span>로그인하러 가기</span>
          <br></br>
        </span>
      </button>
    </div>
  )
}

export default JoinResult


/*import React, { useState, useEffect } from 'react';
import axios from "axios";
import './join_result.css'
import { useLocation, useNavigate } from 'react-router-dom';




const JoinResult = (props) => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="join-result-container">
      <span className="join-result-text">Let&apos;s Teaming!</span>
      <span className="join-result-text1">
        환영합니다 : )  이제 팀을 찾아보세요!
      </span>
      <button type="button" className="join-result-button button" onClick={handleLogin}>
        <span>
          <span>로그인하러 가기</span>
          <br></br>
        </span>
      </button>
    </div>
  )
}

export default JoinResult*/