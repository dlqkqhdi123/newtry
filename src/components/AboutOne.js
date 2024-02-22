import React from "react";
import "./AboutOne.css";
import dogBall from "../assets/source/About_ball_dog.svg";
import dogHi from "../assets/source/About_dog.gif";
import dogBalbadag from "../assets/source/footprint_dog_s.svg";

function AboutOne() {
  return (
    <div className="Container-about-one">
      <img className="dog-ball" src={dogBall} />
      <div className="dog-ball-shadow" />
      <div className="dog-hi">
        <img src={dogHi} alt="dog image" />
        <img
          src={dogBalbadag}
          className="dog-balbadag"
          alt="dog footprint image"
        />
      </div>
      <div className="context-about-one">
        <h3>Pet Owner</h3>
        <p>
          펫 질병과 진료비에 대해 올바른 이해를
          <br /> 할 수 있게 정확한 정보를 제공하고,
          <br /> 가장 빠르게 펫병원 선택과 예약이 가능한
          <br /> 서비스를 제공하겠습니다.
        </p>
      </div>
    </div>
  );
}

export default AboutOne;
