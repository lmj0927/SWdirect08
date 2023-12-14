import React, { useState, useEffect } from 'react';
import axios from "axios";
import './my_proposal.css';
import { useLocation, useNavigate } from 'react-router-dom';


const MyProposal = (props) => {

    const location= useLocation();
    const navigate = useNavigate();

    const [requestNum, setRequestNum] = useState(null);
    const [requestList, setRequestList] = useState(null);

  /*api*/
    const callApi = async()=>{
      try {
        const uemail = location.state;
        const response = await axios.get("/api/join_requests_all",{params: {getteremail : uemail} },
        { withCredentials: true } );

        setRequestNum(response.data.length);
        setRequestList(response.data);
        
        if(response.data.code == 404)
        { console.log(response.data.reason); 
          setRequestList(0);}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const callApi2 = async()=>{
      try {
        var uemail = location.state;
        const response = await axios.get("/api/hasresume",{params: {email: uemail}},
        { withCredentials: true } );

        if(response.data == 0) //이력서 최초 등록 안했으면
        {navigate('/resume', location);} //이력서 등록하러 가기
        else {navigate('/selectedResume', location);} //이력서 등록한 유저면 본인꺼 바로 보기

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(()=>{
      callApi();
    }, []);
  
    /*핸들러 */

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

    const handleResumeEnter = () => {
        callApi2();
      };
    
    
      const handleNoticeEnter = () => {
        navigate('/mynotices', location);
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
      <button type="button" className="my-proposal-button5 button" onClick={handleNoticeEnter}>
        <span className="my-proposal-text18">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="request-result-box" >
            <div className="my-proposal-container">
              {Array.from({ length: requestNum || 0 }, (_, index) => (
                <div key={index} className="my-proposal-form1">
                  <span className="my-proposal-text22">Join Proposal</span>
                  <span className="request-result-text23"> {requestList[index].comment}</span>
                  <button type="button" className="proposal1-accept" onClick={handleAccept}> 
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
                </div>
              ))}
            </div>
          </form>

    </div>
  )
}

export default MyProposal