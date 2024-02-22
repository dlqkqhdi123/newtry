import styled from "styled-components";
import MypageButton from "../../components/MypageButton";
import InquiryList from "./InquiryList";
import styles from "../MyPage.module.css";

function Inquiry() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>문의내역</h1>
      <InquiryList />
      <div className={styles.retouch_a}>
        <MypageButton type="submit" className={styles.correction}>
          삭제
        </MypageButton>
      </div>
    </div>
  );
}

export default Inquiry;
