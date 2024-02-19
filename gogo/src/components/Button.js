import "./Button.css";
function Button({ buttonText }) {
  return (
    <div className="bottom-button">
      <button className="button">
        <div className="button-wrap">
          {buttonText}
          <img src="/image/발바닥_or.png" alt="주황 발바닥" />
          <img src="/image/발바닥.png" alt="발바닥" className="hover-image" />
        </div>
      </button>
    </div>
  );
}

export default Button;
