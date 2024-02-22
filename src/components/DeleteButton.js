import { deleteArticle } from "../api/firebase";
import "./DeleteButton.css";

function DeleteButton({ articleId, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteArticle(articleId);
        alert("게시글 삭제가 완료되었습니다.");
        localStorage.removeItem(`content_${articleId}`);
        onDelete();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <div className="bottom-buttons">
      <button onClick={handleDelete} className="DeleteButton">
        <div className="button-wrapper">삭제</div>
      </button>
    </div>
  );
}

export default DeleteButton;
