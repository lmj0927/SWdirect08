import React from 'react'
import axios from "axios";
import './modify_notice.css'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModifyNotice = (props) => {

/* location.state[0] -> wid, location.state[1] -> email */
  const navigate = useNavigate();
  const location = useLocation();
  
    const [title, settitle] = useState("");
    const [projtype, setprojtype] = useState("");
    const [role, setrole] = useState("");
    const [membernum, setmembernum] = useState("");
    const [skills, setskills] = useState("");
    const [intro, setintro] = useState("");
    const [period, setperiod] = useState("");
    const [responseData, setResponseData] = useState(null);

    const callApi = async () => {
      try {
        
        var wid = location.state[0];
        const requestBody = {wid, title, projtype, role, 
          membernum: parseInt(membernum, 10),
          period: parseInt(period, 10),
         skills, intro};
  
        const response = await axios.post("/api/modify_notice",  requestBody , {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      
        if(response.data.code == 202 ) navigate('/mynotices', {state: location.state[1]});
        else console.log(response.data.reason)
        } catch (error) {
          console.error('Error in API call:', error);
        }
        
    };

    const callApi2 = async()=>{
      try {
        var uemail = location.state[1];
        const response = await axios.get("/api/hasresume",{params: {email: uemail}},
        { withCredentials: true } );

        if(response.data == 0) //이력서 최초 등록 안했으면
        {navigate('/resume', {state: location.state[1]});} //이력서 등록하러 가기
        else {navigate('/selectedResume', {state:location.state[1]});} //이력서 등록한 유저면 본인꺼 바로 보기

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  const handleLogout = () => {
    navigate('/');
  };
  const handleHome = () => {
    navigate('/home', {state: location.state[1]});
  };
  const handleSearchResume = () => {
    navigate('/searchResume', {state: location.state[1]});
  };
  const handleSearchNotice = () => {
    navigate('/searchNotice', {state: location.state[1]});
  };

  const handleResumeEnter = () => {
    callApi2();
  };

  const handleNoticeEnter = () => {
    navigate('/mynotices', {state: location.state[1]});
  };

  const handleRegister = () => {
    try {
      callApi();
    } catch (error) {
      console.error('모집 공고 업데이트 에러', error);
    }
  };

  return (
    <div className="notice-container">
      <span className="notice-text">Teaming</span>
      <span className="notice-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="notice-form">
        <span className="notice-text02">
          <span>Role</span>
          <br></br>
        </span>
        <select className="notice-select"
        value={role}
        onChange={(e) => setrole(e.target.value)}>
          <option value="null" selected>
            None
          </option>
          <option value="기획">기획</option>
          <option value="개발">개발</option>
          <option value="디자인">디자인</option>
          <option value="문서 작성">문서 작성</option>
          <option value="마케팅">마케팅</option>
          <option value="기타">기타</option>
        </select>
        <select className="notice-select1"
        value={projtype}
        onChange={(e) => setprojtype(e.target.value)}>
          <option value="null" selected>
            None
          </option>
          <option value="교내 수업">교내 수업</option>
          <option value="교내 대회">교내 대회</option>
          <option value="공모전">공모전</option>
          <option value="스터디">스터디</option>
        </select>
        <span className="notice-text05">
          <span>Category</span>
          <br></br>
        </span>
        <span className="notice-text08">
          <span>Skills</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="간단히 팀을 소개해주세요"
          className="notice-textinput input"
          value={intro}
          onChange={(e) => setintro(e.target.value)}
        />
        <span className="notice-text11">
          <span>Introduction</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="요구하는 역량을 작성해주세요"
          className="notice-textinput1 input"
          value={skills}
          onChange={(e) => setskills(e.target.value)}
        />
        <input
          type="text"
          placeholder="공고 제목을 작성해주세요"
          className="notice-textinput2 input"
          value={title}
        onChange={(e) => settitle(e.target.value)}
        />
        <span className="notice-text14">
          <span>Required</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="인원 수"
          className="notice-textinput3 input"
          value={membernum}
        onChange={(e) => setmembernum(e.target.value)}
        />
        <span className="notice-text17">
          <span>members</span>
          <br></br>
        </span>
        <span className="notice-text20">
          <span>Notice</span>
          <br></br>
        </span>
        <button type="button" className="notice-button button" onClick={handleRegister}>
          <span>
            <span>등록</span>
            <br></br>
          </span>
        </button>
        <span className="notice-text26">
          <span>Title</span>
          <br></br>
        </span>
        <span className="notice-text29">
          <span className="notice-text30">Period</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="활동 기간(개월 수)"
          enctype="활동 기간"
          className="notice-textinput4 input"
          value={period}
        onChange={(e) => setperiod(e.target.value)}
        />
      </form>
      <form className="notice-form1"></form>
      <button type="button" className="notice-button1 button" onClick={handleHome}>
        <span className="notice-text32">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button2 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button3 button" onClick={handleSearchResume}>
        <span className="notice-text38">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button4 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="notice-button5 button" onClick={handleResumeEnter}>
        <span className="notice-text41">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button6 button" onClick={handleNoticeEnter}>
        <span className="notice-text44">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
    </div>
  )
}

export default ModifyNotice