import React from "react";
import ScrollTopImage from "../assets/icon/icon_scrolltop.svg";
import "./ScrollTopBtn.css";

function ScrollTopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="scroll-button" onClick={scrollToTop}>
      <img src={ScrollTopImage} alt="scroll to top" />
      <p>top</p>
    </button>
  );
}

export default ScrollTopBtn;
