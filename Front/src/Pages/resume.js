import React from 'react'

import './resume.css'
import { useNavigate } from 'react-router-dom';

const Resume = (props) => {
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
    <div className="resume-container">
      <span className="resume-text">Teaming</span>
      <span className="resume-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="resume-form"></form>
      <span className="resume-text02">
        <span>Role</span>
        <br></br>
      </span>
      <form className="resume-form1"></form>
      <button type="button" className="resume-button button" onClick={handleHome}>
        <span className="resume-text05">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button2 button" onClick={handleSearchResume}>
        <span className="resume-text11">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="resume-button4 button" onClick={handleResume}>
        <span className="resume-text14">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button5 button" onClick={handleNotice}>
        <span className="resume-text17">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <select className="resume-select">
        <option value="Role1">기획</option>
        <option value="Role2">개발</option>
        <option value="Role3">디자인</option>
        <option value="Role4">문서 작성</option>
        <option value="Role5">마케팅</option>
        <option value="Role6">기타</option>
      </select>
      <select className="resume-select1">
        <option value="Project1" selected>
          교내 수업
        </option>
        <option value="Project2">공모전</option>
        <option value="Project3">교내 대회</option>
        <option value="Project4">외부 대회</option>
        <option value="Project5">스터디</option>
      </select>
      <span className="resume-text20">
        <span>Project</span>
        <br></br>
      </span>
      <span className="resume-text23">
        <span>Skills</span>
        <br></br>
      </span>
      <input
        type="text"
        placeholder="간단히 본인을 소개해주세요"
        className="resume-textinput input"
      />
      <span className="resume-text26">
        <span>Introduction</span>
        <br></br>
      </span>
      <input
        type="text"
        placeholder="본인의 역량을 작성해주세요"
        className="resume-textinput1 input"
      />
    </div>
  )
}

export default Resume
