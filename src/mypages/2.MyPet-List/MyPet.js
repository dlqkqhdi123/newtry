import MypageButton from "../../components/MypageButton";
import styles from "../MyPage.module.css";
import Profile from "./Profile";
import FileInput from "./FileInput";
import SlideList from "./SlideList";
import style from "./MyPet.module.css";
import SideBar from "../SideBar";
import { useState } from "react";

function MyPet() {
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  return (
    <div className={style.container2}>
      <div style={{ width: "100%" }}>
        <h1 className={styles.h1}>마이펫 관리</h1>
        <SlideList />
        <div className={styles.retouch}>
          <MypageButton
            type="submit"
            style={{ margin: "2.5rem" }}
            onClick={handleClick}
          >
            마이펫 추가하기
          </MypageButton>
        </div>
        <div className={style.line} />
        {showProfileForm && (
          <div style={{ margin: "0 auto" }}>
            <div className={style.profil}>
              <div className={style.album}>
                <form className={style.poto}></form>
              </div>

              <Profile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPet;
