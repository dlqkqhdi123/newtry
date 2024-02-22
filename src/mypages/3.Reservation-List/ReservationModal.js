import styless from "./ReservationModal.module.css";
import style from "../Modal.module.css";
import { ReactComponent as Close } from "../../assets/icon/icon-close_w.svg";
import { useEffect, useState } from "react";
import {
  getFirebaseDocument,
  getReservation,
  getReservationByNumber,
} from "../../api/firebase";

function ReservationModal({ setModalOpen, reservationNumber }) {
  const [reserv, setReserv] = useState();
  const [reservation, setReservation] = useState();

  useEffect(() => {
    const fetchReservData = async () => {
      const member = JSON.parse(localStorage.getItem("member"));
      if (member && member.memberId) {
        getFirebaseDocument(setReserv);
        if (reservationNumber) {
          const reservationData = await getReservation(
            member.memberId,
            reservationNumber
          );
          setReservation(reservationData);
        } else {
          console.error("reservationNumber is undefined");
        }
      }
    };

    fetchReservData();
  }, [reservationNumber]);

  console.log(reserv);
  console.log(reservation);
  console.log(reservationNumber);

  const listBoxFields = [
    {
      id: "name",
      label: "보호자 성명",
      type: "text",
      placeholder: reserv ? reserv.name : "",
    },
    {
      id: "petName",
      label: "펫 이름",
      type: "text",
      placeholder: reservation ? reservation.petName : "머임",
    },
    {
      id: "petType",
      label: "펫 종류",
      placeholder: reservation ? reservation.petKind : "머임",
    },
    {
      id: "phoneNumber",
      label: "연락처",
      placeholder: reserv ? reserv.phoneNumber : "",
    },
    {
      id: "hospital",
      label: "병원명",
      placeholder: reservation ? reservation.partner : "머임",
    },
    {
      id: "date",
      label: "예약일자",
      placeholder: reservation ? reservation.Date : "머임",
    },
    {
      id: "Symptom",
      label: "증상 또는 병명",
      placeholder: reservation ? reservation.Symptom : "머임",
    },
  ];

  return (
    <div className={style.modalbox} style={{ width: "60rem", height: "800px" }}>
      <div className={style.header}>
        <h4>내 예약목록</h4>
        <button
          className={style.closebtn}
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <Close />
        </button>
      </div>
      <div className={styless.bookingbody}>
        <form className={styless.bookingList}>
          {listBoxFields.map((list) => (
            <div className={styless.container} key={list.id}>
              <label className={styless.label} htmlFor={list.id}>
                {list.label}
              </label>
              <p className={styless.text}>{list.placeholder}</p>
            </div>
          ))}
        </form>

        <button
          className={style.button2}
          type="submit"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          취소하기
        </button>
      </div>
    </div>
  );
}

export default ReservationModal;
