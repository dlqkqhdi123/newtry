import React from "react";
import styles from "./MyPage.module.css";
import Button from "./Button";

function ReservationList() {
  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>예약 목록 확인</h1>

      <div className={styles.retouch_a}>
        <Button type="submit" className={styles.correction}>
          취소하기
        </Button>
      </div>
    </div>
  );
}

export default ReservationList;
