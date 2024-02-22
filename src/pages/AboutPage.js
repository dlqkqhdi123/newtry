import React from "react";
import AboutMain from "../components/AboutMain";
import AboutOne from "../components/AboutOne";
import AboutTwo from "../components/AboutTwo";
import AboutThree from "../components/AboutThree";
import ScrollTopButton from "../components/ScrollTop";

function AboutPage() {
  return (
    <div>
      <AboutMain />
      <AboutOne />
      <AboutTwo />
      <AboutThree />
      <ScrollTopButton />
    </div>
  );
}

export default AboutPage;
