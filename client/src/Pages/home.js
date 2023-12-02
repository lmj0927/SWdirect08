import React from 'react'

import './home.css'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
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
  const handleSelectResume = () => {
    navigate('/selectedResume');
  };
  const handleSelectNotice = () => {
    navigate('/selectedNotice');
  };
  return (
    <div className="home-container">
      <ul className="list"></ul>
      <form className="home-form"></form>
      <button type="button" className="home-button button" onClick={handleHome}>
        <span className="home-text">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <span className="home-text03">Teaming</span>
      <span className="home-text04">효율적인 팀 매칭 서비스</span>
      <button type="button" className="home-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <footer className="home-footer">
        <span className="home-text08">
          © 2023 Teaming, All Rights Reserved.
        </span>
      </footer>
      <h1 className="home-text09">
        <span>새로 등록된 이력서</span>
        <br></br>
      </h1>
      <h1 className="home-text12">
        <span>새로 등록된 모집 공고</span>
        <br></br>
      </h1>
      <button type="button" className="home-button2 button" onClick={handleSearchResume}>
        <span className="home-text15">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="home-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="home-button4 button" onClick={handleResume}>
        <span className="home-text18">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="home-button5 button" onClick={handleNotice}>
        <span className="home-text21">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="home-form1" onClick={handleSelectResume}>
        <span className="home-text24">Project</span>
        <span className="home-text25">Role</span>
        <span className="home-text26">Skills</span>
      </form>
      <form className="home-form2" onClick={handleSelectResume}>
        <span className="home-text27">Project</span>
        <span className="home-text28">Role</span>
        <span className="home-text29">Skills</span>
      </form>
      <form className="home-form3" onClick={handleSelectResume}>
        <span className="home-text30">Project</span>
        <span className="home-text31">Role</span>
        <span className="home-text32">Skills</span>
      </form>
      <form className="home-form4" onClick={handleSelectNotice}>
        <span className="home-text33">Project</span>
        <span className="home-text34">Role</span>
        <span className="home-text35">Skills</span>
      </form>
      <form className="home-form5" onClick={handleSelectNotice}>
        <span className="home-text36">Project</span>
        <span className="home-text37">Role</span>
        <span className="home-text38">Skills</span>
      </form>
      <form className="home-form6" onClick={handleSelectNotice}>
        <span className="home-text39">Project</span>
        <span className="home-text40">Role</span>
        <span className="home-text41">Skills</span>
      </form>
    </div>
  )
}

export default Home
