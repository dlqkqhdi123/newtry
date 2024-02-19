import React from "react";
import "./Modal.css";
import closeImg from "../../assets/icon-close_w.png";
import { Link } from "react-router-dom";

function Modal({ open, onClose, memberId, isError }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-container">
          <div className="modal-header">
            <div className="empty-area"></div>
            <span className="modal-span">아이디 찾기</span>
            <img
              className="close-img"
              src={closeImg}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="modal-contentBox">
            {isError ? (
              <p>일치하는 회원 정보가 없습니다.</p>
            ) : (
              <>
                <p>회원님의 아이디는</p>
                <p className="find">{memberId}</p>
                <p>입니다.</p>
                <Link to="/findPass" className="find-pass">
                  비밀번호 찾기
                </Link>
                <Link to="/" className="find-pass">
                  로그인 하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
