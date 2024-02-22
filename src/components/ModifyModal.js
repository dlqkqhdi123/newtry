import React, { useState } from "react";
import "./ModifyModal.css";
import iconClose from "../assets/icon/icon-close_ff9b50.png";

function ModifyModal({ isOpen, onClose, onSave, initialContent }) {
  const [content, setContent] = useState(initialContent);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    const confirmed = window.confirm("수정하시겠습니까?");

    if (confirmed) {
      onSave(content);
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modify-modal-content">
            <div className="modify-modal-container">
              <div className="modify-modal-header">
                <span className="modify-modal-span">내용 수정</span>
                <button className="close-btn" onClick={onClose}>
                  <img className="close-img" src={iconClose} />
                </button>
              </div>
              <div className="modify-modal-body">
                <textarea
                  className="modify-text"
                  value={content}
                  onChange={handleChange}
                />
              </div>
              <div className="bottom-buttons">
                <button className="save-btn" onClick={handleSave}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModifyModal;
