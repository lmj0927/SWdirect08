
import React, { useState, useEffect } from 'react';
import './selected_resume.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


const SelectedResume = (props) => {

  const location = useLocation();

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

      var uemail = location.state;
      
      const response = await axios.get("/api/selected_resume",{params: {email: uemail}}, 
      { withCredentials: true } );

      setResponseMajor(response.data[0].major);
      setResponseRole(response.data[0].role);

      setResponseSkill1(response.data[0].skill1);
      setResponseSkill2(response.data[0].skill2);
      setResponseSkill3(response.data[0].skill3);
      
      setResponseLevel1(response.data[0].level1);
      setResponseLevel2(response.data[0].level2);
      setResponseLevel3(response.data[0].level3);

      setResponseIntro(response.data[0].intro);

      if(response.data && response.data.code === 404) // 이력서 불러오기 실패
        { console.log(response.data.reason);}

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
    navigate('/home', location);
  };
  const handleSearchResume = () => {
    navigate('/searchResume', location);
  };
  const handleSearchNotice = () => {
    navigate('/searchNotice', location);
  };

  const handleResumeEdit = () => {
    navigate('/resume', location)
    console.log('Edit clicked');
  };

  const handleResumeEnter = () => {
    navigate('/selectedResume', location)
  };

  const handleNoticeEnter = () => {
    navigate('/mynotices', location)
  };

  return (
    <div className="selected-resume-container">
      <span className="selected-resume-text">Teaming</span>
      <span className="selected-resume-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="selected-resume-form"></form>
      <button type="button" className="selected-resume-button button" onClick={handleHome}>
        <span className="selected-resume-text02">
          <span>홈{location.state.myemail}</span>
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
        모집 공고 검색 {location.state.otheremail}
      </button>
      <button type="button" className="selected-resume-button4 button" onClick={handleResumeEnter}>
        <span className="selected-resume-text11">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-resume-button5 button" onClick={handleNoticeEnter}>
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
          <span>Major:  </span>
          <br></br>
        </span>
        <span className="selected-resume-text23">
          <span className="selected-resume-text24">Skill 1</span>
          <br></br>
        </span>
        <span className="selected-resume-text26">
          <span className="selected-resume-text27">Skill 2</span>
          <br></br>
        </span>
        <span className="selected-resume-text29">
          <span>Introduction</span>
          <br></br>
        </span>
        <span className="selected-resume-text32">
          <span>Resume</span>
          <br></br>
        </span>
        <button type="button" className="selected-resume-button6 button" onClick={handleResumeEdit}>
          <span>
            <span>수정하기</span>
            <br></br>
          </span>
        </button>
        <span className="selected-resume-text38">
          <span>Level</span>
          <br></br>
        </span>
        <span className="selected-resume-text41">
          <span>Level:  </span>
          <br></br>
        </span>
        <span className="selected-resume-text44">
          <span className="selected-resume-text45">Skill 3</span>
          <br></br>
        </span>
        <span className="selected-resume-text47">
          <span>Level</span>
          <br></br>
        </span>
        <span className="selected-resume-text50">{responseMajor}</span>
        <span className="selected-resume-text51">{responseRole}</span>
        <span className="selected-resume-text52">{responseSkill1}</span>
        <span className="selected-resume-text53">{responseLevel1}</span>
        <span className="selected-resume-text54">{responseSkill2}</span>
        <span className="selected-resume-text55">{responseLevel2}</span>
        <span className="selected-resume-text56">{responseSkill3}</span>
        <span className="selected-resume-text57">{responseLevel3}</span>
        <span className="selected-resume-text58">{responseIntro}</span>
        <span className="selected-notice-email">E-mail</span>
        <span className="selected-notice-emailtext">{location.state}</span> {/* Email 자리*/}
      </form>
    </div>
  )
}

export default SelectedResume
