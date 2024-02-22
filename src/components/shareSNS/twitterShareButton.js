import React from "react";
import styles from "./shareIcon.module.css";
import { FaXTwitter } from "react-icons/fa6";
import share from "../../assets/img/insta_logo_r__FFC26F.svg";

const TwitterShareButton = () => {
  return (
    <div>
      <a
        className="twitter-share-button"
        href="https://www.instagram.com/"
        data-size="large"
      >
        <img
          src={share}
          alt="kakao-share-icon"
          className={styles.kakao__icon}
        />
        {/* <FaXTwitter className={styles.twitter__icon} /> */}
      </a>
    </div>
  );
};

export default TwitterShareButton;
