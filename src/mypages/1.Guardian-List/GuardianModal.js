import { deleteMemberDocument } from "../../api/firebase";
import style from "../Modal.module.css";
import styless from "./GuardianModal.module.css";

function GuardianModal({ setModalOpen }) {
  const handleDeleteAccount = () => {
    deleteMemberDocument();
  };

  return (
    <div className={style.modalbox} style={{ width: "60rem", height: "40rem" }}>
      <div className={styless.secession_header}>
        <h4>탈퇴하기</h4>
      </div>
      <div className={styless.secession_body}>
        <div className={styless.box}></div>
        <h3>호스펫탈을 탈퇴하시겠어요?</h3>
        <p className={styless.p}>
          탈퇴 버튼 선택시, 계정은 <br />
          삭제되며 복구 되지 않습니다.
        </p>

        <button
          className={style.button2}
          type="submit"
          onClick={handleDeleteAccount}
        >
          탈퇴하기
        </button>

        <button
          className={style.button2}
          type="submit"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          취소하기
        </button>
      </div>
    </div>
  );
}

export default GuardianModal;
