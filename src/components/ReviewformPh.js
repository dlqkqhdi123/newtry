import React, { useEffect, useState } from "react";
import RatingInput from "./RatingInput";
import styles from "./ReviewForm.module.css";
import closeIcon from "../assets/icon/icon-close_ff9b50.svg";
import { addPharReviewDatas } from "../api/firebase";

const INITIAL_VALUES = {
  user: "",
  rating: 0,
  content: "",
};

const ReviewFormPh = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  pharmacy,
  initialValues = INITIAL_VALUES,
  initialPreview,
}) => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 리뷰 등록
  const handleSubmit = async () => {
    const formData = {
      user: values.user,
      comment: values.content,
      rating: values.rating,
    };

    try {
      setSubmittingError(null);
      setIsSubmitting(true);

      // addReviewDatas 함수를 호출하여 리뷰를 추가
      const updatedPharmacy = await addPharReviewDatas(
        pharmacy.docId,
        formData
      );
      onSubmitSuccess(updatedPharmacy);

      // 리뷰 등록 후 창을 닫기
      onClose();
    } catch (error) {
      console.error("리뷰 추가 후 에러:", error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
      setValues(INITIAL_VALUES);
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>후기등록</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <img
                className={styles.closeIcon}
                src={closeIcon}
                alt="닫기아이콘"
              />
            </button>
          </div>
          <div className={styles.contentLine}></div>
          <form className={styles.form}>
            <RatingInput
              type="number"
              name="rating"
              value={values.rating}
              onChange={handleChange}
            />
            <input
              type="text"
              name="user"
              value={values.user}
              onChange={handleInputChange}
              placeholder="리뷰를 남길 닉네임을 입력해주세요"
              className={styles.titleInput}
            />
            <textarea
              type="text"
              name="content"
              placeholder="내용을 입력해주세요"
              value={values.content}
              onChange={handleInputChange}
              className={styles.contentInput}
            />

            <button
              onClick={handleSubmit}
              type="button"
              className={styles.submitBtn}
            >
              등록하기
            </button>
            {submittingError?.message && <div>{submittingError.message}</div>}
          </form>
        </div>
      </div>
    )
  );
};

export default ReviewFormPh;
