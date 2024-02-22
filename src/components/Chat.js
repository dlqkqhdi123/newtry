// import React, { useState, useEffect, useRef } from "react";
// import { getDatabase, ref, push, onValue } from "./firebase";

// const Chat = ({ activeChat }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState("");
//   const messagesContainerRef = useRef();

//   useEffect(() => {
//     const chatRef = ref(database, `chat/${activeChat}`);
//     onValue(chatRef, (snapshot) => {
//       const chatData = snapshot.val();
//       if (chatData) {
//         const chatMessages = Object.values(chatData);
//         setMessages(chatMessages);
//       }
//     });

//     setUser(`User${Math.floor(Math.random() * 1000)}`);
//   }, [activeChat]);

//   useEffect(() => {
//     messagesContainerRef.current.scrollTop =
//       messagesContainerRef.current.scrollHeight;
//   }, [messages]);

//   const handleSendMessage = () => {
//     const chatRef = ref(database, `chat/${activeChat}`);
//     const newChatMessage = {
//       user,
//       text: newMessage,
//     };
//     push(chatRef, newChatMessage);

//     setNewMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h2>채팅 {activeChat}</h2>
//         <div
//           ref={messagesContainerRef}
//           style={{
//             height: "300px",
//             border: "1px solid #ccc",
//             padding: "20px",
//             overflowY: "auto",
//           }}
//         >
//           {messages.map((message, index) => (
//             <div key={index}>
//               <strong>{message.user}:</strong> {message.text}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="메시지 입력"
//         />
//         <button onClick={handleSendMessage}>전송</button>
//       </div>
//     </div>
//   );
// };

// const ChatApp = () => {
//   const [activeChat, setActiveChat] = useState(1);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setActiveChat(1)}>채팅 1</button>
//         <button onClick={() => setActiveChat(2)}>채팅 2</button>
//       </div>
//       <Chat activeChat={activeChat} />
//     </div>
//   );
// };

// export default ChatApp;
