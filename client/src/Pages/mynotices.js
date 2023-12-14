import React, { useState, useEffect } from 'react';
import axios from "axios";
import './mynotices.css'
import { useLocation, useNavigate } from 'react-router-dom';


const Mynotices = (props) => {

  const loc = useLocation();
    
  const navigate = useNavigate();

  const [noticeNum, setNoticeNum] = useState(null);
  const [noticeList, setNoticeList] = useState(null);

  /*api*/
    const callApi = async()=>{
      try {
        const uemail = loc.state;
        const response = await axios.get("/api/allmynotices",{params: {email : uemail} },
        { withCredentials: true } );

        setNoticeNum(response.data.length);
        setNoticeList(response.data);
        
        if(response.data.code == 404)
        { console.log(response.data.reason); 
          setNoticeNum(0);}
        //console.log(response.data.resumeList);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const callApi2 = async()=>{
      try {
        var uemail = loc.state;
        const response = await axios.get("/api/hasresume",{params: {email: uemail}},
        { withCredentials: true } );

        if(response.data == 0) //이력서 최초 등록 안했으면
        {navigate('/resume', loc);} //이력서 등록하러 가기
        else {navigate('/selectedResume', loc);} //이력서 등록한 유저면 본인꺼 바로 보기

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
    navigate('/home', loc);
  };
  const handleSearchResume = () => {
    navigate('/searchResume', loc);
  };
  const handleSearchNotice = () => {
    navigate('/searchNotice', loc);
  };

  const handleSelectNotice = (index) => {
      /* 특정 모집공고로 이동*/
    navigate('/selectedNotice',
    { state: [noticeList[index].wid, loc.state] });
  };

  const handleResumeEnter = () => {
    callApi2();
  };

  const handleNoticeEnter = () => {
    navigate('/mynotices', loc);
  };

  const handleNoticeRegister = () => {
    navigate('/notice', loc)
  };

  return (
    <div className="noticesearch-container">
      <span className="noticesearch-text">Teaming</span>
      <span className="noticesearch-text01">효율적인 팀 매칭 서비스</span>
      <footer className="noticesearch-footer">
        <span className="noticesearch-text02">
          © 2023 Teaming, All Rights Reserved. 
        </span>
        <div className="noticesearch-icon-group">
          <svg
            viewBox="0 0 950.8571428571428 1024"
            className="noticesearch-icon"
          >
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </svg>
          <svg
            viewBox="0 0 877.7142857142857 1024"
            className="noticesearch-icon2"
          >
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </svg>
          <svg
            viewBox="0 0 602.2582857142856 1024"
            className="noticesearch-icon4"
          >
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </svg>
        </div>
      </footer>
      <h1 className="noticesearch-text03">
        <span>내가 등록한 모집 공고</span>
        <br></br>
      </h1>
      <ul className="list"></ul>
      <form className="noticesearch-form"></form>
      <button type="button" className="noticesearch-button button" onClick={handleHome}>
        <span className="noticesearch-text06">
          <span>홈</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="noticesearch-button1 button" onClick={handleLogout}>
        <span>
          <span>Logout</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="noticesearch-button2 button" onClick={handleSearchResume}>
        <span className="noticesearch-text12">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="noticesearch-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>
      <button type="button" className="noticesearch-button4 button" onClick={handleResumeEnter}>
        <span className="noticesearch-text15">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="noticesearch-button5 button" onClick={handleNoticeEnter}>
        <span className="noticesearch-text18">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
          <form className="resume-result-box" >
            <div className="resume-result-container">
              {Array.from({ length: noticeNum || 0 }, (_, index) => (
                <div key={index} className="resume-result-item"onClick={() => handleSelectNotice(index)}>
                  <span className="resume-result-text23"> {noticeList[index].title}</span>
                </div>
              ))}
            </div>
          </form>
      <button type="button" className="notice-register-button" onClick={handleNoticeRegister}>
            새 모집공고 등록하기
          </button>
    </div>

  )
}

//export default Noticesearch
export default Mynotices