import React from "react";
import styles from "./HospetalButton.module.css";

const HospetalButton = ({ className, onClick, children }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default HospetalButton;
