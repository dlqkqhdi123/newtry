import React from "react";
import { Link } from "react-router-dom";
import "./MainPageThree.css";
import MbtiImg from "../assets/source/멍냥.png";
import catFish from "../assets/source/main_fish_cat.svg";

function MainPageThree() {
  return (
    <div className="Container3">
      <img className="cat-fish" src={catFish} />
      <div className="context3">
        <div className="context3-top">
          <p>PET</p>
          <h3>MBTI</h3>
        </div>
        <div className="context3-bottom">
          <p>
            우리 아이의 성격은 어떨까?
            <br />
            우리 아이의 행동 및 성격으로 알아보는 Mbti
          </p>
          <ul>
            <span className="li-FirstLine">
              <li># 반려견 Mbti </li>
              <li># 반려묘 Mbti </li>
            </span>
            <li># 내 Mbti를 알려줘멍냥!</li>
          </ul>
          <Link to="/mbti" className="StyleLink" target="_blank">
            <span className="Inner2">More</span>
          </Link>
        </div>
      </div>

      <div className="Mbti">
        <img src={MbtiImg} alt="Pet Image" />
      </div>
    </div>
  );
}
export default MainPageThree;
