import React, { useState, useEffect } from 'react';
import axios from "axios";
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

  const handleSelectResume = () => {
    navigate('/selectedResume');
  };
  const handleSelectNotice = () => {
    navigate('/selectedNotice');
  };
  const handleMyProposal = () => {
    navigate('/myProposal');
  };

  const [responseRole_1, setResponseRole_1] = useState(null);
  const [responseRole_2, setResponseRole_2] = useState(null);
  const [responseRole_3, setResponseRole_3] = useState(null);

  const [responseMajor_1, setResponseMajor_1] = useState(null);
  const [responseMajor_2, setResponseMajor_2] = useState(null);
  const [responseMajor_3, setResponseMajor_3] = useState(null);

  const [responseSkill_1, setResponseSkill_1] = useState(null);
  const [responseSkill_2, setResponseSkill_2] = useState(null);
  const [responseSkill_3, setResponseSkill_3] = useState(null);

  const [responseTitle_1, setResponseTitle_1] = useState(null);
  const [responseTitle_2, setResponseTitle_2] = useState(null);
  const [responseTitle_3, setResponseTitle_3] = useState(null);


  const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
  const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);

  const callApi = async()=>{
    try {
      const response_resume1 = await axios.get("/api/selected_resume/");  // id 필요
      const response_resume2 = await axios.get("/api/selected_resume/");
      const response_resume3 = await axios.get("/api/selected_resume/");

      const response_notice1 = await axios.get("/api/selected_notice/");
      const response_notice2 = await axios.get("/api/selected_notice/");
      const response_notice3 = await axios.get("/api/selected_notice/");

      // console.log(response_resume1.data.major)
      setResponseMajor_1(response_resume1.data.major);
      setResponseRole_1(response_resume1.data.role);
      setResponseSkill_1(response_resume1.data.skill1);  // 미리보기에 뜨는 skill = skill1

      setResponseMajor_2(response_resume2.data.major);
      setResponseRole_2(response_resume2.data.role);
      setResponseSkill_2(response_resume2.data.skill1);  // 미리보기에 뜨는 skill = skill1

      setResponseMajor_3(response_resume3.data.major);
      setResponseRole_3(response_resume3.data.role);
      setResponseSkill_3(response_resume3.data.skill1);  // 미리보기에 뜨는 skill = skill1

      
      setResponseTitle_1(response_notice1.data.title);
      setResponseTitle_2(response_notice2.data.title);
      setResponseTitle_3(response_notice3.data.title);

      console.log(response_notice1.title);

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
      <button type="button" className="home-button4 button" onClick={handleResumeEnter}>
        <span className="home-text18">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>

      <button type="button" className="home-myproposal button" onClick={handleMyProposal}>
        <span className="home-myproposaltext">
          <span>받은 요청</span>
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

      <button type="button" className="home-button5 button" onClick={handleNoticeEnter}>
        <span className="home-text21">
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
      <form className="home-form1" onClick={handleSelectResume}>
        <span className="home-text24">{responseRole_1}</span>
        <span className="home-text25">{responseMajor_1}</span>
        <span className="home-text26">{responseSkill_1}</span>
      </form>
      <form className="home-form2" onClick={handleSelectResume}>
        <span className="home-text27">{responseRole_2}</span>
        <span className="home-text28">{responseMajor_2}</span>
        <span className="home-text29">{responseSkill_2}</span>
      </form>
      <form className="home-form3" onClick={handleSelectResume}>
        <span className="home-text30">{responseRole_3}</span>
        <span className="home-text31">{responseMajor_3}</span>
        <span className="home-text32">{responseSkill_3}</span>
      </form>
      <form className="home-form4" onClick={handleSelectNotice}>
        {/* <span className="home-text33">Project</span> */}
        <span className="home-text34">{responseTitle_1}</span>
        {/* <span className="home-text35">Skills</span> */}
      </form>
      <form className="home-form5" onClick={handleSelectNotice}>
        {/* <span className="home-text36">Project</span> */}
        <span className="home-text37">{responseTitle_2}</span>
        {/* <span className="home-text38">Skills</span> */}
      </form>
      <form className="home-form6" onClick={handleSelectNotice}>
        {/* <span className="home-text39">Project</span> */}
        <span className="home-text40">{responseTitle_3}</span>
        {/* <span className="home-text41">Skills</span> */}
      </form>
    </div>
  )
}

export default Home
