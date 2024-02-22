import React from "react";
import { Link } from "react-router-dom";
import "./MainPageTwo.css";
import HostpitalImg from "../assets/source/main_map.png";
import dogBone from "../assets/source/main_bone_dog.svg";

function MainPageTwo() {
  return (
    <div className="Container2">
      <img className="dog-bone" src={dogBone} />
      <div className="Hostpital-map">
        <img src={HostpitalImg} alt="Hospital Map" />
      </div>

      <div className="context2">
        <div className="context2-top">
          <p>PET</p>
          <h3>Hospital</h3>
        </div>
        <div className="context2-bottom">
          <p>
            위치기반 서비스로 빠르고 가까운 병원·약국을
            <br />
            빠르고 정확하게 알려주는 서비스!
          </p>
          <ul>
            <span className="li-FirstLine">
              <li># 동물병원 </li>
              <li># 동물약국 </li>
            </span>
            <li># 아프지마라멍냥!</li>
          </ul>
          <Link to="/hospital" className="StyleLink2">
            {/* 이동경로만 변경해주세요  */}
            <span className="Inner2">More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MainPageTwo;
