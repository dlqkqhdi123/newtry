import styles from "./DiseaseIcon.module.css";
import rhdiddlrhwlfqudsjs from "../../assets/고양이고질병_none.svg";
import sorhksjs from "../../assets/내과_none.svg";
import rhdiddldlfqksdhlrhksjs from "../../assets/일반외과_none.svg";
import ehrmdlfqksdhlrhksjs from "../../assets/일반외과_none.svg";
import rhdiddlwjdguddhlrhksjs from "../../assets/정형외과_none.svg";
import ehrmwjdguddhlrhksjs from "../../assets/정형외과_none.svg";
import rhdiddldksrhksjs from "../../assets/안과_cat_none.svg";
import rhdiddlclrhksjs from "../../assets/치과_cat_none.svg";
import rhdiddlvlqnrhksjs from "../../assets/피부과_cat_none.svg";
import ehrmdksrhksjs from "../../assets/안과_dog_none.svg";
import ehrmclrhksjs from "../../assets/치과_dog_none.svg";
import ehrmvlqnrhksjs from "../../assets/피부과_dog_none.svg";

const TITLE = {
  rhdiddlrhwlfqudsjs: rhdiddlrhwlfqudsjs,
  sorhksjs: sorhksjs,
  ehrmdksrhksjs: ehrmdksrhksjs,
  rhdiddldksrhksjs: rhdiddldksrhksjs,
  ehrmdlfqksdhlrhksjs: ehrmdlfqksdhlrhksjs,
  rhdiddldlfqksdhlrhksjs: rhdiddldlfqksdhlrhksjs,
  ehrmwjdguddhlrhksjs: ehrmwjdguddhlrhksjs,
  rhdiddlwjdguddhlrhksjs: rhdiddlwjdguddhlrhksjs,
  ehrmclrhksjs: ehrmclrhksjs,
  rhdiddlclrhksjs: rhdiddlclrhksjs,
  ehrmvlqnrhksjs: ehrmvlqnrhksjs,
  rhdiddlvlqnrhksjs: rhdiddlvlqnrhksjs,
};

function DiseaseTitleIcon({ photoTitle = "tlfvo" }) {
  console.log(photoTitle);
  return (
    <img
      className={styles.diseaseTitle}
      src={TITLE[photoTitle]}
      alt={photoTitle}
    />
  );
}

export default DiseaseTitleIcon;
