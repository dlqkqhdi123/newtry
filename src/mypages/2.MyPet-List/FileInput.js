import { useEffect, useRef, useState } from "react";
import closeImg from "../../assets/icon/icon-close_w.svg";
import style from "./FileInput.css";

function FileInput({ onFileChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  };
  const handleSpanClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.click();
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setPreview(null);
  };

  return (
    <div className="FileInput">
      {preview && (
        <img
          className="FileInput-preview selected"
          src={preview}
          alt="이미지 미리보기"
        />
      )}
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />

      {preview && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={closeImg} />
        </button>
      )}

      <span className="register" onClick={handleSpanClick}>
        마이펫 사진등록하기
      </span>
    </div>
  );
}

export default FileInput;
