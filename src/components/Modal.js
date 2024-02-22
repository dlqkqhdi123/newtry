import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./Modal.css";
import { uploadImages } from "../api/firebase";
import iconClose from "../assets/icon/icon-close_ff9b50.png";
import chevronLeftIcon from "../assets/icon/chevron_left_ff9b50.png";
import chevronRightIcon from "../assets/icon/chevron_right_ff9b50.png";

function Modal({ isOpen, onClose, onSendData, userData, refreshArticle }) {
  const [images, setImages] = useState([]);
  const [showChevron, setShowChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isOpen) {
      setImages([]);
      setShowChevron(false);
      setCurrentIndex(0);
      setTitle("");
      setContent("");
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    e.stopPropagation();

    if (isOpen) {
    }
  };

  const handleAddImageClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
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

  const handleSendData = async () => {
    if (isOpen) {
      try {
        const imageUrls = await uploadImages(images);

        const data = {
          title,
          content,
          images: imageUrls,
          userData: userData,
        };

        onSendData(data);
        onClose();
        refreshArticle();
      } catch (error) {
        console.error("Error uploading images: ", error);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-container">
          <div className="modal-header">
            <span className="modal-span">글쓰기</span>
            <img
              className="close-img"
              src={iconClose}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="modal-content">
            <div className="modal-imgBox">
              <figure id="imageFigure">
                {images.length > 0 && (
                  <>
                    <div className="image-indicators">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          className={`image-indicator ${
                            currentIndex === index ? "active" : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                    <img
                      src={URL.createObjectURL(images[currentIndex])}
                      alt={`Selected Image ${currentIndex + 1}`}
                    />
                    {showChevron && (
                      <>
                        <div
                          className="modal-chevron modal-chevron-left"
                          onClick={handlePrevClick}
                        >
                          <img src={chevronLeftIcon} alt="left-chevron" />
                        </div>
                        <div
                          className="modal-chevron modal-chevron-right"
                          onClick={handleNextClick}
                        >
                          <img src={chevronRightIcon} alt="right-chevron" />
                        </div>
                      </>
                    )}
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
              <div className="add-img-container" onClick={handleAddImageClick}>
                + 사진등록하기
              </div>
            </div>
            <div className="modal-contentBox">
              <div className="modal-content-title">
                <input
                  className="modal-input"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="modal-input2"
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <Button onSendData={handleSendData} userData={userData}>
                등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
