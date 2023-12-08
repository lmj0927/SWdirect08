import React from 'react';
import './join_proposal_popup.css';

const JoinProposalPopup = ({ onClose, onJoin }) => {
  return (
    <div className="join-proposal-popup">
      <span className='popuptitle'>Join Proposal</span>
      <input
          type="text"
          placeholder="전할 말을 작성해주세요."
          className="proposaltext input"
        />
      <button className='proposebutton' onClick={onJoin}>참가 요청</button>
      <button className='closebutton' onClick={onClose}>Close</button>
    </div>
  );
};

export default JoinProposalPopup;