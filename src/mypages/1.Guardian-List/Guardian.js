import MypageButton from "../../components/MypageButton";
import styles from "../MyPage.module.css";
import style from "./Guardian.module.css";
import React, { useEffect, useState } from "react";
import GuardianModal from "./GuardianModal";
import Overlay from "../Overlay";
import {
  getFirebaseDocument,
  nickDatas,
  updateFirebaseDocument,
} from "../../api/firebase";

function Guardian() {
  const [modalOpen, setModalOpen] = useState(false);
  const [guardianInfo, setGuardianInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    nickname: "",
  });
  const [isNickName, setIsNickName] = useState(false);
  const [nickName, setNickName] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const onChangeNickName = (e) => {
    const currentName = e.target.value;
    setGuardianInfo((prevState) => ({
      ...prevState,
      nickname: currentName,
    }));

    if (currentName.length < 2 || currentName.length > 5) {
      setIsNickName(false);
      setNameMessage("사용불가능한 닉네임 입니다.");
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsNickName(true);
    }
  };
  const handleNickAjax = () => {
    const currentNickname = guardianInfo.nickname;
    console.log("1");
    console.log(currentNickname);

    if (currentNickname.trim() === "") {
      setNameMessage("닉네임을 입력해주세요.");
      console.log("2");
      setIsNickName(false);
      alert("닉네임을 입력해주세요.");
    } else {
      console.log("3");
      nickDatas("member", currentNickname)
        .then((memberResult) => {
          console.log("4");
          console.log(memberResult);
          if (memberResult === 0) {
            alert("사용 가능한 닉네임 입니다.");
            setIsNickName(true);
          } else {
            setNameMessage("중복된 닉네임 입니다.");
            setIsNickName(false);
          }
        })
        .catch((error) => {
          console.log("5");
          console.error("닉네임 확인 중 오류 발생:", error);
        });
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member && member.memberId) {
      getFirebaseDocument(setGuardianInfo);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setGuardianInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFirebaseDocument(guardianInfo).then(() => {
      getFirebaseDocument(setGuardianInfo);
    });
  };

  const member = guardianInfo;

  const inputFields = [
    {
      id: "name",
      label: "이름",
      type: "text",
      placeholder: member.name,
    },
    {
      id: "phoneNumber",
      label: "연락처",
      type: "text",
      placeholder: member.phoneNumber,
    },
    {
      id: "email",
      label: "이메일",
      type: "email",
      placeholder: member.email,
    },
    {
      id: "nickname",
      label: "닉네임",
      type: "text",
      placeholder: member.nickname,
      extraButton: true,
      onChange: onChangeNickName,
    },
  ];

  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1}>보호자 정보 관리</h1>

      <form className={style.infoBox} onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <div className={style.container2} key={field.id}>
            <label className={style.label} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              className={style.input}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              value={guardianInfo[field.id]}
              onChange={field.onChange || handleChange}
            />
            {field.extraButton && (
              <>
                <p className={`${isNickName} ? "true" : "false"`}>
                  &nbsp;{nameMessage}
                </p>
                <input
                  type="button"
                  className="member-btn"
                  id="nick_ajax"
                  value="중복확인"
                  onClick={handleNickAjax}
                />
              </>
            )}
          </div>
        ))}

        <div className={style.container2}>
          <label className={style.label} htmlFor="withdrawal">
            회원탈퇴
          </label>

          <div>
            <MypageButton
              type="submit"
              style={{ width: "7rem", height: "2.3rem", margin: "0" }}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              탈퇴하기
            </MypageButton>
          </div>
        </div>
      </form>
      <div className={styles.retouch}>
        <MypageButton type="submit" onClick={handleSubmit}>
          수정하기
        </MypageButton>
      </div>

      {modalOpen && <Overlay modalOpen={modalOpen} />}
      {modalOpen && <GuardianModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default Guardian;
