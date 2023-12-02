
import React, { useState, useEffect } from 'react';
import './selected_resume.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const SelectedResume = (props) => {

  const [responseMajor, setResponseMajor] = useState(null);
  const [responseRole, setResponseRole] = useState(null);
  const [responseSkill1, setResponseSkill1] = useState(null);
  const [responseSkill2, setResponseSkill2] = useState(null);
  const [responseSkill3, setResponseSkill3] = useState(null);

  const [responseLevel1, setResponseLevel1] = useState(null);
  const [responseLevel2, setResponseLevel2] = useState(null);
  const [responseLevel3, setResponseLevel3] = useState(null);

  const [responseIntro, setResponseIntro] = useState(null);

  const callApi = async()=>{
    try {
      const response = await axios.get("/api/selected_resume/");

      console.log(response.data.major)
      setResponseMajor(response.data.major);
      setResponseRole(response.data.role);

      setResponseSkill1(response.data.skill1);
      setResponseSkill2(response.data.skill2);
      setResponseSkill3(response.data.skill3);
      
      setResponseLevel1(response.data.level1);
      setResponseLevel2(response.data.level2);
      setResponseLevel3(response.data.level3);

      setResponseIntro(response.data.intro);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    callApi();
  }, []);

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
  return (
    <div className="selected-resume-container">
      <span className="selected-resume-text">Teaming</span>
      <span className="selected-resume-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="selected-resume-form"></form>
      <button type="button" className="selected-resume-button button" onClick={handleHome}>
        <span className="selected-resume-text02">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-resume-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-resume-button2 button" onClick={handleSearchResume}>
        <span className="selected-resume-text08">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-resume-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="selected-resume-button4 button" onClick={handleResumeEnter}>
        <span className="selected-resume-text11">
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

      <button type="button" className="selected-resume-button5 button" onClick={handleNoticeEnter}>
        <span className="selected-resume-text14">
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
      
      <form className="selected-resume-form1">
        <span className="selected-resume-text17">
          <span>Role: {responseRole} </span>
          <br></br>
        </span>
        <span className="selected-resume-text20">
          <span>Major: {responseMajor} </span>
          <br></br>
        </span>
        <span className="selected-resume-text23">
          <span className="selected-resume-text24">Skill 1: {responseSkill1}</span>
          <br></br>
        </span>
        <span className="selected-resume-text26">
          <span className="selected-resume-text27">Skill 2: {responseSkill2}</span>
          <br></br>
        </span>
        <span className="selected-resume-text29">
          <span>Introduction: {responseIntro}</span>
          <br></br>
        </span>
        <span className="selected-resume-text32">
          <span>Resume</span>
          <br></br>
        </span>
        <button type="button" className="selected-resume-button6 button">
          <span>
            <span>등록</span>
            <br></br>
          </span>
        </button>
        <span className="selected-resume-text38">
          <span>Level: {responseLevel1}</span>
          <br></br>
        </span>
        <span className="selected-resume-text41">
          <span>Level: {responseLevel2} </span>
          <br></br>
        </span>
        <span className="selected-resume-text44">
          <span className="selected-resume-text45">Skill 3: {responseSkill3}</span>
          <br></br>
        </span>
        <span className="selected-resume-text47">
          <span>Level: {responseLevel3}</span>
          <br></br>
        </span>
        <span className="selected-resume-text50"> </span>
        <span className="selected-resume-text51"> </span>
        <span className="selected-resume-text52"> </span>
        <span className="selected-resume-text53"> </span>
        <span className="selected-resume-text54"> </span>
        <span className="selected-resume-text55"> </span>
        <span className="selected-resume-text56"> </span>
        <span className="selected-resume-text57"> </span>
        <span className="selected-resume-text58"> </span>
      </form>
    </div>
  )
}

export default SelectedResume