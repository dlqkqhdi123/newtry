import React from "react";
import Main from "../components/MainPage";
import Main2 from "../components/MainPageTwo";
import Main3 from "../components/MainPageThree";
import Gallery from "../components/MainGallery";
import Pointshop from "../components/MainPointshop";
import ScrollTopButton from "../components/ScrollTopBtn";

const Homepage = () => {
  return (
    <div>
      <Main />
      <Main2 />
      <Main3 />
      <Gallery />
      <Pointshop />
      <ScrollTopButton />
    </div>
  );
};

export default Homepage;
