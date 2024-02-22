import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import {
  collection,
  db,
  getDatas,
  getDocs,
  getTechInfo,
  updateDatas, // updateDatas 함수 추가
} from "../api/firebase";

function CompanyInformation() {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [address, setAddress] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    async function fetchData(collectionName) {
      try {
        const techInfo = await getTechInfo(collectionName);
        console.log(techInfo); // 불러온 데이터 확인
        setCompanyName(techInfo.companyName);
        setPhoneNumber(techInfo.phoneNumber);
        setSpecialty(techInfo.specialty);
        setBusinessHours(techInfo.businessHours);
        setAddress(techInfo.address);
      } catch (error) {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      }
    }

    fetchData("techInfo"); // 원하는 컬렉션 이름으로 대체해주세요
  }, []);

  // 수정 버튼을 눌렀을 때 입력 폼을 활성화하는 함수
  const handleEdit = (e) => {
    setIsEditMode(true);
  };

  // 저장 버튼을 눌렀을 때 정보를 업데이트하고 입력 폼을 비활성화하는 함수
  const handleSave = async () => {
    // Firebase 데이터 업데이트 로직
    const techInfoRef = collection(db, "techInfo");
    console.log(techInfoRef);
    const techInfoDocs = await getDocs(techInfoRef);

    if (techInfoDocs.length > 0) {
      const techInfoId = techInfoDocs[0].id; // 첫 번째 문서의 ID

      console.log(techInfoId);
      const updatedData = {
        companyName: companyName,
        phoneNumber: phoneNumber,
        specialty: specialty,
        businessHours: businessHours,
        address: address,
      };

      await updateDatas("techInfo", techInfoId, updatedData); // updateDatas 함수를 사용하여 데이터 업데이트

      // 업데이트 후 데이터 다시 불러오기
      const updatedTechInfo = await getTechInfo("techInfo");
      setCompanyName(updatedTechInfo.companyName);
      setPhoneNumber(updatedTechInfo.phoneNumber);
      setSpecialty(updatedTechInfo.specialty);
      setBusinessHours(updatedTechInfo.businessHours);
      setAddress(updatedTechInfo.address);
    }

    setIsEditMode(false);
  };

  return (
    <div className={styles.disContainer}>
      <h1 className={styles.companyTitle}>마이페이지</h1>
      {isEditMode ? (
        <form>
          <label>업체명:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={styles.container2}
          />

          <label>대표전화:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.container2}
          />
          <label>전문분야:</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className={styles.container2}
          />

          <label>운영시간:</label>
          <input
            type="text"
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
            className={styles.container2}
          />

          <label>주소:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.container2}
          />

          <button type="button" onClick={handleSave}>
            저장
          </button>
        </form>
      ) : (
        <div>
          <p className={styles.container2}>업체명: {companyName}</p>
          <p className={styles.container2}>대표전화: {phoneNumber}</p>
          <p className={styles.container2}>전문분야: {specialty}</p>
          <p className={styles.container2}>운영시간: {businessHours}</p>
          <p className={styles.container2}>주소: {address}</p>

          <button type="button" onClick={handleEdit}>
            수정
          </button>
        </div>
      )}
    </div>
  );
}

export default CompanyInformation;
