import React from "react";
import styles from "./Card.module.css";
import classNames from "classnames";

function Card({ className, children }) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}

export default Card;
