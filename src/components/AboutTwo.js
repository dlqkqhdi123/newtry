import React from "react";
import "./AboutTwo.css";
import catBall from "../assets/source/About_ball_cat.svg";
import catBallLine_01 from "../assets/source/About_ball_cat_line_01.svg";
import catBallLine_02 from "../assets/source/About_ball_cat_line_02.svg";
import catBallLine_03 from "../assets/source/About_ball_cat_line_03.svg";
import catBallMini from "../assets/source/About_ball_cat_mini.svg";
import catHi from "../assets/source/About_cat.gif";
import catBalbadag from "../assets/source/footprint_cat_s.svg";

function AboutTwo() {
  return (
    <div className="Container-about-two">
      <img className="cat-ball" src={catBall} />
      <img className="cat-ball-line-01" src={catBallLine_01} />
      <img className="cat-ball-line-02" src={catBallLine_02} />
      <img className="cat-ball-line-03" src={catBallLine_03} />
      <div className="cat-ball-shadow" />
      <img className="cat-ball-mini" src={catBallMini} />
      <div className="cat-ball-mini-shadow" />

      <div className="context-about-two">
        <h3>Pet Partner</h3>
        <p>
          치료방법에 따라 달라질 수 있는
          <br /> 진료비 · 약제비 정보를 정확히 제공하고,
          <br /> 병원과 약국의 매출 증대를 위한
          <br /> 최상의 마케팅 서비스를 제공하겠습니다.
        </p>
      </div>

      <div className="cat-hi">
        <img src={catHi} alt="cat image" />
        <img
          src={catBalbadag}
          className="cat-balbadag"
          alt="cat footprint image"
        />
      </div>
    </div>
  );
}

export default AboutTwo;
