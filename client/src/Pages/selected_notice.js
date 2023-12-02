import React from 'react'

import './selected_notice.css'
import { useNavigate } from 'react-router-dom';

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
    const handleResume = () => {
      navigate('/resume');
    };
    const handleNotice = () => {
      navigate('/notice');
    };
  return (
    <div className="selected-notice-container">
      <span className="selected-notice-text">Teaming</span>
      <span className="selected-notice-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="selected-notice-form">
        <span className="selected-notice-text02">
          <span>Role</span>
          <br></br>
        </span>
        <span className="selected-notice-text05">
          <span>Project</span>
          <br></br>
        </span>
        <span className="selected-notice-text08">
          <span>Skills</span>
          <br></br>
        </span>
        <span className="selected-notice-text11">
          <span>Introduction</span>
          <br></br>
        </span>
        <span className="selected-notice-text14">
          <span>Required</span>
          <br></br>
        </span>
        <span className="selected-notice-text17">
          <span>members</span>
          <br></br>
        </span>
        <span className="selected-notice-text20">
          <span>Notice</span>
          <br></br>
        </span>
        <button type="button" className="selected-notice-button button">
          <span className="selected-notice-text23">
            <span>참가 신청</span>
            <br></br>
          </span>
        </button>
        <span className="selected-notice-text26">
          <span>(Project)</span>
          <br></br>
        </span>
        <span className="selected-notice-text29">
          <span>(Role)</span>
          <br></br>
        </span>
        <span className="selected-notice-text32">
          <span>(Num)</span>
          <br></br>
        </span>
        <span className="selected-notice-text35">
          <span>(Skills)</span>
          <br></br>
        </span>
        <span className="selected-notice-text38">
          <span>(Introduction)</span>
          <br></br>
        </span>
      </form>
      <form className="selected-notice-form1"></form>
      <button type="button" className="selected-notice-button1 button" onClick={handleHome}>
        <span className="selected-notice-text41">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button2 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button3 button" onClick={handleSearchResume}>
        <span className="selected-notice-text47">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button4 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="selected-notice-button5 button" onClick={handleResume}>
        <span className="selected-notice-text50">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button6 button" onClick={handleNotice}>
        <span className="selected-notice-text53">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
    </div>
  )
}

export default SelectedNotice
