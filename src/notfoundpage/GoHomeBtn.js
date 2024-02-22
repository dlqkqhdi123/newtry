import { Link } from "react-router-dom";
import styles from "./GoHomeBtn.module.css";

function GoHomeBtn() {
  return (
    <Link to="/" className={styles.button}>
      <div className={styles.icon} alt="">
        <div className={styles.h4}>Go Home!</div>
      </div>
    </Link>
  );
}

export default GoHomeBtn;
