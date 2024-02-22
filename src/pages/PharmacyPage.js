import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteDatas,
  getData,
  getDatas,
  updateDatas,
  addPharReviewDatas,
} from "../api/firebase";
import HospetalButton from "../components/HospetalButton";
import stylesBtn from "../components/HospetalButton.module.css";
import Rating from "../components/Rating";
import Card from "../components/Card";
import Container from "../components/Container";
import Map from "../components/Map";
import stylesContainer from "../components/Container.module.css";
import styles from "./HospitalPage.module.css";
import mapIcon from "../assets/icon/발바닥_map-1.svg";
import LikeDislikeChart from "../components/LikeDislikeChart";
import paperplaneIcon from "../assets/icon/paper plane_w.svg";
import linkcopyIcon from "../assets/icon/icon_linkcopy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReviewFormPh from "../components/ReviewformPh";
import ChatModalPh from "../components/ChatModalPh";
import ReservationModalPh from "./../components/ReservationModalPh";

const LIMIT = 3;

const PharmacyPage = () => {
  const [pharmacy, setPharmacy] = useState(undefined);
  const { pharmacyTitle } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(LIMIT);
  const mapRef = useRef();

  const openModal = () => {
    console.log("모달열림");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReview = () => {
    console.log("모달열림");
    setIsReviewOpen(true);
  };

  const closeReview = () => {
    setIsReviewOpen(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleLoad = async () => {
    const result = await getData("pharmacy", "title", "==", pharmacyTitle);
    console.log(result);
    setPharmacy(result);
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleAddSuccess = async (updatedPharmacy) => {
    try {
      console.log("새로운 리뷰가 추가되었습니다:", updatedPharmacy);
      setPharmacy(updatedPharmacy);
    } catch (error) {
      console.error(
        "후기 추가 후 병원 정보를 업데이트하는데 실패했습니다:",
        error
      );
    }
  };

  useEffect(() => {
    if (pharmacyTitle) {
      handleLoad();
    }
  }, [pharmacyTitle]);

  if (pharmacy === undefined) {
    return <p>Loading...</p>;
  }

  const member = JSON.parse(localStorage.getItem("member")).memberId;
  console.log(member);

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + LIMIT);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pharmacy?.title}</h1>
      <Map mapRef={mapRef} />
      <div className={styles.addWrapper}>
        <img src={mapIcon} className={styles.mapIcon} />
        <p>{pharmacy?.address}</p>
        <p>Tel.{pharmacy?.tel}</p>
      </div>
      <div className={styles.btnWrapper}>
        <HospetalButton className={stylesBtn.chatBtn} onClick={openChat}>
          <img src={paperplaneIcon} className={styles.img} />
          채팅하기
        </HospetalButton>
        {isChatOpen && <ChatModalPh onClose={closeChat} pharmacy={pharmacy} />}
        <CopyToClipboard text={window.location.href} onCopy={handleCopy}>
          <HospetalButton className={stylesBtn.chatBtn}>
            <img src={linkcopyIcon} className={styles.img} />
            {isCopied ? "복사됨!" : "링크복사"}
          </HospetalButton>
        </CopyToClipboard>
      </div>
      <ul className={styles.contentWrapper}>
        <li className={styles.content}>
          <span>영업시간</span> {pharmacy?.time}
        </li>
        <li className={styles.content}>
          <span>주요&nbsp;취급&nbsp;약품</span> {pharmacy?.majorDrugs}
        </li>
        <li className={styles.content}>
          <span>주차</span> {pharmacy?.parking}
        </li>
        <li className={styles.content}>
          <span>이메일</span> {pharmacy?.email}
        </li>
        <li className={styles.content}>
          <span>홈페이지</span> {pharmacy?.url}
        </li>
      </ul>
      <div className={styles.contentLine}></div>
      {/* 차트 */}
      <div className={styles.chartWrapper}>
        <LikeDislikeChart PharmacyTitle={pharmacyTitle} />
      </div>
      <div>
        <div className={styles.contentLine2}></div>
        <div className={styles.reviewTitle}>
          총 {pharmacy.reviews?.length || 0}개의 후기
        </div>
        <div className={styles.contentLine2}></div>
        <HospetalButton className={stylesBtn.ReviewBtn} onClick={openReview}>
          +후기 작성하기
        </HospetalButton>
        <ReviewFormPh
          pharmacy={pharmacy}
          isOpen={isReviewOpen}
          onClose={closeReview}
          onSubmit={addPharReviewDatas}
          onSubmitSuccess={handleAddSuccess}
        ></ReviewFormPh>
        <div className={styles.ratingWrapper}>
          <p>총 점</p>
          <h1>
            <Rating actualRating={pharmacy?.rating} className={styles.rating} />
            <span> 점</span>
          </h1>
          <Rating
            className={styles.rating}
            hoverRating={pharmacy?.rating}
          ></Rating>
        </div>
      </div>
      <Container className={stylesContainer.reviewContainer}>
        {pharmacy && pharmacy.reviews && pharmacy.reviews.length > 0 ? (
          pharmacy?.reviews.slice(0, visibleReviews).map((review, index) => (
            <div className={styles.review} key={index}>
              <h3>{review.user}</h3>
              <p>{review.comment}</p>
              <Rating hoverRating={review.rating}></Rating>
            </div>
          ))
        ) : (
          <p>후기가 없습니다.</p>
        )}
        {pharmacy?.reviews && pharmacy?.reviews.length > visibleReviews && (
          <button className={styles.moreBtn} onClick={handleLoadMore}>
            후기 더보기
          </button>
        )}
      </Container>
      <div className={styles.ReservationBtnWrapper}>
        <HospetalButton
          className={stylesBtn.ReservationBtn2}
          onClick={openModal}
        >
          예약하기
        </HospetalButton>
        <ReservationModalPh
          pharmacy={pharmacy}
          isOpen={isModalOpen}
          onClose={closeModal}
        ></ReservationModalPh>
      </div>
    </div>
  );
};

export default PharmacyPage;
