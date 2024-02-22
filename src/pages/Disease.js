import React, { useEffect, useState } from "react";
import Button2 from "./../components/Button2";
import styles from "./Disease.module.css";
import { Link } from "react-router-dom";
import { getDatas } from "../api/firebase";
import DogItem from "../components/disease/DogItem";
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
  & > button {
    cursor: url(${dogCursor}) 20 30, auto;
  }
  &:active {
    cursor: url(${dogCursorActive}) 20 30, auto;
  }
`;

function Disease() {
  const [items, setItems] = useState([]);
  const [isInit, setIsInit] = useState(true);

  const handleLoad = async () => {
    const courseItems = await getDatas("qwer");
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
        <StyledLink to="/Dog">
          <Button2 buttonText="반려견" className="select" />
        </StyledLink>
        <StyledLink to="/Disease2">
          <Button2 buttonText="반려묘" />
        </StyledLink>
      </div>
      <p className={styles.choice}>
        아래의 증상 중 &nbsp; <span>한 가지</span>&nbsp; 를 선택하세요
      </p>
      <div>
        <div>
          {items.length === 0 && !isInit ? (
            <div></div>
          ) : (
            <div className={styles.diseaseBox}>
              {items.map((qwer) => (
                <DogItem key={qwer.code} qwer={qwer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Cursor>
  );
}

export default Disease;
