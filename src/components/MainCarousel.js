import React, { useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselImg1 from "../assets/source/main_01-100.jpg";
import CarouselImg2 from "../assets/source/main_02-100.jpg";
import CarouselImg3 from "../assets/source/main_03-100.jpg";
import CarouselImg4 from "../assets/source/main_04-100.jpg";
import CselLeftImg from "../assets/icon/chevron_left_bk.svg";
import CselRightImg from "../assets/icon/chevron_right_bk.svg";
import "./MainCarousel.css";

function MainCarousel() {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevClick = () => {
    setSelectedImage((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNextClick = () => {
    setSelectedImage((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const getImageSource = () => {
    switch (selectedImage) {
      case 0:
        return CarouselImg1;
      case 1:
        return CarouselImg2;
      case 2:
        return CarouselImg3;
      case 3:
        return CarouselImg4;
      default:
        return CarouselImg1; // Default to the first image
    }
  };

  return (
    <div className="custom-carousel">
      <div className="carousel-button-left" onClick={handlePrevClick}>
        <img src={CselLeftImg} alt="왼쪽 화살표" />
      </div>
      <div className="carousel-images">
        <img src={getImageSource()} alt={`이미지${selectedImage + 1}`} />
      </div>
      <div className="carousel-button-right" onClick={handleNextClick}>
        <img src={CselRightImg} alt="오른쪽 화살표" />
      </div>
    </div>
  );
}

export default MainCarousel;
