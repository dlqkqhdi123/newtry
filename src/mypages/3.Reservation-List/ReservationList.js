import React, { useEffect, useState } from "react";
import CommonTable from "../table/CommonTable";
import CommonTableRow from "../table/CommonTableRow";
import Overlay from "../Overlay";
import ReservationModal from "./ReservationModal";
import { fetchReservation } from "../../api/firebase";
import styles from "./RL.module.css";
const ReservationList = (props) => {
  const [Reserv, setReserv] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    fetchReservation().then((data) => {
      setReserv(data);
      console.log(data);
    });
  }, []);

  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  console.log(selectedReservationId);

  return (
    <>
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
        {Reserv
          ? Reserv.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => {
                      console.log("reservationNumber:", item.reservationNumber);
                      setSelectedReservationId(item.reservationNumber);
                      setModalOpen(true);
                    }}
                  >
                    {item.reservationNumber}
                  </td>
                  <td>{item.condition}</td>
                  <td>{item.petName}</td>
                  <td>{item.partner}</td>
                  <td>{item.Date}</td>
                </CommonTableRow>
              );
            })
          : ""}
      </CommonTable>
      {modalOpen && <Overlay modalOpen={modalOpen} />}
      {modalOpen && (
        <ReservationModal
          setModalOpen={setModalOpen}
          reservationNumber={selectedReservationId}
        />
      )}
    </>
  );
};
export default ReservationList;
