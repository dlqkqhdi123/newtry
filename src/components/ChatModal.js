import React, { useState, useEffect, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  setDoc, // 추가된 부분
  db,
  onSnapshot,
} from "../api/firebase";
import styles from "./ChatModal.module.css";
import closeIcon from "../assets/icon/icon-close_w.png";

const ChatModal = ({ hospital, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(""); // 사용자 정보를 가져오는 방법에 따라 수정 필요
  const messagesContainerRef = useRef();

  // 초기 메시지 추가 함수
  const addInitialMessage = async () => {
    const initialMessage = {
      user: hospital.title,
      text: "안녕하세요! 도움이 필요하신가요?",
    };
    const chatRef = collection(db, "hospital", hospital.title, "message");
    await addDoc(chatRef, initialMessage);
  };

  // 메시지 불러오는 함수
  const fetchMessages = async () => {
    const chatRef = collection(db, "hospital", hospital.title, "message");
    const querySnapshot = await getDocs(chatRef);
    const chatData = querySnapshot.docs.map((doc) => doc.data());
    setMessages(chatData);
  };

  useEffect(() => {
    // const auth = getAuth();

    // const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    //   setUser(authUser);
    // });

    addInitialMessage(); // 초기 메시지 추가

    const unsubscribe = onSnapshot(
      collection(db, "hospital", hospital.title, "message"),
      (snapshot) => {
        const chatData = snapshot.docs.map((doc) => doc.data());
        setMessages(chatData);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchMessages(); // 컴포넌트가 마운트될 때 한 번만 실행
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (hospital) {
      const chatRef = collection(db, "hospital", hospital.title, "message");

      const newChatMessage = {
        user: user,
        text: newMessage,
      };

      // 메시지를 추가.
      const hospitalDocRef = doc(db, "hospital", hospital.title);
      const hospitalDocSnapshot = await getDocs(hospitalDocRef); // 추가된 부분

      if (hospitalDocSnapshot.empty) {
        await setDoc(hospitalDocRef, {
          messages: [newChatMessage],
        });
      } else {
        await updateDoc(hospitalDocRef, {
          messages: arrayUnion(newChatMessage),
        });
      }

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.h2}>병원 채팅</h2>
          <button onClick={onClose} className={styles.closeBtns}>
            <img src={closeIcon} className={styles.closeBtnss} />
          </button>
        </div>
        <div className={styles.messagesContainer} ref={messagesContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={styles.content}>
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.messageInput}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="메시지 입력"
          />
          <button
            className={styles.submitBtn}
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
