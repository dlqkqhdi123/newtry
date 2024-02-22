import React, { useEffect, useState } from "react";
import { collection, db, getData, getDatas, getDocs } from "../../api/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Cat.module.css";
// import Button2 from "./Button2";
import DiseaseIcon from "./DiseaseIcon";
import DiseaseTitleIcon from "./DiseaseTitleIcon";
import styled from "styled-components";
import catCursor from "../../assets/mouse_cat.png";
import catCursorActive from "../../assets/mouse_cat_after.png";
import foot from "../../assets/img/발바닥_or.png";

const Cursor = styled.div`
  cursor: url(${catCursor}) 20 30, auto !important;
  & > a {
    cursor: url(${catCursor}) 20 30, auto !important;
  }
  &:active {
    cursor: url(${catCursorActive}) 20 30, auto !important;
  }
`;

const StyledLink = styled(Link)`
  cursor: url(${catCursor}) 20 30, auto !important;
  &:active {
    cursor: url(${catCursorActive}) 20 30, auto !important;
  }
`;

function Cat() {
  const [items, setItems] = useState();
  const { id } = useParams();

  const handleLoad = async () => {
    const result = await getData("Cat", "id", "==", id);
    setItems(result);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, "Cat"));
      const data = query.docs.map((doc) => doc.data());
      // 여기서 추가적인 로직을 구현합니다.
      // 예를 들어, 데이터를 가공하거나 상태를 업데이트하는 등의 작업을 수행할 수 있습니다.
    };

    fetchData();
  }, [items]);

  return (
    <div className={styles.container}>
      <Cursor>
        <header className={styles.gogogo}>
          <StyledLink to="/Disease2">
            {items && items.photoTitle ? (
              <DiseaseTitleIcon
                photoTitle={items.photoTitle}
                className={styles.diseaseHead}
                alt="123"
              />
            ) : null}
          </StyledLink>
          <h1 className={styles.title}>{items?.title}</h1>
        </header>

        {items ? (
          <div>
            <ul className={styles.box}>
              {items.topics.map(({ topic }) => (
                <li key={topic.code}>
                  <div className={styles.header}>
                    <div className={styles.img}>
                      <DiseaseIcon
                        photoUrl={topic.photoUrl}
                        className={styles.diseaseImg}
                        alt="123"
                      />
                    </div>
                    <h1 className={styles.content}>{topic.title}</h1>
                    <p>{topic.subheading}</p>
                    <div className={styles.f9f9f9}>
                      <p>{topic.summary}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.bottomBox}>
              <h1 className={styles.playboy}>
                내 위치에서 가까운 <span> 병원 예약</span> 을 해보세요!
              </h1>
              <Link to="/hospital" className={styles.linkButton}>
                <button className={styles.bottomButton}>
                  병원 예약하기
                  <img className={styles.bottomButtonImg} src={foot} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>일단 기다려봐</div>
        )}
      </Cursor>
    </div>
  );
}

export default Cat;
