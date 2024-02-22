import styled from "styled-components";
import MypageButton from "../../../components/MypageButton";
import SentMessageList from "./SentMessageList";
import styles from "../../MyPage.module.css";
import style from "../../Modal.module.css";
import { ReactComponent as Close } from "../../../assets/icon/icon-close_w.svg";
import { useEffect, useState } from "react";
import Overlay from "../../Overlay";
import NoteModal from "./NoteModal";

function SentMessage() {
  let [modalOpen, setModalOpen] = useState(false);
  let [IsmodalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (IsmodalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [IsmodalOpen]);

  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>보낸 메세지</h1>
      <SentMessageList />
      <div className={styles.retouch_a}>
        <MypageButton
          type="submit"
          id="correction"
          style={{ margin: "4.5rem 2rem 4.5rem 0" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          쪽지 쓰기
        </MypageButton>
        <MypageButton type="submit" id="correction">
          삭제
        </MypageButton>
      </div>

      {(modalOpen || IsmodalOpen) && <Overlay modalOpen={modalOpen} />}
      {IsmodalOpen && <NoteModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default SentMessage;
