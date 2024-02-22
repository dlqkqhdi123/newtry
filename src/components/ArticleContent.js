import React, { useEffect, useState } from "react";
import iconClose from "../assets/icon/icon-close_ff9b50.png";
import chevronLeftIcon from "../assets/icon/chevron_left_ff9b50.png";
import chevronRightIcon from "../assets/icon/chevron_right_ff9b50.png";
import { PiUserCircleLight } from "react-icons/pi";
import likeIcon from "../assets/icon/icon-like.png";
import replyIcon from "../assets/icon/icon-reply.png";
import messageToUser from "../assets/icon/paper plane ff9b50.png";
import defaultProfile from "../assets/icon/icon_profile.png";
import CommentsComponent from "./Comments";
import "./ArticleContent.css";
import {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  where,
  query,
  getDocs,
  deleteDoc,
} from "../api/firebase";
import { useFetchUserInfo } from "../contexts/MemberContext";
import CommentButton from "./CommentButton";
import ModifiedButton from "./ModifiedButton";
import DeleteButton from "./DeleteButton";
import MessageToUser from "./MessageToUser";
import ModifyModal from "./ModifyModal";

const ArticleContent = ({
  isOpen,
  uploadImages,
  onSendData,
  onClose,
  modalData,
  uploadTime,
  userData,
  comments,
  articleId,
  commentCount,
  onSendMessage,
  refreshArticle,
  refreshFlag,
}) => {
  const [images, setImages] = useState([]);
  const [showChevron, setShowChevron] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [commentCounts, setCommentCounts] = useState(0);
  const [showMessageToUser, setShowMessageToUser] = useState(false);
  const [content, setContent] = useState("");
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [userDatas, setUserDatas] = useState(null);
  const [modalDatas, setModalDatas] = useState(null);

  const fetchUserInfo = useFetchUserInfo();

  useEffect(() => {
    if (modalData && modalData.content) {
      setContent(modalData.content);
    }
  }, [modalData]);

  console.log(userData);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const commentQuerySnapshot = await getDocs(
          query(collection(db, "Comments"), where("articleId", "==", articleId))
        );
        const count = commentQuerySnapshot.size;
        setCommentCounts(count);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    fetchCommentCount();
  }, [articleId, refreshFlag]);

  const fetchUserData = async () => {
    try {
      await fetchUserInfo();
      setUserDataLoaded(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (modalData && modalData.docId) {
      fetchUserData();
    }
  }, [modalData]);

  useEffect(() => {
    if (isOpen) {
      setImages([]);
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const newShowChevron =
      images.length > 1 || (modalData.images && modalData.images.length > 1);
    setShowChevron(newShowChevron);
  }, [images.length, modalData.images]);

  useEffect(() => {
    if (modalData && modalData.docId) {
      const unsubscribe = onSnapshot(
        doc(db, "likeCounts", modalData.docId),
        (snapshot) => {
          const updatedLikeCount = snapshot.data()?.likeCount || 0;
          setLikeCount(updatedLikeCount);
        }
      );

      return () => unsubscribe();
    }
  }, [modalData && modalData.docId]);

  const handleLikeClick = async () => {
    if (modalData && modalData.docId) {
      try {
        const articleDocRef = doc(db, "likeCounts", modalData.docId);
        const docSnapshot = await getDoc(articleDocRef);

        const newLikeCount = (docSnapshot.data()?.likeCount || 0) + 1;
        await setDoc(articleDocRef, { likeCount: newLikeCount });

        localStorage.setItem(`like_${modalData.docId}`, "liked");

        setLikeCount(newLikeCount);
      } catch (error) {
        console.error("Error updating like count:", error);
      }
    }
  };

  const handleButtonClick = (e) => {
    const clickedElement = e.target || e.currentTarget;

    if (
      clickedElement.closest(".close-img2") ||
      clickedElement.classList.contains("close-img2")
    ) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.closest(".modal-content")) {
      return;
    }

    onClose();
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? modalData.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === modalData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMessageToUserClick = () => {
    setShowMessageToUser(true);
  };

  const sendMessage = (message) => {
    console.log("보내는 메세지:", message);
  };

  const getCurrentUserData = () => {
    const userDataJSON = localStorage.getItem("member");
    if (userDataJSON) {
      return JSON.parse(userDataJSON);
    } else {
      return null;
    }
  };

  const handleModifiedButtonClick = async () => {
    if (!userDataLoaded || !userData) {
      return;
    }

    try {
      const currentUserData = getCurrentUserData();

      if (
        modalData.userData.memberNickName === currentUserData?.memberNickName
      ) {
        setShowModifyModal(true);
      } else {
        alert("다른 사용자의 글은 수정할 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleModifyModalClose = () => {
    setShowModifyModal(false);
  };

  const handleModifySave = (modifiedContent) => {
    setContent(modifiedContent);
    saveModifiedContent(modifiedContent);
  };

  const saveModifiedContent = async (modifiedContent) => {
    try {
      const articleRef = doc(db, "articles", articleId);
      await updateDoc(articleRef, { content: modifiedContent });
      localStorage.setItem(`content_${articleId}`, modifiedContent);
      setContent(modifiedContent);
    } catch (error) {
      console.error("Error saving modified content:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "articles", articleId));
      onClose();
      setModalDatas(null);

      refreshArticle();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    if (modalData === null) {
      onClose();
    }
  }, [modalData]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-container">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {showMessageToUser && (
              <MessageToUser
                isOpen
                onClose={() => setShowMessageToUser(false)}
              />
            )}
            <div className="modal-imgBox">
              <figure className="figurebox" id="imageFigure" images={images}>
                {modalData.images && modalData.images.length > 0 && (
                  <>
                    <div className="image-indicators">
                      {modalData.images.map((_, index) => (
                        <div
                          key={index}
                          className={`image-indicator ${
                            currentIndex === index ? "active" : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                    {modalData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`선택된 이미지 ${index + 1}`}
                        style={{
                          display: currentIndex === index ? "block" : "none",
                        }}
                      />
                    ))}
                  </>
                )}
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
              </figure>
            </div>
            <div className="modal-contentBox">
              <img
                className="close-img2"
                src={iconClose}
                alt="close-icon"
                onClick={handleButtonClick}
              />
              <div className="modal-content-titles">
                <div className="modaldata-titles">
                  <span className="modaldata-profile">
                    {modalData && modalData.userData.profileImageURL ? (
                      <img
                        src={modalData.userData.profileImageURL}
                        alt="Profile"
                        className="profiles"
                      />
                    ) : (
                      <img src={defaultProfile} className="profiles" />
                    )}
                  </span>
                  {userData && (
                    <div className="modaldata-titles-user">
                      {userData?.memberNickName}
                    </div>
                  )}
                </div>
                <div className="modaldata-title-icons">
                  <div className="icon-wrapper">
                    <img
                      className="modaldata-title-icons"
                      src={likeIcon}
                      alt="likeIconss"
                      onClick={handleLikeClick}
                    />
                    <span className="likeCountss">{likeCount}</span>
                  </div>
                  <div className="icon-wrappers">
                    <img
                      className="modaldata-title-icons"
                      src={replyIcon}
                      alt="replyIcon"
                    />
                    <span className="commentCountss">{commentCounts}</span>
                  </div>
                </div>
              </div>
              <div className="modal-content-desc">
                <div className="modal-content-desc-title">
                  {modalData.title}
                  <span className="title-uploadtime">{uploadTime}</span>
                </div>
                <div className="modal-content-desc-content">{content}</div>
              </div>
              <div>
                <CommentsComponent
                  articleId={articleId}
                  commentsProp={modalData.comments}
                  modalData={modalData}
                  userData={userData}
                />
              </div>
              <CommentButton
                onSendData={onSendData}
                uploadImages={uploadImages}
                articleId={modalData.docId}
              />
              <div className="several-function-wrapper">
                <img
                  className="message-to-user"
                  src={messageToUser}
                  onClick={handleMessageToUserClick}
                />
                <div className="mdbtn-wrapper">
                  <ModifiedButton onClick={handleModifiedButtonClick} />
                  <DeleteButton onDelete={handleDelete} articleId={articleId} />
                </div>
              </div>
              {showMessageToUser && (
                <MessageToUser
                  isOpen={showMessageToUser}
                  onClose={() => setShowMessageToUser(false)}
                  onSendMessage={sendMessage}
                  userData={userData}
                />
              )}
              {showModifyModal && (
                <ModifyModal
                  isOpen={showModifyModal}
                  onClose={handleModifyModalClose}
                  onSave={handleModifySave}
                  initialContent={content}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
