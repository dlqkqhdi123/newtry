import React, { useState } from "react";
import "./Modal2.css";
import closeImg from "../../assets/icon/icon-close.png";
import { useNavigate } from "react-router-dom";
import { findPass } from "../../api/firebase";

function Modal({ open, onClose, isError, memberId }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  if (!open) {
    return null;
  }

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage("사용불가능한 비밀번호입니다.");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else if (password === currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };

  const handleChangePassword = async () => {
    if (isPassword && isPasswordConfirm) {
      try {
        await findPass(
          memberId,
          undefined,
          undefined,
          undefined,
          undefined,
          password
        );
        const confirmResult = window.confirm(
          "비밀번호가 변경되었습니다. 로그인 페이지로 이동하시겠습니까?"
        );
        if (confirmResult) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="modal-overlays">
      <div className="modal-contents">
        <div className="modal-containers">
          <div className="modal-headers">
            <div className="empty-areas"></div>
            <span className="modal-spans">비밀번호 변경</span>
            <img
              className="close-img"
              src={closeImg}
              alt="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="modal-contentBoxs">
            {isError ? (
              <p>일치하는 회원 정보가 없습니다.</p>
            ) : (
              <>
                <table>
                  <tr>
                    <th scope="row">
                      <div className="form-el">
                        <label
                          htmlFor="password"
                          style={{ fontSize: "16px", padding: "0" }}
                        >
                          비밀번호
                        </label>
                      </div>
                    </th>
                    <td>
                      <input
                        id="password"
                        name="password"
                        value={password}
                        type="password"
                        onChange={onChangePassword}
                        placeholder="숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요."
                      />
                      <p className={`${isPassword} ? 'true' : 'false'`}>
                        {passwordMessage}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="form-el">
                        <label
                          htmlFor="passwordConfirm"
                          style={{ fontSize: "16px", padding: "0" }}
                        >
                          비밀번호 확인
                        </label>
                      </div>
                    </th>
                    <td>
                      <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        type="password"
                        placeholder="숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요."
                        onChange={onChangePasswordConfirm}
                      />
                      <p className={`${isPasswordConfirm} ? "true" : "false"`}>
                        {passwordConfirmMessage}
                      </p>
                    </td>
                  </tr>
                </table>
                <button
                  className="find-pass"
                  onClick={handleChangePassword}
                  style={{ margin: "20px" }}
                >
                  비밀번호 변경
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
