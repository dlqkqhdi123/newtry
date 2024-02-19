import React, { useEffect, useState } from "react";
import { collection, db, getData, getDocs } from "../api/firebase";
import { Link, useParams } from "react-router-dom";
import styles from "./Cat.module.css";
import DiseaseIcon from "./DiseaseIcon";
import DiseaseTitleIcon from "./DiseaseTitleIcon";
import dogCursor from "../assets/mouse_dog.png";
import dogCursorActive from "../assets/mouse_dog_after.png";
import styled from "styled-components";

const Cursor = styled.div`
  cursor: url(${dogCursor}) 20 30, auto;
  & > a,
  & > img,
  & > button {
    cursor: url(${dogCursor}) 20 30, auto;
  }
  &:active {
    cursor: url(${dogCursorActive}) 20 30, auto;
  }
`;

const StyledLink = styled(Link)`
  cursor: url(${dogCursor}) 20 30, auto;
  &:active {
    cursor: url(${dogCursorActive}) 20 30, auto;
  }
`;

function Dog() {
  const [items, setItems] = useState();
  const { code } = useParams();

  const handleLoad = async () => {
    const result = await getData("qwer", "code", "==", code);
    setItems(result);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, "qwer"));
      const data = query.docs.map((doc) => doc.data());
    };

    fetchData();
  }, [items]);

  return (
    <Cursor className={styles.container}>
      <div>
        <header className={styles.gogogo}>
          <StyledLink to="/Disease">
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
                    <p className={styles.subheading}>{topic.subheading}</p>
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
              <Link className={styles.linkButton}>
                <button className={styles.bottomButton}>
                  병원 예약하기
                  <img
                    className={styles.bottomButtonImg}
                    src="/image/발바닥_or.png"
                  />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Cursor>
  );
}

export default Dog;
