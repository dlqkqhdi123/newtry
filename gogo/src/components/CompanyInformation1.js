import React, { useEffect, useState } from "react";
import styles from "./LgMyPage.module.css";
import MyPageButton from "./MyPageButton";

import {
  db,
  doc,
  getFirebaseDocument,
  updateDoc,
  updateFirebaseDocument,
} from "../api/firebase";
import LgOverlay from "./LgOverlay";

function CompanyInformation1() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lg, setLg] = useState(() => {
    const lgFromLocalStorage = JSON.stringify(localStorage.getItem("lg"));
    return (
      lgFromLocalStorage || {
        hosName: "",
        phoneNumber: "",
        memberAdress: "",
        businessHours: "",
        yescarnocar: "",
      }
    );
  });

  const member = lg;
  // const [lg, setLg] = useState({
  //   hosName: "",
  //   phoneNumber: "",
  //   memberAdress: "",
  //   businessHours: "",
  // });

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member && member.memberId) {
      getFirebaseDocument(setLg);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const member = JSON.parse(localStorage.getItem("member"));
    const memberId = member?.memberId;
    const memberRef = doc(db, "member", memberId);
    try {
      await updateFirebaseDocument(memberRef, lg);
      console.log("Data updated successfully");
      localStorage.setItem("lg", JSON.stringify(lg));
      console.log("lg", lg);

      console.log("lg 상태 localStorage에 저장", localStorage.getItem("lg"));
      getFirebaseDocument(setLg);

      // console.log("lg 상태", lg);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // console.log(member);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLg((prevState) => ({
      ...prevState,
      [id]: value !== undefined ? value : "", // undefined인 경우 빈 문자열로 대체
    }));
  };

  const inputFields = [
    {
      id: "hosName",
      label: "업체명",
      type: "text",
      placeholder: member.hosName,
    },
    {
      id: "phoneNumber",
      label: "대표번호",
      type: "text",
      placeholder: member.phoneNumber,
    },

    {
      id: "memberAdress",
      label: "주소",
      type: "text",
      placeholder: member.memberAdress,
    },
    {
      id: "businessHours",
      label: "운영시간",
      type: "text",
      placeholder: member.businessHours,
    },
    {
      id: "yesCarNoCar",
      label: "주차",
      type: "text",
      placeholder: member.yescarnocar,
    },
  ];

  return (
    <div className={styles.boxbox}>
      <div>
        <h1 className={styles.headhead}>정보관리</h1>

        <form className={styles.infoBox} onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <div className={styles.container2} key={field.id}>
              <label className={styles.label} htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className={styles.input}
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={lg[field.id]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className={styles.container2}>
            <label className={styles.label} htmlFor="withdrawal">
              회원탈퇴
            </label>
            <div>
              <MyPageButton
                type="button"
                style={{ width: "7rem", height: "2.3rem", margin: "0" }}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                탈퇴하기
              </MyPageButton>
            </div>
          </div>
        </form>
        <div className={styles.retouch}>
          <MyPageButton type="submit" onClick={handleSubmit}>
            수정하기
          </MyPageButton>
        </div>

        {modalOpen && <LgOverlay modalOpen={modalOpen} />}
      </div>
    </div>
  );
}
export default CompanyInformation1;
