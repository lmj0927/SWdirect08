import React from 'react'
import axios from 'axios'
import './selected_notice.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SelectedNotice = (props) => {
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

  const handleSelectNotice = () => {
    navigate('/selectedNotice');
  };
  const handleNoticeResult = () => {
    navigate('/noticeResult');
  };
  const [responseTitle, setResponseTitle] = useState("");
  const [responseProject, setResponseProject] = useState("");
  const [responseRole, setResponseRole] = useState("");
  const [responseMember, setResponseMember] = useState("");
  const [responseSkill, setResponseSkill] = useState("");
  const [responseIntroduction, setResponseIntroduction] = useState("");
  const [responsePeriod, setResponsePeriod] = useState("");
  const [responseData, setResponseData] = useState(null);

  const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
  const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);

  const callApi = async()=>{
    try {
      const response = await axios.get("/api/selected_notice/");

      // console.log(response.data.major)
      setResponseTitle(response.data.title);
      setResponseRole(response.data.role);

      setResponseSkill(response.data.skill);
      
      setResponseMember(response.data.member);
      setResponseIntroduction(response.data.intro);
      setResponsePeriod(response.data.period);
      setResponseProject(response.data.project);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    callApi();
  }, []);

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
  return (
    <div className="selected-notice-container">
      <span className="selected-notice-text">Teaming</span>
      <span className="selected-notice-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="selected-notice-form"></form>
      <button type="button" className="selected-notice-button button" onClick={handleHome}>
        <span className="selected-notice-text02">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button2 button" onClick={handleSearchResume}>
        <span className="selected-notice-text08">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="selected-notice-button4 button" onClick={handleResumeEnter}>
        <span className="selected-notice-text11">
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

      <button type="button" className="selected-notice-button5 button" onClick={handleNoticeEnter}>
        <span className="selected-notice-text14">
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

      <form className="selected-notice-form1">
        <span className="selected-notice-text17">
          <span>Role</span>
          <br></br>
        </span>
        <span className="selected-notice-text20">
          <span>Project</span>
          <br></br>
        </span>
        <span className="selected-notice-text23">
          <span>Skills</span>
          <br></br>
        </span>
        <span className="selected-notice-text26">
          <span>Introduction</span>
          <br></br>
        </span>
        <span className="selected-notice-text29">
          <span>Required</span>
          <br></br>
        </span>
        <span className="selected-notice-text32">
          <span>members</span>
          <br></br>
        </span>
        <span className="selected-notice-text35">
          <span>Notice</span>
          <br></br>
        </span>
        <button type="button" className="selected-notice-button6 button">
          <span>
            <span>등록</span>
            <br></br>
          </span>
        </button>
        <span className="selected-notice-text41">
          <span>Title</span>
          <br></br>
        </span>
        <span className="selected-notice-text44">
          <span className="selected-notice-text45">Period</span>
          <br></br>
        </span>
        <span className="selected-notice-text47">{responseTitle}</span>
        <span className="selected-notice-text48">{responsePeriod}</span>
        <span className="selected-notice-text49">{responseProject}</span>
        <span className="selected-notice-text50">{responseRole}</span>
        <span className="selected-notice-text51">{responseMember}</span>
        <span className="selected-notice-text52">{responseSkill}</span>
        <span className="selected-notice-text53">{responseIntroduction}</span>
      </form>
    </div>
  )
}

export default SelectedNotice
