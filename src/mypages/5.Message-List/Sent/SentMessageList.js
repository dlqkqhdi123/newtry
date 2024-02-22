import React, { useEffect, useState } from "react";
import CommonTable from "../../table/CommonTable";
import CommonTableTableRow from "../../table/CommonTableRow";
import { fetchMessagesByMemberIdsend } from "../../../api/firebase";
import SentModal from "./SentModal";

const SentMessageList = (props) => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMessagesByMemberIdsend().then((data) => {
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
      <CommonTable headersName={["", "번호", "닉네임", "쪽지내용", "날짜"]}>
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
              {message.sendTitle}
            </td>
            <td>{message.date}</td>
          </CommonTableTableRow>
        ))}
      </CommonTable>
      {modalOpen && <SentModal setModalOpen={setModalOpen} />}
    </>
  );
};
export default SentMessageList;
