import React from "react";
import { Link } from "react-router-dom";
import styles from "../../pages/Disease.module.css";
import DiseaseIcon from "./DiseaseIcon";
import catCursor from "../../assets/mouse_cat.png";
import catCursorActive from "../../assets/mouse_cat_after.png";
import styled from "styled-components";

const Cursor = styled.div`
  cursor: url(${catCursor}) 20 30, auto !important;
  & > * {
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

function CatItem(props) {
  const { Cat } = props;

  return (
    <Cursor>
      <div className={styles.contentBox}>
        <StyledLink
          className={styles.diseasetitle}
          to={{
            pathname: `/disease2/${Cat.id}`,
            state: { Cat: Cat }, // Cat 정보를 state로 전달
          }}
        >
          <DiseaseIcon
            photoUrl={Cat.photoUrl}
            className={styles.diseaseImg}
            alt="123"
          />
          <h2 className={styles.diseasetitle}>{Cat.title}</h2>
        </StyledLink>
        <div className={styles.f9f9f9}>
          <p className={styles.catCursor}>{Cat.summary}</p>
        </div>
      </div>
    </Cursor>
  );
}

export default CatItem;
