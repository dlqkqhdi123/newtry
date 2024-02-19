import React from "react";
import "./Modal.css";
import closeImg from "../../assets/icon-close_w.png";
import { Link } from "react-router-dom";
import { doc, db, deleteDoc, getData } from "../../api/firebase";

function RemoveAccount({ open, onClose }) {
  if (!open) {
    return null;
  }

  const handleRemoveAccount = async () => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member && member.memberId) {
      try {
        const memberData = await getData(
          "member",
          "memberId",
          "==",
          member.memberId
        );
        if (memberData && memberData.docId) {
          await deleteDoc(doc(db, "member", memberData.docId));
          console.log("문서가 성공적으로 삭제되었습니다.");
        } else {
          console.log("해당 memberId를 가진 문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("문서 삭제 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-container">
          <div className="modal-header">
            <div className="empty-area"></div>
            <span className="modal-span">회원 탈퇴</span>
            <img
              className="close-img"
              src={closeImg}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="modal-contentBox">
            <Link to="/" className="find-pass" onClick={handleRemoveAccount}>
              회원 탈퇴
            </Link>
            <button onClick={onClose} className="find-pass">
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveAccount;
