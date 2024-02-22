import React, { useEffect, useState } from "react";
import styles from "./LgReservationModal.module.css";
import {
  collection,
  db,
  getDocs,
  updateDoc,
  doc,
  getFirebaseDocument,
  getReservationByNumber,
  LgGetReservation,
  LgGetReservationByNumber,
} from "../api/firebase";
import ModalButton from "./ModalButton";
import closeIcon from "../assets/icon/icon-close_w.svg";

function LgReservationModal({ isOpen, onClose, reservation }) {
  const [reservations, setReservations] = useState([]);
  const [fieldValues, setFieldValues] = useState([]);
  const [reserv, setReserv] = useState();

  useEffect(() => {
    const fetchReservData = async () => {
      const member = JSON.parse(localStorage.getItem("member"));
      if (member && member.memberId) {
        getFirebaseDocument(setReserv);
        if (reservation) {
          const reservationData = await LgGetReservationByNumber(
            member.memberId,
            reservation
          );
          setReservations(reservationData);
        } else {
          console.error("reservationNumber is undefined");
        }
      }
    };

    fetchReservData();
  }, [reservation]);

  console.log(reserv);
  console.log(reservations);
  console.log(reservation);
  if (!isOpen) return null;

  const listBoxFields = [
    {
      id: "name",
      label: "보호자 성명",
      type: "text",
      placeholder: reservation ? reservation.motherName : "공백",
    },
    {
      id: "petName",
      label: "펫 이름",
      type: "text",
      placeholder: reservation ? reservation.petName : "공백",
    },
    {
      id: "petType",
      label: "펫 종류",
      placeholder: reservation ? reservation.petKind : "공백",
    },
    {
      id: "phoneNumber",
      label: "연락처",
      placeholder: reservation ? reservation.phoneNumber : "공백",
    },
    {
      id: "hospital",
      label: "병원명",
      placeholder: reservation ? reservation.partner : "공백",
    },
    {
      id: "date",
      label: "예약일자",
      placeholder: reservation ? reservation.Date : "공백",
    },
    {
      id: "Symptom",
      label: "증상 또는 병명",
      placeholder: reservation ? reservation.Symptom : "공백",
    },
  ];

  async function getReservations(db) {
    const reservationsCol = collection(db, "MyPageCustomer-Reservation");
    const reservationsSnapshot = await getDocs(reservationsCol);
    const reservationsList = reservationsSnapshot.docs.map((doc) => doc.data());
    return reservationsList;
  }

  const handleSaveClick = async (value, reservationId) => {
    try {
      const reservationRef = doc(
        db,
        "MyPageCustomer-Reservation",
        reservationId
      );
      await updateDoc(reservationRef, { state: value });
      console.log("데이터가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("데이터 수정 중에 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.LgModalBoxContainer}>
          <div className={styles.modalHeader}>
            <span className={styles.LgModalSpan}>예약확인</span>
            <img
              className={styles.closeImg}
              src={closeIcon}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className={styles.LgModalContent}>
            <div className={styles.modalContentBox}>
              <form className={styles.bookingList}>
                {listBoxFields.map((list) => (
                  <div className={styles.LgModalContainer} key={list.id}>
                    <label className={styles.LgModalLabel} htmlFor={list.id}>
                      {list.label}
                    </label>
                    <p className={styles.LgModalText}>{list.placeholder}</p>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LgReservationModal;
