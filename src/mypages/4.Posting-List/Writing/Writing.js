import styled from "styled-components";
import MypageButton from "../../../components/MypageButton";
import WritingList from "./WritingList";
import styles from "../../MyPage.module.css";

function Writing() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>내가 쓴 글</h1>

      <WritingList />

      <div className={styles.retoucha}>
        <MypageButton type="submit" className={styles.correction}>
          삭제
        </MypageButton>
      </div>
    </div>
  );
}

export default Writing;
