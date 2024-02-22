import React, { useState, useEffect } from "react";
import CommonTable from "../../table/CommonTable";
import CommonTableTableRow from "../../table/CommonTableRow";
import { fetchMessagesByMemberId } from "../../../api/firebase";
import MessageModal from "./MessageModal";

const MessageReceivedList = (props) => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMessagesByMemberId().then((data) => {
      setMessages(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
    <>
      <CommonTable headersName={["", "번호", "닉네임", "쪽지제목", "날짜"]}>
        {messages.map((message, index) => (
          <CommonTableTableRow key={index}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{index + 1}</td>
            <td>{message.memberNickName}</td>
            <td
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {message.receiveTitle}
            </td>
            <td>{message.date}</td>
          </CommonTableTableRow>
        ))}
      </CommonTable>
      {modalOpen && <MessageModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default MessageReceivedList;
