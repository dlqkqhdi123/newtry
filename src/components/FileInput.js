import { useEffect, useRef, useState } from "react";
// import resetImg from "../assets/ic-reset.png";
import "./FileInput.css";
// import placeholderImg from "../assets/preview-placeholder.png";

function FileInput({ name, onChange, value, initialPreview }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);
  // useState(initialPreview) 이렇게 등록을 하면 수정누를때 사진이 뜬다. 원래는 안 떴음

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
  };

  const handleClearClick = () => {
    // input 태그 자체가 나온다
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    // 값이 없을 수도 있기 때문에 useEffect 를 종료해준다.
    if (!value) return;
    // ObjectURL 객체를 사용하여 미리보기 기능을 구현할 수 있다.
    // ObjectURL을 만들면 웹 브라우저에 메모리를 할당한다. 할당을 한 이후에는 해제를 해줘야 메모리 낭비를 방지할 수 있다.
    // useEffect 에서는 사이드 이펙트를 정리하는 기능을 제공한다.
    // 리턴을 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 정리할 수 있다.
    const nextPreview = URL.createObjectURL(value);
    // createObjectURL의 파라미터는 Blob, file, MediaSourceObject, null 타입의 데이터가 들어와야한다.
    setPreview(nextPreview);

    // 디펜던시 리스트 =( ,[value, initialPreview] ) 값이 바뀌면 새로 콜백을 실행하는데 이 전에 리액트는 앞에서 리턴한 정리 함수를 실행해서 사이드 이펙트를 정리한다.
    // 재렌더링 => useEffect 콜백함수 실행 => 그 안에 있는 return 함수 기억 => 사용자 파일 변경되면 => value 값 변경으로 인한  useEffect 함수 실행 및 콜백함수 실행 => 앞에서 기억해뒀던 return 함수 실행
    // (앞에서 만들어진 사이드이펙트가 더이상 쓸모없어졌기 때문)
    return () => {
      setPreview({ initialPreview });
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        // src={preview || placeholderImg}
        alt="후기사진추가"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          {/* <img src={resetImg} alt="선택해제" /> */}
        </button>
      )}
    </div>
  );
}

export default FileInput;
