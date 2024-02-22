import React from "react";
import "./ModifiedButton.css";

function ModifiedButton({ onClick }) {
  const handleClick = () => {
    const confirmed = window.confirm("내용을 수정하시겠습니까?");

    if (confirmed) {
      onClick();
    }
  };

  return (
    <div className="bottom-buttons">
      <button onClick={handleClick} className="ModifiedButton">
        <div className="button-wrapper">수정</div>
      </button>
    </div>
  );
}

export default ModifiedButton;
