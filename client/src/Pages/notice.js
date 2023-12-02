import React from 'react'
import axios from "axios";
import './notice.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notice = (props) => {
  const navigate = useNavigate();
  
    const handleLogout = () => {
      navigate('/');
    };
    const handleHome = () => {
      navigate('/home');
    };
    const handleSearchResume = () => {
      navigate('/searchResume');
    };
    const handleSearchNotice = () => {
      navigate('/searchNotice');
    };

    const [Title, setTitle] = useState("");
    const [Project, setProject] = useState("");
    const [Role, setRole] = useState("");
    const [Member, setMember] = useState("");
    const [Skill, setSkill] = useState("");
    const [Introduction, setIntroduction] = useState("");
    const [Period, setPeriod] = useState("");
    const [responseData, setResponseData] = useState(null);


  const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
  const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);

  const handleResumeEnter = () => {
    // setShowAdditionalButtons(true);
    setShowAdditionalResumeButtons((prev) => !prev);
  };

  const handleResumeView = () => {
    navigate('/selectedResume')
    console.log('View clicked');
  };

  const handleResumeRegister = () => {
    navigate('/resume')
    console.log('Register clicked');
  };

  const handleResumeEdit = () => {
    navigate('/resume')
    console.log('Edit clicked');
  };

  const handleNoticeEnter = () => {
    // setShowAdditionalButtons(true);
    setShowAdditionalNoticeButtons((prev) => !prev);
  };

  const handleNoticeView = () => {
    navigate('/selectedNotice')
    console.log('View clicked');
  };

  const handleNoticeRegister = () => {
    navigate('/notice')
    console.log('Register clicked');
  };

  const handleNoticeEdit = () => {
    navigate('/notice')
    console.log('Edit clicked');
  };

  const callApi = async () => {
    try {
      const requestBody = {Title, Project, Role, Member, Skill, Introduction, Period};
      const response = await axios.post("/api/board/write",  requestBody , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log(response.status);
      setResponseData(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const handleRegister = () => {
    try {
      
      callApi();

    } catch (error) {
      console.error('Error during login:', error);
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
        value={Role}
        onChange={(e) => setRole(e.target.value)}>
          <option value="기획" selected>
            기획
          </option>
          <option value="개발">개발</option>
          <option value="디자인">디자인</option>
          <option value="문서 작성">문서 작성</option>
          <option value="마케팅">마케팅</option>
          <option value="기타">기타</option>
        </select>
        <select className="notice-select1"
        value={Project}
        onChange={(e) => setProject(e.target.value)}>
          <option value="Project1" selected>
            교내 수업
          </option>
          <option value="Project2">공모전</option>
          <option value="Project3">교내 대회</option>
          <option value="Project4">외부 대회</option>
          <option value="Project5">스터디</option>
        </select>
        <span className="notice-text05">
          <span>Project</span>
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
          value={Introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
        <span className="notice-text11">
          <span>Introduction</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="요구하는 역량을 작성해주세요"
          className="notice-textinput1 input"
          value={Skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <input
          type="text"
          placeholder="공고 제목을 작성해주세요"
          className="notice-textinput2 input"
          value={Title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <span className="notice-text14">
          <span>Required</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="인원 수"
          className="notice-textinput3 input"
          value={Member}
        onChange={(e) => setMember(e.target.value)}
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
          placeholder="활동 기간"
          enctype="활동 기간"
          className="notice-textinput4 input"
          value={Period}
        onChange={(e) => setPeriod(e.target.value)}
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

      {showAdditionalResumeButtons && (
        <div>
          <button type="button" className="resume-view button" onClick={handleResumeView}>
            보기
          </button>
          <button type="button" className="resume-register button" onClick={handleResumeRegister}>
            등록
          </button>
          <button type="button" className="resume-edit button" onClick={handleResumeEdit}>
            수정
          </button>
        </div>
      )}

      <button type="button" className="notice-button6 button" onClick={handleNoticeEnter}>
        <span className="notice-text44">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>

      {showAdditionalNoticeButtons && (
        <div>
          <button type="button" className="notice-view button" onClick={handleNoticeView}>
            보기
          </button>
          <button type="button" className="notice-register button" onClick={handleNoticeRegister}>
            등록
          </button>
          <button type="button" className="notice-edit button" onClick={handleNoticeEdit}>
            수정
          </button>
        </div>
      )}
    </div>
  )
}

export default Notice
