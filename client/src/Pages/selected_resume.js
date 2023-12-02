import React from 'react'

import './selected_resume.css'
import { useNavigate } from 'react-router-dom';

const SelectedResume = (props) => {
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
    const handleResume = () => {
      navigate('/resume');
    };
    const handleNotice = () => {
      navigate('/notice');
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
      <button type="button" className="selected-resume-button4 button" onClick={handleResume}>
        <span className="selected-resume-text11">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-resume-button5 button" onClick={handleNotice}>
        <span className="selected-resume-text14">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="selected-resume-form1">
        <span className="selected-resume-text17">
          <span>Role</span>
          <br></br>
        </span>
        <span className="selected-resume-text20">
          <span>Project</span>
          <br></br>
        </span>
        <span className="selected-resume-text23">
          <span>(Project)</span>
          <br></br>
        </span>
        <span className="selected-resume-text26">
          <span>Skills</span>
          <br></br>
        </span>
        <span className="selected-resume-text29">
          <span>Introduction</span>
          <br></br>
        </span>
        <span className="selected-resume-text32">
          <span>(Skills)</span>
          <br></br>
        </span>
        <span className="selected-resume-text35">
          <span>Resume</span>
          <br></br>
        </span>
        <span className="selected-resume-text38">
          <span>(Role)</span>
          <br></br>
        </span>
        <button type="button" className="selected-resume-button6 button">
          <span className="selected-resume-text41">
            <span>참가 제안</span>
            <br></br>
          </span>
        </button>
        <span className="selected-resume-text44">
          <span>(Introduction)</span>
          <br></br>
        </span>
      </form>
    </div>
  )
}

export default SelectedResume
