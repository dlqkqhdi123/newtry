import { useState } from "react";
import styles from "./ReservationModal.module.css";
import closeIcon from "../assets/icon/icon-close_w.svg";
import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  db,
} from "../api/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationModalHos = ({ isOpen, onClose, hospital }) => {
  const props = useLocation();
  const navigate = useNavigate();
  const { pathname } = props;
  const [guardianName, setGuardianName] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [contact, setContact] = useState("");
  const [Date, setDate] = useState("");
  const [Symptom, setSymptom] = useState("");

  function getRandomReservationNumber() {
    return Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")
      .replace(/(\d{2})(\d{3})(\d{3})/, "$1-$2-$3");
  }

  const handleAddReservationClick = async (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    const member = JSON.parse(localStorage.getItem("member"));
    const memberId = member?.memberId;

    if (memberId) {
      try {
        const q = query(
          collection(db, "member"),
          where("memberId", "==", memberId)
        );

        const querySnapshot = await getDocs(q);
        let docId;

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            docId = doc.id;
          });
        } else {
          console.error("No matching documents.");
          return;
        }

        const reservation = {
          Date,
          Symptom,
          partner: hospital.title,
          petKind: petType,
          petName,
          condition: "예약확인중",
          reservationNumber: getRandomReservationNumber(),
        };

        querySnapshot.forEach((docSnapshot) => {
          const reservationDoc = doc(
            db,
            "member",
            docSnapshot.id,
            "Reservation",
            reservation.reservationNumber || "defaultId"
          );

          setDoc(
            reservationDoc,
            {
              ...reservation,
            },
            { merge: true }
          )
            .then(() => {
              console.log("Added reservation with ID: ", docId);
              navigate("/myPage/reservation");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      } catch (error) {
        console.error("Error in handleAddReservationClick: ", error);
      }
    } else {
      alert("로그인을 해주세요.");
      navigate("/login");
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              예약하기
              <p> {hospital ? hospital.title : "Loading..."}</p>
            </h2>
            <button className={styles.closeButton} onClick={onClose}>
              <img src={closeIcon} className={styles.closeIcon} />
            </button>
          </div>
          <div className={styles.form}>
            <div className={styles.formItem}>
              <label>보호자 성명</label>
              <input
                type="text"
                id="guardianName"
                placeholder="보호자 성명을 작성해주세요."
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="petName">펫 이름</label>
              <input
                type="text"
                id="petName"
                placeholder="반려동물 이름을 작성해주세요."
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="petType">펫 종류</label>
              <select
                id="petType"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="">선택해주세요.</option>
                <option value="dog">개</option>
                <option value="cat">고양이</option>
                <option value="other">기타</option>
                {/* 다른 동물 종류 추가 */}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="contact">연락처</label>
              <input
                type="text"
                id="contact"
                placeholder="연락처를 작성해주세요."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={11}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="Date">예약일자</label>
              <input
                type="date"
                id="Date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="Symptom">증상 또는 병명</label>
              <input
                type="text"
                id="Symptom"
                placeholder="증상 또는 병명을 작성해주세요."
                value={Symptom}
                onChange={(e) => setSymptom(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleAddReservationClick}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReservationModalHos;
