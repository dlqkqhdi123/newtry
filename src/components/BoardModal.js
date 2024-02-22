import React, { useEffect, useState } from "react";
import styles from "./BoardModal.module.css";
import {
  collection,
  db,
  doc,
  getDocs,
  updateDoc,
  uploadImages,
  deleteDoc,
} from "../api/firebase";
import iconClose from "../assets/icon/icon-close_ff9b50.png";
import chevronLeftIcon from "../assets/icon/chevron_left_ff9b50.png";
import chevronRightIcon from "../assets/icon/chevron_right_ff9b50.png";
import ModalButton from "./ModalButton";
import styled from "styled-components";

const MypageButton = styled.button`
  width: 12rem;
  height: 3.5rem;
  border: 2px solid #ff9b50;
  color: #ff9b50;
  background-color: #f8ebd8;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4.5rem 0;

  &:hover,
  &:active {
    background-color: #ff9b50;
    color: #ffffff;
    font-weight: 700;
  }
`;

function BoardModal({
  isOpen,
  onClose,
  onSendData,
  userData,
  BoardManagement,
}) {
  const [images, setImages] = useState([]);
  const [showChevron, setShowChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]); // 배열로 초기화
  const [postData, setPostData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);

  const fetchPostData = async () => {
    try {
      const postCollection = collection(db, "boards"); // "boards" 컬렉션을 가져옵니다.
      const postSnapshot = await getDocs(postCollection);
      if (!postSnapshot.empty) {
        const postData = postSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(postData); // 게시물 목록을 상태에 저장합니다.
        setItem(postData[0]); // 첫 번째 게시물을 가져옵니다.
        const imagesUrls = postData.map((item) => item.boardImage); // 이미지 URL 배열 생성
        setImages(imagesUrls); // 이미지 URL 배열을 상태에 저장합니다.
      } else {
        console.log("게시물이 비어 있습니다.");
      }
    } catch (error) {
      console.error("게시물 정보를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    e.stopPropagation();

    if (isOpen) {
      // 원하는 동작을 추가하세요.
    }
  };

  const handleImageChange = (e) => {
    const fileInput = e.target;
    const selectedImages = Array.from(fileInput.files);

    if (selectedImages.length > 0) {
      setImages((prevImages) => {
        const newImages = [...prevImages, ...selectedImages];
        setCurrentIndex(0);

        const newShowChevron = newImages.length > 1;
        setShowChevron(newShowChevron);

        return newImages;
      });
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

  const handleEditClick = () => {
    setIsEditing(true); // 수정 버튼을 누르면 true로 변경
    // 수정할 데이터를 item 상태에 복사하여 업데이트합니다.
    setItem({ ...items[currentIndex] });
  };

  const handleDeleteData = async () => {
    if (isOpen) {
      try {
        const postDocRef = doc(db, "boards", items[currentIndex].id);
        await deleteDoc(postDocRef); // postDocRef 문서 삭제

        console.log("데이터 삭제 완료");
        onClose(); // 모달 닫기
      } catch (error) {
        console.error("데이터 삭제 중 오류가 발생했습니다.", error);
      }
    }
  };

  const handleSaveClick = async () => {
    if (isOpen) {
      try {
        const updatedData = {
          boardTitle: item.boardTitle,
          boardContent: item.boardContent,
        };

        const postDocRef = doc(db, "boards", items[currentIndex].id);
        await updateDoc(postDocRef, updatedData);

        console.log("데이터 수정 완료");
        onClose(); // 모달 닫기
      } catch (error) {
        console.error("데이터 수정 중 오류가 발생했습니다.", error);
      } finally {
        setIsEditing(false); // 저장 버튼을 누르면 false로 변경
      }
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    // item 상태를 직접 업데이트합니다.
    setItem((prevItem) => ({
      ...prevItem,
      boardContent: newContent,
    }));
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <span className={styles.modalSpan}>글쓰기</span>
            <img
              className={styles.closeImg}
              src={iconClose}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className={styles.modalContent}>
            <div className={styles.modalImgBox}>
              <figure id="imageFigure">
                {images.length > 0 && (
                  <>
                    <div className="image-indicators">
                      {images.map((imageUrl, index) => (
                        <div
                          key={index}
                          className={`image-indicator ${
                            currentIndex === index ? "active" : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                    <img
                      className={styles.boardImage}
                      src={images[currentIndex]}
                      alt={`Selected Image ${currentIndex + 1}`}
                    />
                  </>
                )}
              </figure>

              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.modalContentBox}>
              <div className={styles.modalContentTitle}>
                {item !== null ? (
                  <div>
                    <div className={styles.modalBorderBox}>
                      <h1>{item.boardTitle}</h1>
                      <textarea
                        className={styles.text}
                        value={item.boardContent}
                        onChange={handleContentChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div
                style={{ background: "white" }}
                className={styles.tnwjdtkrwp1}
              >
                {isEditing ? (
                  <ModalButton onClick={handleSaveClick}>저장</ModalButton>
                ) : (
                  <ModalButton onClick={handleEditClick}>수정</ModalButton>
                )}
                <ModalButton onClick={handleDeleteData}>삭제</ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardModal;
