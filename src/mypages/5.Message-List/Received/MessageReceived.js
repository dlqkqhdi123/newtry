import MypageButton from "../../../components/MypageButton";
import MessageReceivedList from "./MessageReceivedList";
import styles from "../../MyPage.module.css";

function MessageReceived() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>받은 메세지</h1>

      <MessageReceivedList />

      <div className={styles.retouch_a}>
        <MypageButton type="submit" className={styles.correction}>
          삭제
        </MypageButton>
      </div>
    </div>
  );
}

export default MessageReceived;
