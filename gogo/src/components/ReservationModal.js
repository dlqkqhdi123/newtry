import React, { useEffect, useState } from "react";
import styles from "./ReservationModal.module.css";
import { collection, db, getDocs, updateDoc, doc } from "../api/firebase";
import ModalButton from "./ModalButton";
import CommonTable from "./table/CommonTable";
import CommonTableColumn from "./table/CommonTableColumn";

function ReservationModal({ isOpen, onClose }) {
  const [images, setImages] = useState([]);
  const [showChevron, setShowChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [fieldValues, setFieldValues] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservations = await getReservations(db);
        setReservations(reservations);
        setFieldValues(reservations.map(() => ""));
      } catch (error) {
        console.error("예약 정보를 불러오는 중에 오류가 발생했습니다.", error);
      }
    }

    fetchReservations();
  }, []);

  if (!isOpen) return null;

  async function getReservations(db) {
    const reservationsCol = collection(db, "MyPageCustomer-Reservation");
    const reservationsSnapshot = await getDocs(reservationsCol);
    const reservationsList = reservationsSnapshot.docs.map((doc) => doc.data());
    return reservationsList;
  }
  const handleAddImageClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const fileInput = e.target;
    const selectedImages = Array.from(fileInput.files);

    if (selectedImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...selectedImages]);
      setShowChevron(images.length + selectedImages.length > 1);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

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
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <span className={styles.modalSpan}>예약확인</span>
            <img
              className={styles.closeImg}
              src="/icon/icon-close.png"
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalContentBox}>
              <div className={styles.modalContentTitle}>
                {reservations.map((reservation, index) => (
                  <div key={index}>
                    <form className={styles.reservationForm}>
                      <div className={styles.divLabel}>
                        <label className={styles.reservationLabel}>
                          보호자 성명
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={index + 1}
                          disabled
                        />
                        <label className={styles.reservationLabel}>업체</label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={reservation.condition}
                          disabled
                        />
                        <label className={styles.reservationLabel}>
                          펫 이름
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={reservation.petName}
                          disabled
                        />
                        <label className={styles.reservationLabel}>
                          펫 종류
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={reservation.hospital}
                          disabled
                        />
                        <label className={styles.reservationLabel}>
                          연락처
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={reservation.reservationDate}
                          disabled
                        />
                        <label className={styles.reservationLabel}>
                          병원명
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={fieldValues[index]}
                          onChange={(e) => {
                            const newFieldValues = [...fieldValues];
                            newFieldValues[index] = e.target.value;
                            setFieldValues(newFieldValues);
                          }}
                          disabled={fieldValues[index] !== ""}
                        />
                        <label className={styles.reservationLabel}>
                          예약일자
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={fieldValues[index]}
                          onChange={(e) => {
                            const newFieldValues = [...fieldValues];
                            newFieldValues[index] = e.target.value;
                            setFieldValues(newFieldValues);
                          }}
                          disabled={fieldValues[index] !== ""}
                        />
                        <label className={styles.reservationLabel}>
                          증상 또는 병명
                        </label>
                        <input
                          className={styles.reservationInput}
                          type="text"
                          value={fieldValues[index]}
                          onChange={(e) => {
                            const newFieldValues = [...fieldValues];
                            newFieldValues[index] = e.target.value;
                            setFieldValues(newFieldValues);
                          }}
                          disabled={fieldValues[index] !== ""}
                        />
                      </div>
                    </form>
                    <div className={styles.tnwjdtkrwp}>
                      <ModalButton
                        onClick={() =>
                          handleSaveClick(fieldValues[index], reservation.id)
                        }
                        children="승인하기"
                      />
                      <ModalButton
                        onClick={() =>
                          handleSaveClick(fieldValues[index], reservation.id)
                        }
                        children="수정하기"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReservationModal;
