import { useEffect, useState } from "react";
import Container from "./Container";
import { FiChevronUp } from "react-icons/fi";
import "./Footer.css";
import { Link } from "react-router-dom";
import Logo_footer from "../assets/logo/Logo_footer_w.svg";

function Footer() {
  const [showInfo, setShowInfo] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const handleIconClick = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (showInfo) {
      setMaxHeight(50);
    } else {
      setMaxHeight(0);
    }
  }, [showInfo]);

  return (
    <div className="footer">
      <Container>
        <ul
          className="links"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <li>
            <Link to="customerservice" className="customer-service">
              <img src={Logo_footer} className="footer-img" />
            </Link>
          </li>
          <li>
            <span className="footerspan">
              <Link to="termsofuse" className="terms">
                이용약관
              </Link>
            </span>
            <span>
              <Link to="privacypolicy" className="privacy">
                개인정보처리방침
              </Link>
            </span>
          </li>
        </ul>
        <ul className="info">
          <li style={{ fontFamily: "LibreBaskerville" }}>
            HOSPETAL{" "}
            <FiChevronUp
              style={{
                transform: `rotate(${showInfo ? 180 : 0}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
              onClick={handleIconClick}
            />
          </li>
        </ul>
        {showInfo && (
          <ul
            className="hidden-info"
            style={{
              maxHeight: `${maxHeight}px`,
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
            }}
          >
            <li className="hidden-info-li">
              주식회사 호스펫탈 34838 대전광역시 중구 중앙로121번길 20 (선화동
              41) 2층 사업자 등록번호 : 1234-56-78910 <br />
              TEL : 042-123-4567 FAX : 00-1111-2222
            </li>
          </ul>
        )}
        <ul className="info">
          <li
            className="hidden-infos"
            style={{ fontFamily: "LibreBaskerville", fontSize: "12px" }}
          >
            Copyright 2023. Hospetal All rights reserved.
          </li>
        </ul>
        <div>
          <div></div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
