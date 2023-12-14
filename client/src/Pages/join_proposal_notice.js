import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import './join_proposal_notice.css';


const JoinProposalNotice = ({ onClose, onJoin }) => {

  const location = useLocation();
  const [Comment, setComment] = useState("");

  const callApi3 = async () => {
    try {
          var wid = location.state[0];  //현재 모집 공고 wid
          var senderemail = location.state[1]; //본인 email
          var getteremail = null;
          var comment = Comment;
          const requestBody = { senderemail, getteremail, wid, comment}

          const response = await axios.post("/api/join_request",  requestBody , {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
       if(response.data.code == 202) { //제안 메시지 보내기 성공 하면 걍 팝업 창 닫으면 될듯?
          console.log(response.data.reason);
          onClose();
        }
          else console.log(response.data.reason)
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const  sendRequest = () => {
    callApi3();
  };

  return (
    <div className="join-proposal-popup">
      <span className='popuptitle'>Join Proposal</span>
      <input
          type="text"
          id="comment"
          className="proposaltext input"
          placeholder="전할 말을 작성해주세요."
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
        />
      <button type="button" className="proposebutton" onClick={sendRequest}>
          <span>
            <span>참가 요청</span>
            <br></br>
          </span>
          </button>
      <button className='closebutton' onClick={onClose}>Close</button>
    </div>
  );
};

export default JoinProposalNotice;