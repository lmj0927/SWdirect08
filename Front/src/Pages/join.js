import React from 'react'

import './join.css'
import { useNavigate } from 'react-router-dom';

const Join = (props) => {

  const navigate = useNavigate();

  const handleJoinResult = () => {
    navigate('/joinResult');
  };
  return (
    <div className="join-container">
      <span className="join-text">Teaming</span>
      <span className="join-text01">효율적인 팀 매칭 서비스</span>
      <form className="join-form">
        <span className="join-text02">
          <span>회원 가입</span>
          <br></br>
        </span>
        <span className="join-text05">
          <span>* 이름</span>
          <br></br>
        </span>
        <span className="join-text08">
          <span>* 비밀번호</span>
          <br></br>
        </span>
        <span className="join-text11">
          <span>* 이메일</span>
          <br></br>
          <br></br>
        </span>
        <span className="join-text15">
          <span>* 비밀번호 확인</span>
          <br></br>
        </span>
        <input type="text" className="join-textinput input" />
        <input type="text" className="join-textinput1 input" />
        <input type="password" className="join-textinput2 input" />
        <input type="password" className="join-textinput3 input" />
        <span className="join-text18">
          <span>
            이용 약관 개인 정보 수집 및 이용, 마케팅 활용에 동의합니다. 
          </span>
          <br></br>
        </span>
        <input type="checkbox" className="join-checkbox" />
        <button type="button" className="join-button button" onClick={handleJoinResult}>
          가입하기
        </button>
      </form>
    </div>
  )
}

export default Join
