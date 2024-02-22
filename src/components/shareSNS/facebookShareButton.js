import React from "react";
import styles from "./shareIcon.module.css";
import { CiFacebook } from "react-icons/ci";
import share from "../../assets/img/Facebook_logo_r_FFC26F.svg";

const FacebookShareButton = () => {
  const shareFacebook = () => {
    window.open("https://m.facebook.com/login/?locale=ko_KR&refsrc=deprecated");
  };
  return (
    <div>
      <a href="/#" onClick={shareFacebook}>
        <img
          src={share}
          className={styles.facebook__icon}
          alt="facebook_icon"
        />
        {/* <CiFacebook className={styles.facebook__icon} /> */}
      </a>
    </div>
  );
};

export default FacebookShareButton;
