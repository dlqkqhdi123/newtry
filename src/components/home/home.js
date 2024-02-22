import React from "react";
import { Link } from "react-router-dom";
import styles from "../home/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import main from "../../assets/img/mainimage2.png";

const Home = () => {
  const url = window.location.href;
  const copyAlert = () => {
    alert("링크 복사!");
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.middle}>
            <h2 className={styles.header}>MBTI 성격 테스트</h2>
            <p>총 16개의 MBTI유형을 기반으로</p>
            <p>가장 잘 어울리는 유형을 찾아드려요!</p>
          </div>
          <div className={styles.top}>
            <img className={styles.logo} src={main} alt="로고" />
          </div>
          <div className={styles.bottom}>
            <Link to="/petBTI" className={styles.start__button}>
              멍비티아이 하기
              <FontAwesomeIcon
              // icon={faArrowAltCircleRight}
              // className={styles.icon}
              />
            </Link>
            <Link to="/petBTI2" className={styles.start__button}>
              냥비티아이 하기
              {/* <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className={styles.icon}
              /> */}
            </Link>
            <CopyToClipboard text={url}>
              <button className={styles.start__button} onClick={copyAlert}>
                링크복사
                {/* <FontAwesomeIcon icon={faCopy} className={styles.icon} /> */}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
