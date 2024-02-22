import "./Button2.css";
import foot from "../assets/img/발바닥_or.png";
import footHover from "../assets/img/발바닥.png";
function Button2({ buttonText }) {
  return (
    <div className="bottom-button">
      <button className="button">
        <div className="button-wrap">
          {buttonText}
          <img src={foot} alt="주황 발바닥" />
          <img src={footHover} alt="발바닥" className="hover-image" />
        </div>
      </button>
    </div>
  );
}

export default Button2;
