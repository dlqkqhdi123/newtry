import { Link, Outlet } from "react-router-dom";
import styles from "./NotFound.module.css";
import { styled } from "styled-components";
import dog from "../assets/gallery/404페이지_01.jpg";
import GoHomeBtn from "./GoHomeBtn";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function NotFound() {
  return (
    <Container>
      <div className={styles.notFound}>
        <h1 className={styles.h1}>Not Found</h1>
        <p align="center">
          페이지의 주소가 잘못 입력되었거나,
          <br /> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <GoHomeBtn />
      </div>

      <div>
        <Outlet />
      </div>

      <div className={styles.find}>
        <h2 className={styles.h2}>강아지를 찾습니다</h2>
        <figure>
          <img className={styles.img} src={dog} alt="강아지" />
        </figure>

        <div className={styles.animal}>
          <h4>동물정보</h4>
          <div className={styles.infoBox}>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="announcementNumber">
                공고번호
              </label>
              <p className={styles.animalInfo}>대전-2022-0001</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="age">
                나이
              </label>
              <p className={styles.animalInfo}>2년 추정</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="kind">
                품종
              </label>
              <p className={styles.animalInfo}>믹스견</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="gender">
                성별
              </label>
              <p className={styles.animalInfo}>암컷</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="withdrawal">
                중성화 여부
              </label>
              <p className={styles.animalInfo}>아니요</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="characteristic">
                특징
              </label>
              <p className={styles.animalInfo}>온순함, 꼬리에 점이 있음</p>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <h4>검색정보</h4>
          <div className={styles.infoBox}>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="announcementNumber">
                접수일
              </label>
              <p className={styles.animalInfo}>2024-01-22</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="age">
                시도
              </label>
              <p className={styles.animalInfo}>대전광역시</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="kind">
                시군구
              </label>
              <p className={styles.animalInfo}>중구</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="gender">
                보호센터
              </label>
              <p className={styles.animalInfo}>대전동물보호센터</p>
            </div>
            <div className={styles.container2}>
              <label className={styles.label} htmlFor="withdrawal">
                보호센터 연락처
              </label>
              <p className={styles.animalInfo}>042-825-1118</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;
