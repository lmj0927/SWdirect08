import React from 'react'

import './notice.css'
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
    const handleResume = () => {
      navigate('/resume');
    };
    const handleNotice = () => {
      navigate('/notice');
    };
  return (
    <div className="notice-container">
      <span className="notice-text">Teaming</span>
      <span className="notice-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="notice-form"></form>
      <span className="notice-text02">
        <span>Role</span>
        <br></br>
      </span>
      <form className="notice-form1"></form>
      <button type="button" className="notice-button button" onClick={handleHome}>
        <span className="notice-text05">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button2 button" onClick={handleSearchResume}>
        <span className="notice-text11">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="notice-button4 button" onClick={handleResume}>
        <span className="notice-text14">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="notice-button5 button" onClick={handleNotice}>
        <span className="notice-text17">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <select className="notice-select">
        <option value="Role1" selected>
          기획
        </option>
        <option value="Role2">개발</option>
        <option value="Role3">디자인</option>
        <option value="Role4">문서 작성</option>
        <option value="Role5">마케팅</option>
        <option value="Role6">기타</option>
      </select>
      <select className="notice-select1">
        <option value="Project1" selected>
          교내 수업
        </option>
        <option value="Project2">공모전</option>
        <option value="Project3">교내 대회</option>
        <option value="Project4">외부 대회</option>
        <option value="Project5">스터디</option>
      </select>
      <span className="notice-text20">
        <span>Project</span>
        <br></br>
      </span>
      <span className="notice-text23">
        <span>Skills</span>
        <br></br>
      </span>
      <input
        type="text"
        placeholder="간단히 팀을 소개해주세요"
        className="notice-textinput input"
      />
      <span className="notice-text26">
        <span>Introduction</span>
        <br></br>
      </span>
      <input
        type="text"
        placeholder="요구하는 역량을 작성해주세요"
        className="notice-textinput1 input"
      />
      <span className="notice-text29">
        <span>Required</span>
        <br></br>
      </span>
      <input
        type="text"
        placeholder="인원 수"
        className="notice-textinput2 input"
      />
      <span className="notice-text32">
        <span>members</span>
        <br></br>
      </span>
    </div>
  )
}

export default Notice
