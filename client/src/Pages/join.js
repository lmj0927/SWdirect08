import axios from "axios";
import React, { useState, useEffect } from 'react';
import './join.css'
import { useNavigate } from 'react-router-dom';


const Join = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [bdate, setBdate] = useState("");
  const [university, setUniversity] = useState("");

  const callApi = async () => {
    try {
      const requestBody = {email, password, password2, name, bdate, university};
      const response = await axios.post("/api/join_process",  requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if(response.data.code == 202) {
        console.log(response.data);
        navigate('/joinResult'); }
      else console.log(response.data.reaseon)

    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const navigate = useNavigate();

  const handleJoinResult = () => {
    callApi();
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

        <span className="join-birthday">
          <span>  생년월일</span>
          <br></br>
        </span>

        <span className="join-univ">
          <span>  학교</span>
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
        <input
          type="text"
          className="join-textinput input"
          value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="join-textinput1 input"
          value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type = "text"
          placeholder='Ex) 2000-08-23'
          className="join-birthdayinput input"
          value={bdate}
         onChange={(e) => setBdate(e.target.value)}
        />
        <input
          type = "text"
          placeholder='Ex) 아주'
          className="join-univinput input"
          value={university}
         onChange={(e) => setUniversity(e.target.value)}
        />
        <input
          type="password"
          className="join-textinput2 input"
          value={password2}
         onChange={(e) => setPassword2(e.target.value)}
        />
        <input
          type="text"
          className="join-textinput3 input"
          value={name}
         onChange={(e) => setName(e.target.value)}
        />
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
