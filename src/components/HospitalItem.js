import React, { useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import ReservationModal from "./ReservationModal";
import stylesBtn from "./HospetalButton.module.css";
import Rating from "./Rating";
import styles from "./HospitalItem.module.css";
import HospetalButton from "./HospetalButton";

const HospitalItem = ({ hospital }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("모달열림");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className={styles.card}>
      <ul className={styles.itemUl}>
        <li className={styles.itemTitle}>{hospital.title}</li>
        <li className={styles.itemAddress}>{hospital.address}</li>
        <li className={styles.itemParking}>주차: {hospital.parking}</li>
        <Rating hoverRating={hospital.rating} className={styles.rating} />
      </ul>

      <div className={styles.btnContainer}>
        <HospetalButton className={stylesBtn.ReservationBtn}>
          <Link
            to={`/hospital/${hospital.title}`}
            state={{ hospital }}
            className={stylesBtn.link}
          >
            자세히
          </Link>
        </HospetalButton>

        <HospetalButton
          className={stylesBtn.ReservationBtn}
          onClick={openModal}
        >
          예약하기
        </HospetalButton>
        <ReservationModal
          hospital={hospital}
          isOpen={isModalOpen}
          onClose={closeModal}
        ></ReservationModal>
      </div>
    </Card>
  );
};

export default HospitalItem;
