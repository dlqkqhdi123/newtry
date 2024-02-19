import React from "react";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <div className={styles.sidecontainer}>
        <ul className={styles.sideUl}>
          <Link className={styles.text} to="/mypage">
            <li>업체 정보 관리</li>
          </Link>

          <Link className={styles.text} to="ReservationList">
            <li>예약 목록</li>
          </Link>
          <Link className={styles.text} to="BoardManagement">
            <li>게시글 관리</li>
          </Link>
          <Link to="partnerCompany" className={styles.text}>
            <li>제휴 업체</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
