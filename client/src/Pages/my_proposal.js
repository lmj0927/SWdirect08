import React, { useState, useEffect } from 'react';
import axios from "axios";
import './my_proposal.css';
import { useNavigate } from 'react-router-dom';

const MyProposal = (props) => {
    const navigate = useNavigate();

    const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
    const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);

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
    const handleSelectResume = () => {
      navigate('/selectedResume');
    };
    const handleResumeResult = () => {
      navigate('/resumeResult');
    };

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

      const handleAccept = () => {
      };

      const handleReject = () => {
      };
  return (
    <div className="my-proposal-container">
      <span className="my-proposal-text">Teaming</span>
      <span className="my-proposal-text01">효율적인 팀 매칭 서비스</span>
      <footer className="my-proposal-footer">
        <span className="my-proposal-text02">
          © 2023 Teaming, All Rights Reserved.
        </span>
      </footer>
      <h1 className="my-proposal-text03">
        <span>나에게 온 제안</span>
        <br></br>
      </h1>
      <ul className="list"></ul>
      <form className="my-proposal-form"></form>
      <button type="button" className="my-proposal-button button" onClick={handleHome}>
        <span className="my-proposal-text06">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="my-proposal-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="my-proposal-button2 button" onClick={handleSearchResume}>
        <span className="my-proposal-text12">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="my-proposal-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="my-proposal-button4 button" onClick={handleResumeEnter}>
        <span className="my-proposal-text15">
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
      <button type="button" className="my-proposal-button5 button" onClick={handleNoticeEnter}>
        <span className="my-proposal-text18">
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
      <form className="my-proposal-form1">
        <span className="my-proposal-text22">Join Proposal</span>
        <span className="proposal1">제안 내용</span>  {/* 제안 내용 들어가는 부분 */}
        <button type="button" className="proposal1-accept" onClick={handleAccept}>  {/* handleAccept, handleReject 내용 비워뒀습니다. */}
          <span>
            <span>수락</span>
            <br></br>
          </span>
        </button>
        <button type="button" className="proposal1-reject" onClick={handleReject}>
          <span>
            <span>거절</span>
            <br></br>
          </span>
        </button>
      </form>
      <form className="my-proposal-form2">
        <span className="my-proposal-text25">Join Proposal</span>
        <span className="proposal2">제안 내용</span>
        <button type="button" className="proposal2-accept" onClick={handleAccept}>
          <span>
            <span>수락</span>
            <br></br>
          </span>
        </button>
        <button type="button" className="proposal2-reject" onClick={handleReject}>
          <span>
            <span>거절</span>
            <br></br>
          </span>
        </button>
      </form>
      <form className="my-proposal-form3">
        <span className="my-proposal-text28">Join Proposal</span>
        <span className="proposal3">제안 내용</span>
        <button type="button" className="proposal3-accept" onClick={handleAccept}>
          <span>
            <span>수락</span>
            <br></br>
          </span>
        </button>
        <button type="button" className="proposal3-reject" onClick={handleReject}>
          <span>
            <span>거절</span>
            <br></br>
          </span>
        </button>
      </form>


    </div>
  )
}

export default MyProposal
