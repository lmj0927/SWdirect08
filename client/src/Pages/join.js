import axios from "axios";
import React, { useState, useEffect } from 'react';
import './join.css'
import { useNavigate } from 'react-router-dom';

const Join = (props) => {

const [Uname, setName] = useState("");
const [responseData, setResponseData] = useState(null);
// New state to store server response data


const callApi = async()=>{
  try {
    const response = await axios.get("/api/join");
    setResponseData(response.data.test); // Set the response data to the state
    

  } catch (error) {
    console.error("Error fetching data:", error);
  }

};

useEffect(()=>{
    callApi();
    
}, []);




const navigate = useNavigate();

const handleJoinResult = () => {

  console.log(responseData);
  //const capturedName = Uname;
  //navigate('/joinResult', { state: { Uname: setName } });
  navigate('/joinResult', { state: { Uname }});
    //navigate('/joinResult');
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
        <input
          type="text"
          id="name"
          className="join-textinput input"
          value={Uname}
          onChange={(e) => setName(e.target.value)}
        />
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
      {responseData && (
        <div className="server-response-container">
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>)}
    </div>
  )
}

export default Join

/*import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import './join.css'
import { useNavigate } from 'react-router-dom';

const Join = (props) => {

  const callApi = async()=>{
    axios.get("/api/join").then((res)=>{console.log(res.data.test)});
  };

  useEffect(()=>{
    callApi();
  }, []);

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

export default Join*/