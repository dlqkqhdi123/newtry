import MypageButton from "../../components/MypageButton";
import ReservationList from "./ReservationList";
import styles from "../MyPage.module.css";

function Reservation() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>예약 목록 확인</h1>

      <ReservationList />

      <div className={styles.retouch_a}>
        <MypageButton type="submit" className={styles.correction}>
          취소하기
        </MypageButton>
      </div>
    </div>
  );
}

export default Reservation;
