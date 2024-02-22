import { useEffect, useRef, useState } from "react";
import closeImg from "../../assets/icon/icon-close_w.svg";
import "./FileInput.css";


function FileInput({ name, onChange, value, initialPreview }) {

  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

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
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={closeImg} alt="선택해제" />
        </button>
      )}
    </div>
  );
}

export default FileInput;
