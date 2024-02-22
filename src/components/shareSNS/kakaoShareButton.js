import React, { useEffect } from "react";
import styles from "./shareIcon.module.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import share from "../../assets/img/kakao logo_r__FFC26F.svg";

const KakaoShareButton = () => {
  useEffect(() => {
    KakaoShareButton();
  }, []);
  const KakaoShareButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("12960e8f1d627ea898d565f3b8ab8afb");
      }
      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "FetBIT",
          description: "내 반려동물 MBTI는?",
          imageUrl: "#",
          link: {
            mobileWebUrl: "#",
            webUrl: "#",
          },
        },
        buttons: [
          {
            title: "테스트 하기",
            link: {
              mobileWebUrl: "#",
              webUrl: "#",
            },
          },
        ],
      });
    }
  };
  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <a href="/#" id="kakao-link-btn">
        <img
          src={share}
          alt="kakao-share-icon"
          className={styles.kakao__icon}
        />
        {/* <RiKakaoTalkFill className={styles.kakao__icon} /> */}
      </a>
    </div>
  );
};
export default KakaoShareButton;
