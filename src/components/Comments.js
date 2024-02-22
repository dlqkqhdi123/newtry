import React, { useEffect, useState } from "react";
import defaultProfile from "../assets/icon/icon_profile.png";
import iconClose from "../assets/icon/icon-close_ff9b50.png";
import "./Comments.css";
import { useMember } from "../contexts/MemberContext";
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "../api/firebase";

function Comments({
  modalData,
  uploadTime,
  onCommentSubmit,
  articleId,
  commentsProp,
  userData,
}) {
  const currentUser = useMember();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  useEffect(() => {
    if (commentsProp) {
      setComments(commentsProp);
    }
  }, [commentsProp]);

  useEffect(() => {
    const fetchComments = async (articleId) => {
      try {
        const commentQuery = query(
          collection(db, "Comments"),
          where("articleId", "==", articleId),
          orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(commentQuery, (snapshot) => {
          const updatedComments = [];
          snapshot.forEach((doc) => {
            updatedComments.push({ id: doc.id, ...doc.data() });
          });
          setComments(updatedComments);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (articleId) {
      fetchComments(articleId);
    }
  }, [articleId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const filteredComments = comments.filter(
    (comment) => comment.articleId === articleId
  );

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const newComment = {
        author: currentUser.memberNickName || "Anonymous",
        content: comment,
        time: `${year}-${month}-${day} ${hours}:${minutes}`,
      };

      try {
        await addDoc(collection(db, "Comments"), {
          ...newComment,
          timestamp: serverTimestamp(),
          articleId: articleId,
        });

        setComment("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  const handleCommentDelete = async (commentId) => {
    if (window.confirm("댓글을 지우시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "Comments", commentId));
        setSelectedCommentId(null);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleCommentClick = (commentId) => {
    if (selectedCommentId === commentId) {
      setSelectedCommentId(null);
    } else {
      setSelectedCommentId(commentId);
    }
  };

  return (
    <div className="modal-content-comments">
      <div className="commentBox">
        <div className="modal-content-comment">
          {comments.length === 0 ? (
            <div className="no-comments">가장 먼저 댓글을 달아보세요 !</div>
          ) : (
            filteredComments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                modalData={modalData}
                uploadTime={uploadTime}
                onDelete={handleCommentDelete}
                onClick={handleCommentClick}
                isSelected={comment.id === selectedCommentId}
                setIsDeleteButtonVisible={setIsDeleteButtonVisible}
                isDeleteButtonVisible={isDeleteButtonVisible}
                userData={userData}
                currentUser={currentUser}
              />
            ))
          )}
        </div>
      </div>
      <div className="comment-input-container">
        <input
          className="comment-input"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="comment-button" onClick={handleCommentSubmit}>
          확인
        </button>
      </div>
    </div>
  );
}

function Comment({
  comment,
  modalData,
  uploadTime,
  onDelete,
  onClick,
  isSelected,
  setIsDeleteButtonVisible,
  isDeleteButtonVisible,
  userData,
  currentUser,
}) {
  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleCommentClick = () => {
    onClick(comment.id);
    setIsDeleteButtonVisible(!isDeleteButtonVisible);
  };

  const canDeleteComment = (userData) => {
    if (!currentUser || !userData) return false;
    if (currentUser.uid === userData.uid) return true;
    return comment.author === currentUser.memberNickName;
  };

  return (
    <div
      className={`comment ${isSelected ? "selected" : ""}`}
      onClick={handleCommentClick}
    >
      <div className="comment-users">
        <div className="modaldata-profile">
          {modalData &&
          modalData.userData &&
          modalData.userData.profileImageURL ? (
            <img
              src={modalData.userData.profileImageURL}
              alt="Profile"
              className="profiles"
            />
          ) : (
            <img src={defaultProfile} className="profiles" />
          )}
        </div>
        <div className="nickname-wrapper">
          <div className="profile-nickname">{comment.author}</div>
          <div className="comment-content">{comment.content}</div>
        </div>
      </div>
      <div className="comment-uploadTime">{comment.time}</div>
      {isSelected &&
        isDeleteButtonVisible &&
        canDeleteComment(modalData.userData) && (
          <button style={{ backgroundColor: "white" }} onClick={handleDelete}>
            <img className="delete-close-icon" src={iconClose} />
          </button>
        )}
    </div>
  );
}

export default Comments;
