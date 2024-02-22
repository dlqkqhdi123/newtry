import { useEffect, useRef, useState } from "react";
import "./ImgInput.css";

function ImgInput() {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="ImgInput">
      {preview && (
        <img
          className="ImgInput-preview selected"
          src={preview}
          alt="이미지 미리보기"
        />
      )}
      <input
        className="ImgInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />     
    </div>
  );
}

export default ImgInput;
