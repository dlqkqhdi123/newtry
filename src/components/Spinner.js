import React, { useEffect, useState } from "react";
import dog from "../assets/source/loading_dog.gif";
import cat from "../assets/source//loading_cat.gif";
import "./Spinner.css";

function Spinner({ closeModal }) {
  const [randomSrc, setRandomSrc] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 2000);

    return () => clearTimeout(timer);
  }, [closeModal]);

  useEffect(() => {
    const randomImageSrc = Math.random() < 0.5 ? dog : cat;
    setRandomSrc(randomImageSrc);
  }, []);

  return (
    <div className="spinner open">
      <img src={randomSrc} alt="Spinner" className="inner" />
    </div>
  );
}

export default Spinner;
