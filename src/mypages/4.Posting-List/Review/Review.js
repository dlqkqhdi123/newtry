import MypageButton from "../../../components/MypageButton";
import ReviewList from "./ReviewList";
import styles from "../../MyPage.module.css";

function Review() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>내가 쓴 후기</h1>
      <ReviewList />
      <div className={styles.retouch_a}>
        <MypageButton type="submit" className={styles.correction}>
          삭제
        </MypageButton>
      </div>
    </div>
  );
}

export default Review;
