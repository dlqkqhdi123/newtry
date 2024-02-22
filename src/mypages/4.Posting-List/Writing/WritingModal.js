import style from "../../Modal.module.css";
import { ReactComponent as Close } from "../../../assets/icon/icon-close_w.svg";
import { ReactComponent as Like } from "../../../assets/icon/icon-like.svg";
import { ReactComponent as Reply } from "../../../assets/icon/icon-reply.svg";
import styless from "./WritingModal.module.css";
import PotoSlide from "./PotoSlide";
import { useEffect, useState } from "react";
import Overlay from "../../Overlay";
import CorrectionModal from "./CorrectionModal";
import { getPostByNo } from "./Data";



function WritingModal({ setModalOpen, }) {
  let [modalInOpen, setModalInOpen] = useState(false);

  useEffect(() => {
    if (modalInOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalInOpen]);

  // const [data, setData] = useState({});
  // useEffect(() => {
  //   setData(getPostByNo(no));
  // }, []);


  return (
    <div className={style.modalbox} style={{ width: "70rem", height: "45rem" }}>
      <div className={style.header}>
        <h4>내가 쓴 글</h4>
        <button
          className={style.closebtn}
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <Close />
        </button>
      </div>

      <div className={styless.writingbody}>
        <div className={styless.potoSlide}>
          <PotoSlide />
        </div>

        <div className={styless.post}>
          <from className={styless.wordtext}>
            <div className={styless.head}>
              <figure className={styless.figure}></figure>
              <p style={{ fontSize: "15px" }}>
                <strong>땡이는 귀여워</strong>
              </p>
              <div className={styless.ico}>
                <Like className={styless.icon} />
                <p>7</p>
              </div>
              <div className={styless.ico}>
                <Reply className={styless.icon} />
                <p>3</p>
              </div>
            </div>

            <div className={styless.wordBox}>
              <div className={styless.wordTitle}>
                <p className={styless.title_p}>냥이들 츄르 나눔합니다!!</p>
                <span className={styless.date}>2024-01-12</span>
              </div>
              <p className={styless.word_p}>
                며칠 전에 구매한 냥이들 츄르말인데요. <br />
                최근에 또 냥이 츄르를 선물 받았는데 유통기한은 정해져 있고 ㅠㅜ
                해서 츄르 몇분께 나눔할려고 합니다!
                <br />
                <br />
                댓글 남겨주세요!!
              </p>
            </div>

            <div className={styless.next}>
              <figure className={styless.figure}></figure>
              <div>
                <p>
                  <strong>강자자</strong>
                </p>
                <p>저 나눔 받고 싶어요!</p>
              </div>
              <span className={styless.date}>2024-01-12</span>
            </div>
          </from>

          <div className={style.btnbox}>
            <button
              className={style.button2}
              type="submit"
              style={{ width: "13rem" }}
              onClick={() => {
                setModalInOpen(true);
              }}
            >
              수정하기
            </button>
            <button
              className={style.button2}
              type="submit"
              style={{ width: "13rem" }}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
      {modalInOpen && <Overlay modalOpen={modalInOpen} />}
      {modalInOpen && <CorrectionModal setModalInOpen={setModalInOpen} />}
    </div>
  );
}

export default WritingModal;
