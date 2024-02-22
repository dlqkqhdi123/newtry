import React, { useEffect, useState } from "react";
import "./ArticleListItem.css";
import defaultProfile from "../assets/icon/icon_profile.png";
import likeIcon from "../assets/icon/icon-like.png";
import replyIcon from "../assets/icon/icon-reply.png";
import ArticleContent from "./ArticleContent";
import { PiUserCircleLight } from "react-icons/pi";
import {
  db,
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  deleteDoc,
} from "../api/firebase";
import CommentsComponent from "./Comments";

const ArticleListItem = ({
  description,
  modalData,
  index,
  userData,
  articleId,
  onDelete,
  refreshArticle,
  refreshFlag,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [userLoaded, setUserLoaded] = useState(false);
  const [userNickName, setUserNickName] = useState("");
  const [modalDatass, setModalDatass] = useState(null);
  const [commentCounts, setCommentCounts] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    refreshArticle();
  }, []);

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
  }, [articleId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "articles", articleId),
      (snapshot) => {
        const data = snapshot.data();
        setModalDatass(data);
      }
    );

    return () => unsubscribe();
  }, [articleId]);

  useEffect(() => {
    if (userData) {
      setUserLoaded(true);
    }
  }, [userData]);

  useEffect(() => {
    if (modalData && modalData.comments) {
      setCommentCounts(modalData.comments.length);
    }
  }, [modalData]);

  useEffect(() => {
    if (!modalData) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "likeCounts", modalData.docId),
      (snapshot) => {
        try {
          const data = snapshot.data();
          const updatedLikeCount = data ? data.likeCount || 0 : 0;
          setLikeCount(updatedLikeCount);
        } catch (error) {
          console.error("Error updating like count:", error);
        }
      }
    );

    return () => unsubscribe();
  }, [modalData]);

  useEffect(() => {
    if (modalData.userData) {
      setUserNickName(modalData.userData.memberNickName);
    }
  }, [modalData.userData]);

  useEffect(() => {
    if (modalData?.images?.[0]) {
      const base64String = modalData.images[0];
      setImageSrc(base64String);
    }

    if (modalData?.uploadTime instanceof Date) {
      setUploadTime(getTime(modalData.uploadTime));
    } else if (modalData?.uploadTime) {
      const uploadDate = new Date(modalData.uploadTime);
      if (!isNaN(uploadDate.getTime())) {
        setUploadTime(getTime(uploadDate));
      }
    }
  }, [modalData]);

  const handleListItemClick = (index, e) => {
    e.stopPropagation();
    if (!isDeleted) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "articles", articleId));
      await onDelete(articleId);
      setIsDeleted(true);
      refreshArticle();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <>
      {!isDeleted && (
        <div
          className={`article-body-inner-list ${
            index % 2 === 0 ? "even" : "odd"
          }`}
          onClick={(e) => handleListItemClick(index, e)}
        >
          <figure>
            {imageSrc && <img src={imageSrc} alt={description} />}
          </figure>
          {modalData && (
            <div className={`custom-info ${index % 2 === 0 ? "even" : "odd"}`}>
              <div className="modaldata-title">
                <p>{modalData.title}</p>
                <span className="likeCounts">
                  <div className="Icon-wrapper">
                    <img
                      className="modaldata-title-icon"
                      src={likeIcon}
                      alt="likeIcon"
                    />
                    <span className="likeCount">{likeCount}</span>
                  </div>
                  <div className="Icon-wrappers">
                    <img
                      className="modaldata-title-icon"
                      src={replyIcon}
                      alt="replyIcon"
                    />
                    <span className="commentCount">{commentCounts}</span>
                  </div>
                </span>
              </div>
              <div className="modaldata-desc">
                <div className="modaldata-desc-wrapper">
                  <div className="modaldata-desc-title">
                    <span className="modaldata-profile">
                      {modalData && modalData.userData.profileImageURL ? (
                        <img
                          src={modalData.userData.profileImageURL}
                          alt="Profile"
                          className="profile"
                        />
                      ) : (
                        <img src={defaultProfile} className="profiles" />
                      )}
                    </span>
                    <div className="modaldata-nickname">
                      {modalData && userNickName}
                    </div>
                    <div className="modaldata-uploadtime">{uploadTime}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <ArticleContent
              isOpen={isModalOpen}
              modalData={modalData}
              onClose={closeModal}
              uploadTime={uploadTime}
              userData={userData}
              articleId={articleId}
              commentCount={commentCounts}
              refreshArticle={refreshArticle}
              refreshFlag={refreshFlag}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ArticleListItem;
