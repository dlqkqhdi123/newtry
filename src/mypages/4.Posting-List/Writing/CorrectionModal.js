import style from "../../Modal.module.css";
import { ReactComponent as Close } from "../../../assets/icon/icon-close_w.svg";
import IMG from "../../../assets/gallery/꿀팁_02.png";
import styless from "./CorrectionModal.module.css";

function CorrectionModal({ setModalInOpen }) {
  return (
    <div className={style.modalbox} style={{ width: "70rem", height: "45rem" }}>
      <div className={style.header}>
        <h4>내가 쓴 글 수정하기</h4>
        <button
          className={style.closebtn}
          onClick={() => {
            setModalInOpen(false);
          }}
        >
          <Close />
        </button>
      </div>

      <div className={styless.writingbody}>
        <div className={styless.poto}>
          {/* <ImgInput /> */}
          <img src={IMG} alt="사진" />
          <span className={styless.span}>+ 사진 수정하기</span>
        </div>

        <div className={styless.post}>
          <from className={styless.wordBox}>
            <div className={styless.wordTitle}>
              <h4>냥이들 츄르 나눔합니다!!</h4>
            </div>
            <p className={styless.word_p}>
              며칠 전에 구매한 냥이들 츄르말인데요. <br />
              최근에 또 냥이 츄르를 선물 받았는데 유통기한은 정해져 있고 ㅠㅜ
              해서 츄르 몇분께 나눔할려고 합니다!
              <br />
              <br />
              댓글 남겨주세요!!
            </p>
          </from>

          <button
            className={style.button2}
            type="submit"
            style={{ width: "13rem" }}
            onClick={() => {
              setModalInOpen(false);
            }}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CorrectionModal;
