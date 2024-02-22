import React from "react";
import MainCarousel from "./MainCarousel";
import { Link } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="Container">
      <MainCarousel />
      <p>
        진료비 DB 기반 조회, 질병검색, 동물병원·약국 추천 및 예약서비스를
        제공하여
        <br />
        보다 편리하고 이로운 펫 라이프를 만족할 수 있습니다.
      </p>
      <Link to="About" className="StyleLink-main">
        <span className="Inner-main">More</span>
      </Link>
    </div>
  );
}
export default MainPage;
