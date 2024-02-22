import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./LgMyPage.module.css";
import { db, LgGetReservationsByMemberId } from "../api/firebase";
import LgReservationModal from "./LgReservationModal";
import MyPageButton from "./MypageButton";
import CommonTableRow from "./../mypages/table/CommonTableRow";
import CommonTableColumn from "./../mypages/table/CommonTableColumn";
import CommonTable from "../mypages/table/CommonTable";

function LgReservationList() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null); // 선택한 예약 정보를 저장하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창의 상태를 관리하는 상태

  const member = localStorage.getItem("member");
  const memberId = member?.memberId;
  console.log(memberId);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const member = JSON.parse(localStorage.getItem("member"));
        const memberId = member?.memberId;
        console.log(memberId);
        if (memberId) {
          const reservations = await LgGetReservationsByMemberId(db, memberId);
          setReservations(reservations);
        } else {
          console.error("회원 ID가 없습니다.");
        }
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
    console.log(reservation);
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
              <CommonTableColumn>{reservation.hosName2}</CommonTableColumn>
              <CommonTableColumn>{reservation.Date}</CommonTableColumn>
              <CommonTableColumn>
                {reservation.reservationDate}
              </CommonTableColumn>
            </CommonTableRow>
          ))}

          {isModalOpen && (
            <LgReservationModal
              isOpen={isModalOpen}
              reservation={selectedReservation}
              onClose={closeModal}
            />
          )}

          <MyPageButton>취소하기</MyPageButton>
        </CommonTable>
      </div>
    </div>
  );
}
// 예약 정보 예약자 번호 받아와야 완성

export default LgReservationList;
