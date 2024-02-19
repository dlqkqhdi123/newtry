import fiv from "../assets/cat/고질병_FIV.svg";
import styles from "./DogCat.module.css";
function DogCat() {
  return (
    <div>
      <img className={styles.img} src={fiv} />
    </div>
  );
}

export default DogCat;
