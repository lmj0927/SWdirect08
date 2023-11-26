// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/login.js';
import Home from './Pages/home.js';
import Resumesearch from './Pages/search_resume.js';
import Noticesearch from './Pages/search_notice.js';
import Resume from './Pages/resume.js';
import Notice from './Pages/notice.js';
import Join from './Pages/join.js';
import JoinResult from './Pages/join_result.js';
import SelectedNotice from './Pages/selected_notice.js';
import SelectedResume from './Pages/selected_resume.js';
import ResumeResult from './Pages/resume_result.js';
import NoticeResult from './Pages/notice_result.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Home의 path를 /로 변경 */}
          <Route path="/" element={<Login />} /> {/* Login의 path를 /login으로 변경 */}
          <Route path="/searchResume" element={<Resumesearch />} /> {/* Resumesearch의 path를 /searchResume으로 변경 */}
          <Route path="/searchNotice" element={<Noticesearch />} /> {/* Noticesearch의 path를 /searchNotice으로 변경 */}
          <Route path="/resume" element={<Resume />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/join" element={<Join />} />
          <Route path="/joinResult" element={<JoinResult />} />
          <Route path="/selectedNotice" element={<SelectedNotice />} />
          <Route path="/selectedResume" element={<SelectedResume />} />
          <Route path="/resumeResult" element={<ResumeResult />} />
          <Route path="/noticeResult" element={<NoticeResult />} />
          {/* 추가적인 Route 설정 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
