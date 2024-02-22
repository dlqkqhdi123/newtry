import React from "react";
import styles from "./petbti2.module.css";
import { Link, useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import KakaoBtn from "../shareSNS/kakaoShareButton";
import FacebookBtn from "../shareSNS/facebookShareButton";
import TwitterBtn from "../shareSNS/twitterShareButton";
import petbti2Api from "../../api/petbti2Api";
import IconAgain from "../../assets/icon/icon_again.svg";
import IinkCopy from "../../assets/icon/icon_linkcopy.svg";

const Petbti2 = ({ match }) => {
  const url = window.location.href;
  const { petbtiName } = useParams();
  console.log(petbtiName);
  const nation = petbti2Api.find((Petbti) => Petbti[petbtiName]);
  if (!nation) {
    return <div>존재하지않는결과입니다.</div>;
  }

  const copyAlert = () => {
    alert("복사 완료! 냥냥!");
  };

  const petbtiData = nation[petbtiName];

  return (
    <div className={styles.wrapper} key={petbtiData.id}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/">
            {/* FontAwesomeIcon을 사용하던 곳입니다. 필요하시다면 적절한 이미지나 아이콘으로 대체하세요. */}
          </Link>
        </div>
        <img src={petbtiData.img} alt="img" className={styles.main__img} />
        <div className={styles.result__type}>
          <h1 className={styles.result__city}>{petbtiData.subject}</h1>
          <br />
        </div>
        <div className={styles.result__feature}>
          <span className={styles.result__feature1}>{petbtiData.feature1}</span>
          <span className={styles.result__feature1}>{petbtiData.feature2}</span>
          <span className={styles.result__feature1}>{petbtiData.feature3}</span>
        </div>
        <div className={styles.result__title}>
          <h2>{petbtiData.id}의 특징은?</h2>
        </div>
        <ul className={styles.result__style__wrapper}>
          {petbtiData.description.map((item) => (
            <li className={styles.result__style__detail} key={item.des}>
              {item.des}
            </li>
          ))}
        </ul>
        <div className={styles.result__advice__box}>
          <div className={styles.result__advice}>
            <Link to={`/result2/${petbtiData.duo[0].subhead}`}>
              <img src={petbtiData.duo[0].img} alt="mbti캐릭터" />
            </Link>
            <div>
              <h4>함께하면 좋아요!</h4>
              <p className={styles.advice__strong}>
                찰떡궁합 그 자체 {petbtiData.duo[0].subhead}
              </p>
              <p>{petbtiData.duo[0].des}</p>
            </div>
          </div>
          <div className={styles.result__advice}>
            <Link to={`/result2/${petbtiData.counter[0].subhead}`}>
              <img src={petbtiData.counter[0].img} alt="mbti캐릭터" />
            </Link>
            <div>
              <h4>조금은 어색한 사이?</h4>
              <p className={styles.advice__strong}>
                친구가 되면 좋겠네! {petbtiData.counter[0].subhead}
              </p>
              <p>{petbtiData.counter[0].des}</p>
            </div>
          </div>
        </div>
        <div className={styles.shareBox}>
          <KakaoBtn />
          <FacebookBtn />
          <TwitterBtn />
        </div>
        <div className={styles.button__box}>
          <Link to="/mbti" className={styles.button}>
            다시하기
            <img src={IconAgain} className={styles.icon} />
          </Link>
          <CopyToClipboard text={url}>
            <button className={styles.copy__button} onClick={copyAlert}>
              링크복사
              <img src={IinkCopy} className={styles.icon} />
            </button>
          </CopyToClipboard>
          <Link to="/mbti" style={{ backgroundColor: "inherit", margin: "0" }}>
            <div className={styles.homeBtn}>
              <span className={styles.homeBtnText}>Go Home !</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Petbti2;
