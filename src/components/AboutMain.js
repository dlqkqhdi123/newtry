import React from "react";
import "./AboutMain.css";
import AboutMainImg from "../assets/source/About.png";

const AboutMain = () => {
  return (
    <div className="Container-about">
      <img src={AboutMainImg} alt="About Main image" />
      <div className="context-about-top">
        <h3>About</h3>
        <p>
          우리 아이의 시간을 더 행복하게, 반려인의 삶을 더 편하게
          <br /> 반려동물에게 줄 수 있는 최고의 선물은 반려인과 함께하는
          시간이며,
          <br /> 그 시간을 아프지않고 건강할 수 있게 진료비 DB 기반 조회,
          질병검색, 동물병원·약국 추천 및 예약서비스를
          <br /> 제공하고자 탄생하였습니다.
        </p>
      </div>
    </div>
  );
};

export default AboutMain;
