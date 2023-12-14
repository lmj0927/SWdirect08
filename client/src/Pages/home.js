import React, { useState, useEffect} from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import './home.css'

const Home = (props) => {
  
  const navigate = useNavigate();

  const loc = useLocation();

  const [responseNum, setResponseNum] = useState(null);
  const [resumeList, setResumeList] = useState(null);
  const [noticeNum, setNoticeNum] = useState(null);
  const [noticeList, setNoticeList] = useState(null);

  const callApi = async()=>{
    try {
      var uemail = loc.state;

      const response = await axios.get("/api/hasresume",{params: {email: uemail}},
      { withCredentials: true } );

      console.log(response.data);

      if(response.data == 0) //이력서 최초 등록 안했으면
      {navigate('/resume', loc);} //이력서 등록하러 가기
      else {navigate('/selectedResume', loc);} //이력서 등록한 유저면 본인꺼 바로 보기
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const callApi2 = async()=>{
    try {
      const response = await axios.get("/api/allresume",
      { withCredentials: true } );

      if( response.data.length < 4)
      {setResponseNum(response.data.length);}
      else setResponseNum(3);

      setResumeList(response.data);

      if(response.data.code == 404)
      { console.log(response.data.reason); 
        setResponseNum(0);}

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  const callApi3 = async()=>{
    try {
      const response = await axios.get("/api/allnotice",
      { withCredentials: true } );

      if( response.data.length < 4)
      {setNoticeNum(response.data.length);}
      else setNoticeNum(3);

      setNoticeList(response.data);

      if(response.data.code == 404)
      { console.log(response.data.reason); }

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  useEffect(()=>{
    callApi2();
    callApi3();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const handleHome = () => {
   navigate('/home', loc);
    
  };

  const handleSearchResume = () => {
    navigate('/searchResume', loc);
  };

  const handleSearchNotice = () => {
    navigate('/searchNotice', loc);
  };
  
  const handleResume = () => {
    callApi();
  };

  const handleNotice = () => {
    navigate('/mynotices', loc);
  };
  
  const handleMyProposal = () => {
    navigate('/myProposal', loc);
  };

  const handleSelectResume = (index) => {
    navigate('/otherselectedResume', 
    { state: [resumeList[index].email, loc.state] });
   };

   const handleSelectNotice = (index) => {
    navigate('/otherselectedNotice',
    { state: [noticeList[index].wid, loc.state] } );
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
      <button type="button" className="home-myproposal button" onClick={handleMyProposal}>
        <span className="home-myproposaltext">
          <span>받은 요청</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="home-button5 button" onClick={handleNotice}>
        <span className="home-text21">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="new-resume-result-box">
            <div className="new-resume-result-container">
              {Array.from({ length: responseNum || 0 }, (_, index) => (
                <div key={index} className="new-resume-result-item"onClick={() => handleSelectResume(index)}>
                  <span className="new-resume-result-text23"> {resumeList[index].role}</span>
                  <span className="resume-result-text24">{resumeList[index].major}</span>
                  <span className="resume-result-text25">{resumeList[index].skill1}</span>
                </div>
              ))}
            </div>
      </form>
      <form className="new-notice-result-box">
            <div className="new-notice-result-container">
              {Array.from({ length: noticeNum || 0 }, (_, index) => (
                <div key={index} className="new-notice-result-item"onClick={() => handleSelectNotice(index)}>
                 <span className="new-resume-result-text23"> {noticeList[index].title}</span>
                </div>
              ))}
            </div>
      </form>
    </div>
  )
}

export default Home
