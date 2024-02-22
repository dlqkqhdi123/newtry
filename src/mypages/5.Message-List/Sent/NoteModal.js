import style from "../../Modal.module.css";
import { ReactComponent as Close } from "../../../assets/icon/icon-close_w.svg";
import styless from "../MessageModal.module.css";


function NoteModal({ setIsModalOpen }){
    return (
        <div className={style.modalbox} style={{ width: "70rem", height: "40rem" }}>
          <div className={style.header}>
            <h4>쪽지 쓰기</h4>
            <button
              className={style.closebtn}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <Close />
            </button>
          </div>
          <div className={styless.Messagebody}>
          <from className={styless.mms}>
            <input className={styless.note}></input>
          </from>
    
          <div className={style.btnbox}>
            <button
              className={style.button2}
              type="submit"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              등록하기
            </button>
          </div>
        </div>
        </div>
      );
}

export default NoteModal;