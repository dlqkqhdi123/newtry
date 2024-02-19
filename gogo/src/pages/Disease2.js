import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import styles from "./Disease.module.css";
import { Link } from "react-router-dom";
import { getDatas } from "../api/firebase";
import CatItem from "../components/CatItem";
import catCursor from "../assets/mouse_cat.png";
import catCursorActive from "../assets/mouse_cat_after.png";
import styled from "styled-components";

const Cursor = styled.div`
  cursor: url(${catCursor}) 20 30, auto;
  & > a {
    cursor: url(${catCursor}) 20 30, auto;
  }
  &:active {
    cursor: url(${catCursorActive}) 20 30, auto;
  }
`;

function Disease2() {
  const [items, setItems] = useState([]);
  const [isInit, setIsInit] = useState(true);

  const handleLoad = async () => {
    const courseItems = await getDatas("Cat");
    setItems(courseItems);
    setIsInit(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Cursor>
      <h1 className={styles.title}>Disease</h1>
      <div className={styles.btnWrap}>
        <Link to="/Dog">
          <Button buttonText="반려견" />
        </Link>
        <Link to="/Disease2">
          <Button buttonText="반려묘" />
        </Link>
      </div>
      <p className={styles.choice}>
        아래의 증상 중 &nbsp; <span>한 가지</span>&nbsp; 를 선택하세요
      </p>
      <div>
        <div>
          {/* <p>총 {items.length}개 코스</p> */}

          {items.length === 0 && !isInit ? (
            <div></div>
          ) : (
            <div className={styles.diseaseBox}>
              {items.map((Cat) => (
                <CatItem key={Cat.code} Cat={Cat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Cursor>
  );
}

export default Disease2;
