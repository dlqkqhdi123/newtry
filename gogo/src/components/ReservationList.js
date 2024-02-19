import React, { useEffect, useState } from "react";
import styles from "./LgMyPage.module.css";
import CommonTable from "./table/CommonTable";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import { collection, db, doc, getDocs } from "../api/firebase";
import ReservationModal from "./ReservationModal";
import MyPageButton from "./MyPageButton";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null); // 선택한 예약 정보를 저장하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창의 상태를 관리하는 상태

  async function getReservations(db) {
    const reservationsCol = collection(db, "MyPageCustomer-Reservation");
    const reservationsSnapshot = await getDocs(reservationsCol);
    const reservationsList = reservationsSnapshot.docs.map((doc) => doc.data());
    return reservationsList;
  }

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservations = await getReservations(db);
        setReservations(reservations);
      } catch (error) {
        console.error("예약 정보를 불러오는 중에 오류가 발생했습니다.", error);
      }
    }

    fetchReservations();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.boxbox}>
      <div>
        <h1 className={styles.headhead}>예약관리</h1>
        <CommonTable
          headersName={[
            "",
            "번호",
            "예약번호",
            "상태",
            "펫이름",
            "병원",
            "예약일자",
          ]}
        >
          {reservations.map((reservation, index) => (
            <CommonTableRow key={index}>
              <CommonTableColumn>
                <input type="checkbox" />
              </CommonTableColumn>
              <CommonTableColumn>{index + 1}</CommonTableColumn>
              <CommonTableColumn>
                <button
                  className={styles.reserbationButton}
                  onClick={() => openModal(reservation)}
                >
                  {reservation.reservationNumber}
                </button>
              </CommonTableColumn>
              <CommonTableColumn>{reservation.condition}</CommonTableColumn>
              <CommonTableColumn>{reservation.petName}</CommonTableColumn>
              <CommonTableColumn>{reservation.hospital}</CommonTableColumn>
              <CommonTableColumn>
                {reservation.reservationDate}
              </CommonTableColumn>
            </CommonTableRow>
          ))}

          {isModalOpen && (
            <ReservationModal
              isOpen={isModalOpen}
              reservation={selectedReservation}
              onClose={closeModal}
            />
          )}
          <CommonTableRow>
            <CommonTableColumn>
              <input type="checkbox" />
            </CommonTableColumn>
            <CommonTableColumn>3</CommonTableColumn>
            <CommonTableColumn>00-000-000</CommonTableColumn>
            <CommonTableColumn>예약중</CommonTableColumn>
            <CommonTableColumn>냥냥이</CommonTableColumn>
            <CommonTableColumn>한 병원</CommonTableColumn>
            <CommonTableColumn>2024-01-16</CommonTableColumn>
          </CommonTableRow>
          <MyPageButton>취소하기</MyPageButton>
        </CommonTable>
      </div>
    </div>
  );
}
// 예약 정보 예약자 번호 받아와야 완성

export default ReservationList;
