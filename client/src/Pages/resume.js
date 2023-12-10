import React from 'react'
import axios from "axios";
import { useState } from 'react';
import './resume.css'
import { useNavigate } from 'react-router-dom';

const Resume = (props) => {
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

    const [Major, setMajor] = useState("");
    const [Role, setRole] = useState("기획");
    const [Skill_1, setSkill_1] = useState("");
    const [Skill_2, setSkill_2] = useState("");
    const [Skill_3, setSkill_3] = useState("");
    const [Level_1, setLevel_1] = useState("");
    const [Level_2, setLevel_2] = useState("");
    const [Level_3, setLevel_3] = useState("");
    const [Introduction, setIntroduction] = useState("");
    const [responseData, setResponseData] = useState(null);


    const [showAdditionalResumeButtons, setShowAdditionalResumeButtons] = useState(false);
    const [showAdditionalNoticeButtons, setShowAdditionalNoticeButtons] = useState(false);


    const callApi = async () => {
      try {
        const requestBody = {Major, Role, Skill_1, Skill_2, Skill_3, Level_1, Level_2, Level_3};
        const response = await axios.post("/api/write-introduction-process",  requestBody , {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        // console.log(response.status);
        setResponseData(response.data);
        console.log(response.data);
  
      } catch (error) {
        console.error('Error in API call:', error);
      }
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

  const handleRegister = () => {
    try {
      
      callApi();

    } catch (error) {
      console.error('Error during login:', error);
    }
  };
    // navigate('/notice')
    // console.log('Edit clicked');


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

      <button type="button" className="resume-button5 button" onClick={handleNoticeEnter}>
        <span className="resume-text14">
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

      <form className="resume-form1">
        <span className="resume-text17">
          <span>Role</span>
          <br></br>
        </span>
        <select className="resume-select" 
        value={Role}
        onChange={(e) => setRole(e.target.value)}>
          <option value="기획">기획</option>
          <option value="개발">개발</option>
          <option value="문서 작성">문서 작성</option>
          <option value="디자인">디자인</option>
          <option value="마케팅">마케팅</option>
          <option value="기타">기타</option>
        </select>
        <span className="resume-text20">
          <span>Major</span>
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
          value={Introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
        <span className="resume-text29">
          <span>Introduction</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="역량을 작성해주세요"
          className="resume-textinput1 input"
          value={Skill_1}
          onChange={(e) => setSkill_1(e.target.value)}
        />
        <input
          type="text"
          placeholder="역량을 작성해주세요"
          className="resume-textinput2 input"
          value={Skill_2}
          onChange={(e) => setSkill_2(e.target.value)}
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
          value={Major}
          onChange={(e) => setMajor(e.target.value)}
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
        value={Level_1}
        onChange={(e) => setLevel_1(e.target.value)}>
          <option value="None" selected>
            None
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select className="resume-select2"
        value={Level_2}
        onChange={(e) => setLevel_2(e.target.value)}>
        <option value="None" selected>
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
          placeholder="역량을 작성해주세요"
          className="resume-textinput4 input"
          value={Skill_3}
          onChange={(e) => setSkill_3(e.target.value)}
        />
        <span className="resume-text47">
          <span>Level</span>
          <br></br>
        </span>
        <select className="resume-select3"
        value={Level_3}
        onChange={(e) => setLevel_3(e.target.value)}>
        <option value="None" selected>
            None
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </form>
    </div>
  )
}


export default Resume