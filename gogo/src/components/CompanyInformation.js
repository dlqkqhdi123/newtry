import React, { useEffect, useState } from "react";
import styles from "./LgMyPage.module.css";
import MyPageButton from "./MyPageButton";

import {
  collection,
  db,
  getDocs,
  updateDoc,
  doc,
  getFirebaseDocument,
  updateFirebaseDocument,
} from "../api/firebase";

function CompanyInformation() {
  const [hosName, setHosName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [address, setAddress] = useState("");
  const [lg, setLg] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    nickname: "",
  });
  //임시>>
  const [memberMail, setMemberMail] = useState("");
  const [memberPass, setMemberPass] = useState("");
  //임시<<
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberAdress, setMemberAdress] = useState("");

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setLg((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member && member.memberId) {
      getFirebaseDocument(setLg);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFirebaseDocument(lg).then(() => {
      getFirebaseDocument(setLg);
    });
  };

  // 수정 버튼을 눌렀을 때 입력 폼을 활성화하는 함수
  const handleEdit = (e) => {
    const member = JSON.parse(localStorage.getItem("member"));
    setHosName(member.hosName);
    setMemberPhone(member.phoneNumber);
    setSpecialty(member.memberMail);
    setBusinessHours(member.businessHours);
    setMemberAdress(member.memberAdress);
    setIsEditMode(true);
  };

  const member = JSON.parse(localStorage.getItem("member"));
  const memberId = member.memberId;

  // 저장 버튼을 눌렀을 때 정보를 업데이트하고 입력 폼을 비활성화하는 함수
  const handleSave = async () => {
    // Firebase 데이터 업데이트 로직
    const memberRef = doc(db, "member", memberId);

    const updatedData = {
      hosName: hosName,
      memberId: memberId,
      memberMail: memberMail,
      businessHours: businessHours,
      memberAdress: memberAdress,
    };
    console.log(businessHours);

    await updateDoc(memberRef, updatedData); // updateDoc 함수를 사용하여 데이터 업데이트
    console.log(memberRef);

    // 로컬 스토리지 업데이트
    const quddnjs1 = localStorage.setItem(
      "member",
      JSON.stringify(updatedData)
    );
    console.log(quddnjs1);
    // 업데이트 후 데이터 다시 불러오기
    setHosName(updatedData.hosName);
    setMemberPhone(updatedData.memberPhone);
    setSpecialty(updatedData.memberMail);
    setBusinessHours(updatedData.businessHours);
    setAddress(updatedData.memberAdress);

    setIsEditMode(false);
  };

  return (
    <div className={styles.disContainer}>
      <div>
        <h1 className={styles.companyTitle}>정보관리</h1>
        {isEditMode ? (
          <form className={styles.formgrid} onSubmit={handleSubmit}>
            <label className={styles.label}>업체명: </label>
            <input
              type="text"
              value={hosName}
              onChange={(e) => setHosName(e.target.value)}
              className={styles.container2}
            />

            <label className={styles.label}>대표전화:</label>
            <input
              type="text"
              value={memberPhone}
              onChange={(e) => setMemberPhone(e.target.value)}
              className={styles.container2}
            />
            <label className={styles.label}>전문분야:</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className={styles.container2}
            />

            <label className={styles.label}>운영시간:</label>
            <input
              type="text"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              className={styles.container2}
            />

            <label className={styles.label}>주소:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.container2}
            />

            <MyPageButton type="button" onClick={handleSave}>
              저장
            </MyPageButton>
          </form>
        ) : (
          <div className={styles.formgrid}>
            <p className={styles.label}>업체명:</p>
            <p className={styles.container2}>{member?.hosName}</p>
            <p className={styles.label}>대표전화:</p>
            <p className={styles.container2}>{member?.memberPhone}</p>
            <p className={styles.label}>전문분야:</p>
            <p className={styles.container2}>{member?.memberMail}</p>
            <p className={styles.label}>운영시간:</p>
            <p className={styles.container2}>{member?.businessHours}</p>
            <p className={styles.label}>주소:</p>
            <p className={styles.container2}>{member?.memberAdress}</p>

            <MyPageButton type="button" onClick={handleEdit}>
              수정
            </MyPageButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyInformation;
