import React from 'react'
import axios from "axios";
import { useState } from 'react';
import './resume.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Resume = (props) => {

    const navigate = useNavigate();
    const loc = useLocation();
  
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

    const [major, setmajor] = useState("");
    const [role, setrole] = useState("");
    const [skill1, setskill1] = useState("");
    const [skill2, setskill2] = useState("");
    const [skill3, setskill3] = useState("");
    const [level1, setlevel1] = useState(0);
    const [level2, setlevel2] = useState(0);
    const [level3, setlevel3] = useState(0);
    const [intro, setintro] = useState("");
    const [responseData, setResponseData] = useState(null);


    const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
    const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);

  
    const callApi = async () => {
      try {

        var email = loc.state;
        const requestBody = {email, major, role, skill1, skill2, skill3, 
          level1: parseInt(level1, 10), // Convert level1 to a number using parseInt
          level2: parseInt(level2, 10), // Convert level2 to a number using parseInt
          level3: parseInt(level3, 10), // Convert level3 to a number using parseInt
          intro
        };

        const response = await axios.post("/api/write-resume-process",  requestBody , {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        });

        console.log(response.data);

        if(response.data && response.data.code === 404) // db에 이력서 넣기 실패
        { console.log(response.data.reason);}
        else // db에 이력서 넣기 성공
        {navigate('/selectedResume', loc);}

      } catch (error) {
        console.error('Error in API call:', error);
      }

    };


    const handleResumeEnter = () => {
      navigate('/resume', loc);
  };

  const handleNoticeEnter = () => {
    navigate('/mynotices', loc)
  };

  const handleRegister = () => {
      callApi();
  };
    
  return (
    <div className="resume-container">
      <span className="resume-text">Teaming</span>
      <span className="resume-text01">효율적인 팀 매칭 서비스</span>
      <ul className="list"></ul>
      <form className="resume-form"></form>
      <button type="button" className="resume-button button" onClick={handleHome}>
        <span className="resume-text02">
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
      <button type="button" className="resume-button2 button"onClick={handleSearchResume}>
        <span className="resume-text08">
          <span>이력서 검색</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button3 button" onClick={handleSearchNotice}>
        모집 공고 검색
      </button>

      <button type="button" className="resume-button4 button" onClick={handleResumeEnter}>
        <span className="resume-text11">
          <span>내 이력서</span>
          <br></br>
        </span>
      </button>
      <button type="button" className="resume-button5 button" onClick={handleNoticeEnter}>
        <span className="resume-text14">
          <span>내 모집 공고</span>
          <br></br>
        </span>
      </button>
      <form className="resume-form1">
        <span className="resume-text17">
          <span>role</span>
          <br></br>
        </span>
        <select className="resume-select"
         value={role}
         onChange={(e) => setrole(e.target.value)}>
          <option value="null" selected>
            None
          </option>
          <option value="기획">기획</option>
          <option value="개발">개발</option>
          <option value="문서 작성">문서 작성</option>
          <option value="디자인">디자인</option>
          <option value="마케팅">마케팅</option>
          <option value="기타">기타</option>
        </select>
        <span className="resume-text20">
          <span>major</span>
          <br></br>
        </span>
        <span className="resume-text23">
          <span className="resume-text24">Skill 1</span>
          <br></br>
        </span>
        <span className="resume-text26">
          <span className="resume-text27">Skill 2</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="간단히 본인을 소개해주세요"
          className="resume-textinput input"
          value={intro}
          onChange={(e) => setintro(e.target.value)}
        />
        <span className="resume-text29">
          <span>Introduction</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="본인의 역량을 작성해주세요"
          className="resume-textinput1 input"
          value={skill1}
          onChange={(e) => setskill1(e.target.value)}
        />
        <input
          type="text"
          placeholder="본인의 역량을 작성해주세요"
          className="resume-textinput2 input"
          value={skill2}
          onChange={(e) => setskill2(e.target.value)}
        />
        <span className="resume-text32">
          <span>Resume</span>
          <br></br>
        </span>
        <button type="button" className="resume-button6 button" onClick={handleRegister}>
          <span>
            <span>등록</span>
            <br></br>
          </span>
        </button>
        <input
          type="text"
          placeholder="전공을 작성해주세요"
          className="resume-textinput3 input"
          value={major}
          onChange={(e) => setmajor(e.target.value)}
        />
        <span className="resume-text38">
          <span>Level</span>
          <br></br>
        </span>
        <span className="resume-text41">
          <span>Level</span>
          <br></br>
        </span>
        <select className="resume-select1"
         value={level1}
         onChange={(e) => setlevel1(e.target.value)}>
          <option value="null" selected>
            None
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select className="resume-select2"
         value={level2}
         onChange={(e) => setlevel2(e.target.value)}>
        <option value="null" selected>
            None
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span className="resume-text44">
          <span className="resume-text45">Skill 3</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="본인의 역량을 작성해주세요"
          className="resume-textinput4 input"
          value={skill3}
          onChange={(e) => setskill3(e.target.value)}
        />
        <span className="resume-text47">
          <span>Level</span>
          <br></br>
        </span>
        <select className="resume-select3"
         value={level3}
         onChange={(e) => setlevel3(e.target.value)}>
        <option value="null" selected>
            None
          </option>
          <option value= "1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </form>
    </div>
  )
}

export default Resume