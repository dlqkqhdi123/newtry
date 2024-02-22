import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteDatas,
  getData,
  getDatas,
  updateDatas,
  addReviewDatas,
} from "../api/firebase";
import HospetalButton from "../components/HospetalButton";
import ReservationModal from "../components/ReservationModal";
import ReviewForm from "../components/ReviewForm";
import stylesBtn from "../components/HospetalButton.module.css";
import Rating from "../components/Rating";
import Container from "../components/Container";
import Map from "../components/Map";
import stylesContainer from "../components/Container.module.css";
import styles from "./HospitalPage.module.css";
import mapIcon from "../assets/icon/발바닥_map-1.svg";
import LikeDislikeChart from "../components/LikeDislikeChart";
import paperplaneIcon from "../assets/icon/paper plane_w.svg";
import linkcopyIcon from "../assets/icon/icon_linkcopy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChatModal from "../components/ChatModal";
import ReviewRating from "../components/ReviewRating";

const LIMIT = 3;

const HospitalPage = () => {
  const [hospital, setHospital] = useState(undefined);
  const { hospitalTitle } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(LIMIT);
  // 채팅창의 열림 여부 상태 추가
  const mapRef = useRef(); // useRef 선언

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

  // 링크복사 버튼기능
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  // 병원목록 데이터 불러오기
  const handleLoad = async () => {
    const result = await getData("hospital", "title", "==", hospitalTitle);
    console.log(result);
    setHospital(result);
  };

  // 채팅 창 열기
  const openChat = () => {
    setIsChatOpen(true);
    // 채팅창 열기 등의 로직 추가
  };

  // 채팅 버튼 클릭 시 실행될 함수
  const closeChat = () => {
    setIsChatOpen(false);
  };

  // 후기 추가 성공 시 호출되는 콜백
  const handleAddSuccess = async (updatedHospital) => {
    try {
      console.log("새로운 리뷰가 추가되었습니다:", updatedHospital);

      // 업데이트된 병원 정보로 화면을 다시 렌더링 또는 상태 업데이트
      setHospital(updatedHospital);
    } catch (error) {
      console.error(
        "후기 추가 후 병원 정보를 업데이트하는데 실패했습니다:",
        error
      );
    }
  };

  //후기후기후기후기후기업뎃
  // const handleUpdateSuccess = (review) => {
  //   setHospital((prevItems) => {
  //     const splitIdx = prevItems.findIndex((item) => item.id === review.id);

  //     // 슬라이스로 3등분으로 자르고 다시 합쳐서 새로운 배열을 만든다.
  //     return [
  //       ...prevItems.slice(0, splitIdx),
  //       review,
  //       ...prevItems.slice(splitIdx + 1),
  //     ];
  //   });
  // };

  // 삭제하기
  // const handleDelete = async (docId, imgUrl) => {
  //   // items 에서 id 파라미터와 같은 id를 가지는 요소(객체)를 제거
  //   // const nextItems = items.filter((item) => item.id !== id);
  //   // setItems(nextItems);

  //   // db에서 데이터 삭제
  //   const result = await deleteDatas("hospital", docId, imgUrl);

  //   if (!result) {
  //     alert("저장된 이미지 파일이 없습니다. \n경로를 확인해주세요");
  //     return;
  //   }
  //   // db에서 삭제가 성공했을 때만 그 결과를 화면에 반영한다.

  //   // Items 셋팅
  //   setHospital((prevItems) =>
  //     prevItems.filter((item) => item.docId !== docId)
  //   );
  // };

  useEffect(() => {
    // hospitalTitle이 유효한 경우에만 데이터를 불러오도록 수정
    if (hospitalTitle) {
      handleLoad();
    }
  }, [hospitalTitle]);

  if (hospital === undefined) {
    // 데이터 로딩 중 로직 (로딩 스피너, 메시지 등을 표시할 수 있습니다)
    return <p>Loading...</p>;
  }

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + LIMIT);
  };

  console.log(hospital);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{hospital?.title}</h1>
      {/* 지도 */}
      <Map mapRef={mapRef} /> {/* mapRef를 Map 컴포넌트에 전달 */}
      <div className={styles.addWrapper}>
        <img src={mapIcon} className={styles.mapIcon} />
        <p>{hospital?.address}</p>
        <p>Tel.{hospital?.tel}</p>
      </div>
      {/* 채팅, 링크버튼 */}
      <div className={styles.btnWrapper}>
        <HospetalButton className={stylesBtn.chatBtn} onClick={openChat}>
          <img src={paperplaneIcon} className={styles.img} />
          채팅하기
        </HospetalButton>
        {isChatOpen && <ChatModal onClose={closeChat} hospital={hospital} />}
        <CopyToClipboard text={window.location.href} onCopy={handleCopy}>
          <HospetalButton className={stylesBtn.chatBtn}>
            <img src={linkcopyIcon} className={styles.img} />
            {isCopied ? "복사됨!" : "링크복사"}
          </HospetalButton>
        </CopyToClipboard>
      </div>
      {/* 내용 */}
      <ul className={styles.contentWrapper}>
        <li className={styles.content}>
          <span>영업시간</span> {hospital?.time}
        </li>
        <li className={styles.content}>
          <span>전문분야</span> {hospital?.field}
        </li>
        <li className={styles.content}>
          <span>주차</span> {hospital?.parking}
        </li>
        <li className={styles.content}>
          <span>이메일</span> {hospital?.email}
        </li>
        <li className={styles.content}>
          <span>홈페이지</span> {hospital?.url}
        </li>
      </ul>
      <div className={styles.contentLine}></div>
      {/* 차트 */}
      <div className={styles.chartWrapper}>
        <LikeDislikeChart hospitalTitle={hospitalTitle} />
      </div>
      <div>
        <div className={styles.contentLine2}></div>

        {/* 후기작성 */}
        <div className={styles.reviewTitle}>
          총 {hospital.reviews.length}개의 후기
        </div>
        <div className={styles.contentLine2}></div>
        <HospetalButton className={stylesBtn.ReviewBtn} onClick={openReview}>
          +후기 작성하기
        </HospetalButton>
        <ReviewForm
          hospital={hospital}
          isOpen={isReviewOpen}
          onClose={closeReview}
          onSubmit={addReviewDatas} // 리뷰를 추가하는 함수 (예: addDatas)
          onSubmitSuccess={handleAddSuccess} // 리뷰 추가 성공 시 실행할 콜백
        ></ReviewForm>

        {/* 별점 */}
        <div className={styles.ratingWrapper}>
          <p>총 점</p>
          <h1>
            <Rating actualRating={hospital?.rating} className={styles.rating} />
            <span> 점</span>
          </h1>
          <Rating
            className={styles.rating}
            hoverRating={hospital?.rating}
          ></Rating>
        </div>
      </div>
      {/* 후기리스트 */}
      <div className={styles.reviewContainer}>
        {hospital && hospital.reviews && hospital.reviews.length > 0 ? (
          hospital?.reviews.slice(0, visibleReviews).map((review, index) => (
            <div className={styles.review} key={index}>
              <h3>{review.user}</h3>
              <p>{review.comment}</p>
              <Rating hoverRating={review.rating}></Rating>
            </div>
          ))
        ) : (
          <p>후기가 없습니다.</p>
        )}
        {hospital?.reviews && hospital?.reviews.length > visibleReviews && (
          <button className={styles.moreBtn} onClick={handleLoadMore}>
            후기 더보기
          </button>
        )}
      </div>
      {/* </ReviewList> */}
      {/* 예약버튼 */}
      <div className={styles.ReservationBtnWrapper}>
        <button className={styles.ReservationBtn2} onClick={openModal}>
          예약하기
        </button>
        <ReservationModal
          hospital={hospital}
          isOpen={isModalOpen}
          onClose={closeModal}
        ></ReservationModal>
      </div>
    </div>
  );
};

export default HospitalPage;
