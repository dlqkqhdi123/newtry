import { useEffect } from "react";
import "./MessageToUser.css";
import { useState } from "react";
import iconClose from "../assets/icon/icon-close_ff9b50.png";
import MessageToUserButton from "./MessageToUserButton";
import {
  collection,
  db,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  where,
  query,
} from "../api/firebase";

function MessageToUser({ isOpen, onClose, onSendMessage, userData }) {
  const [images, setImages] = useState([]);
  const [showChevron, setShowChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const member = JSON.parse(localStorage.getItem("member"));
  const senderNickName = member?.memberNickName;
  console.log(senderNickName);
  console.log(userData);

  const handleSendClick = async () => {
    try {
      let messageData = {
        memberNickName: senderNickName,
        sendTitle: title,
        sendContent: message,
        date: getCurrentDate(),
      };

      const q = query(
        collection(db, "member"),
        where("memberNickName", "==", senderNickName)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(
          db,
          "member",
          querySnapshot.docs[0].id,
          "sendMessage",
          Date.now().toString()
        );
        await setDoc(docRef, messageData);
      }

      messageData = {
        memberNickName: userData?.memberNickName,
        receiveTitle: title,
        receiveContent: message,
        date: getCurrentDate(),
      };

      const q2 = query(
        collection(db, "member"),
        where("memberNickName", "==", userData?.memberNickName)
      );
      const querySnapshot2 = await getDocs(q2);

      if (!querySnapshot2.empty) {
        const docRef = doc(
          db,
          "member",
          querySnapshot2.docs[0].id,
          "receiveMessage",
          Date.now().toString()
        );
        await setDoc(docRef, messageData);
      }

      alert("성공적으로 전송되었습니다");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setImages([]);
      setShowChevron(false);
      setCurrentIndex(0);
      setTitle("");
      setContent("");
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    e.stopPropagation();

    if (!e.target.closest(".modal-content")) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-container">
              <div className="modal-header">
                <span className="modal-span">메세지 보내기</span>
                <img
                  className="close-img"
                  src={iconClose}
                  alt="close-icon"
                  onClick={onClose}
                />
              </div>
              <div className="message-content">
                <span>받는 유저</span>
                <input
                  className="message-nick"
                  type="text"
                  placeholder={userData?.memberNickName}
                  value={nickName}
                  onChange={handleNickNameChange}
                ></input>
                <input
                  className="message-title"
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={handleTitleChange}
                ></input>
                <input
                  placeholder="메세지 내용을 입력하세요"
                  className="message-text"
                  value={message}
                  onChange={handleMessageChange}
                ></input>
              </div>
              <MessageToUserButton onClick={handleSendClick}>
                보내기
              </MessageToUserButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageToUser;
