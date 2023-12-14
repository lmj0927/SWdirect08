import React from 'react'
import './join_result.css'
import { useNavigate } from 'react-router-dom';

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

export default JoinResult

