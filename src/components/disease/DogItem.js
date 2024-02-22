import React from "react";
import { Link } from "react-router-dom";
import styles from "../../pages/Disease.module.css";
import DiseaseIcon from "./DiseaseIcon";
import dogCursor from "../../assets/mouse_dog.png";
import dogCursorActive from "../../assets/mouse_dog_after.png";
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

function DogItem({ qwer }) {
  return (
    <Cursor>
      <div className={styles.contentBox}>
        <StyledLink
          className={styles.diseasetitle}
          to={`/disease/${qwer.code}`}
        >
          <DiseaseIcon
            photoUrl={qwer.photoUrl}
            className={styles.diseaseTitle}
            alt="123"
          />
          <h2 className={styles.diseasetitle}>{qwer.title}</h2>
        </StyledLink>
        <div className={styles.f9f9f9}>
          <p>{qwer.summary}</p>
        </div>
      </div>
    </Cursor>
  );
}

export default DogItem;
