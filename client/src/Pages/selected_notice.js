import React from 'react'
import axios from 'axios'
import './selected_notice.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SelectedNotice = (props) => {

  /* location.state[0] -> wid, location.state[1] -> email */
  const location = useLocation();
  const navigate = useNavigate();

  const [responseTitle, setResponseTitle] = useState("");
  const [responseProject, setResponseProject] = useState("");
  const [responseRole, setResponseRole] = useState("");
  const [responseMember, setResponseMember] = useState("");
  const [responseSkill, setResponseSkill] = useState("");
  const [responseIntroduction, setResponseIntroduction] = useState("");
  const [responsePeriod, setResponsePeriod] = useState("");
  const [responseEmail, setResponseEmail] = useState("");
  const [responseWritedate, setResponseWritedate] = useState("");
  const [responseClicknum, setResponseClicknum] = useState(0);
  const [responseData, setResponseData] = useState(null);

  const callApi = async()=>{
    try {

      var wwid = location.state[0];
      const response = await axios.get("/api/selected_notice",{params: {wid: wwid}}, 
      { withCredentials: true } );

      if(response.data && response.data.code === 404) // 모집공고 불러오기 실패
        { console.log(response.data.reason);}

      setResponseTitle(response.data.title);
      setResponseRole(response.data.role);
      setResponseSkill(response.data.skills);
      setResponseMember(response.data.membernum);
      setResponseIntroduction(response.data.intro);
      setResponsePeriod(response.data.period);
      setResponseProject(response.data.projtype);
      setResponseEmail(response.data.email);
      setResponseWritedate(response.data.writedate);
      setResponseClicknum(response.data.clicknum);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const callApi2 = async()=>{
    try {
      var uemail = location.state[1];
      const response = await axios.get("/api/hasresume",{params: {email: uemail}},
      { withCredentials: true } );

      if(response.data == 0) //이력서 최초 등록 안했으면
      {navigate('/resume', {state : location.state[1]});} //이력서 등록하러 가기
      else {navigate('/selectedResume',  {state: location.state[1]} );} //이력서 등록한 유저면 본인꺼 바로 보기

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    callApi();
  }, []);


/*핸들러*/
  const handleLogout = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/home', {state: location.state[1]});
  };
  const handleSearchResume = () => {
    navigate('/searchResume', {state: location.state[1]});
  };

  const handleSearchNotice = () => {
    navigate('/searchNotice', {state: location.state[1]});
  };

  const handleResumeEnter = () => {
   callApi2();
  };

  const handleNoticeEnter = () => {
    navigate('/mynotices', {state: location.state[1]});
  };

  const handleNoticeEdit = () => {

    navigate('/modifyNotice', {state: [location.state[0], location.state[1]]});

  };


  return (
    <div className="selected-notice-container">
      <span className="selected-notice-text">Teaming</span>
      <span className="selected-notice-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="selected-notice-form"></form>
      <button type="button" className="selected-notice-button button" onClick={handleHome}>
        <span className="selected-notice-text02">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button2 button" onClick={handleSearchResume}>
        <span className="selected-notice-text08">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="selected-notice-button4 button" onClick={handleResumeEnter}>
        <span className="selected-notice-text11">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="selected-notice-button5 button" onClick={handleNoticeEnter}>
        <span className="selected-notice-text14">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="selected-notice-form1">
        <span className="selected-notice-text17">
          <span>Role</span>
          <br></br>
        </span>
        <span className="selected-notice-text20">
          <span>Project</span>
          <br></br>
        </span>
        <span className="selected-notice-text23">
          <span>Skills</span>
          <br></br>
        </span>
        <span className="selected-notice-text26">
          <span>Introduction</span>
          <br></br>
        </span>
        <span className="selected-notice-text29">
          <span>Required</span>
          <br></br>
        </span>
        <span className="selected-notice-text32">
          <span>members</span>
          <br></br>
        </span>
        <span className="selected-notice-text35">
          <span>Notice</span>
          <br></br>
        </span>

        <span className="new-selected-notice-date">
          <span>작성 날짜</span>
          <br></br>
        </span>

        <span className="selected-notice-watchcnt">
          <span>조회수</span>
          <br></br>
        </span>

        <button type="button" className="selected-notice-button6 button" onClick={handleNoticeEdit}>
          <span>
            <span>수정하기</span>
            <br></br>
          </span>
        </button>
        <span className="selected-notice-text41">
          <span>Title</span>
          <br></br>
        </span>
        <span className="selected-notice-text44">
          <span className="selected-notice-text45">Period</span>
          <br></br>
        </span>
        <span className="selected-notice-text47">{responseTitle}</span>
        <span className="selected-notice-text48">{responsePeriod}</span>
        <span className="selected-notice-text49">{responseProject}</span>
        <span className="selected-notice-text50">{responseRole}</span>
        <span className="selected-notice-text51">{responseMember}</span>
        <span className="selected-notice-text52">{responseSkill}</span>
        <span className="selected-notice-text53">{responseIntroduction}</span>

        <span className="new-selected-notice-datetext">{responseWritedate}</span> {/* date 용 */}
        <span className="selected-notice-watchtext">{responseClicknum}</span> {/* click num 용 */}


      </form>
    </div>
  )
}

export default SelectedNotice