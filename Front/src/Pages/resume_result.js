import React from 'react'

import './resume_result.css'
import { useNavigate } from 'react-router-dom';

const ResumeResult = (props) => {
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
  const handleResumeResult = () => {
    navigate('/resumeResult');
  };
  const handleNextPage = () => {
    navigate('/resumeResult');
  };
  const handlePrevPage = () => {
    navigate('/resumeResult');
  };
  return (
    <div className="resume-result-container">
      <span className="resume-result-text">Teaming</span>
      <span className="resume-result-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="resume-result-form"></form>
      <button type="button" className="resume-result-button button" onClick={handleHome}>
        <span className="resume-result-text02">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-result-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-result-button2 button" onClick={handleSearchResume}>
        <span className="resume-result-text08">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-result-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="resume-result-button4 button" onClick={handleResume}>
        <span className="resume-result-text11">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-result-button5 button" onClick={handleNotice}>
        <span className="resume-result-text14">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <input
        type="text"
        placeholder="이력서 키워드를 입력하세요"
        className="resume-result-textinput input"
      />
      <form className="resume-result-form1" onClick={handleSelectResume}>
        <span className="resume-result-text17">Project</span>
        <span className="resume-result-text18">Role</span>
        <span className="resume-result-text19">Skills</span>
      </form>
      <form className="resume-result-form2" onClick={handleSelectResume}>
        <span className="resume-result-text20">Project</span>
        <span className="resume-result-text21">Role</span>
        <span className="resume-result-text22">Skills</span>
      </form>
      <form className="resume-result-form3" onClick={handleSelectResume}>
        <span className="resume-result-text23">Project</span>
        <span className="resume-result-text24">Role</span>
        <span className="resume-result-text25">Skills</span>
      </form>
      <button type="button" className="resume-result-button6 button" onClick={handleResumeResult}>
        <span className="resume-result-text26">
          <span>검색</span>
          <br></br>
        </span>
      </button>
      <footer className="resume-result-footer">
        <span className="resume-result-text29">
          © 2023 Teaming, All Rights Reserved.
        </span>
        <div className="resume-result-icon-group">
          <svg
            viewBox="0 0 950.8571428571428 1024"
            className="resume-result-icon"
          >
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </svg>
          <svg
            viewBox="0 0 877.7142857142857 1024"
            className="resume-result-icon2"
          >
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </svg>
          <svg
            viewBox="0 0 602.2582857142856 1024"
            className="resume-result-icon4"
          >
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </svg>
        </div>
      </footer>
      <button type="button" className="resume-result-button7 button" onClick={handlePrevPage}>
        ◀
      </button>
      <button type="button" className="resume-result-button8 button" onClick={handleNextPage}>
        ▶
      </button>
    </div>
  )
}

export default ResumeResult
