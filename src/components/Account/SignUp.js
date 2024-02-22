import { useRef, useState } from "react";
import Adress from "./Adress";
import { addDatas, idDatas, nickDatas } from "../../api/firebase";
import "./SignUp.css";
import { styled } from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  background-color: #f8ebd8;
  margin: 0 auto;
`;

const CancleBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: #1c1b1f;

  padding: 8px 16px;
  &:active,
  &:focus {
    outline: none;
    box-shadow: none;
  }
  & > a {
    color: #fff;
    text-decoration: none;
  }
`;
const SignBtn = styled.button`
  border: none;
  background-color: #ff9b50;

  padding: 8px 16px;
  font-weight: bold;
  margin-right: 8px;
  &:active,
  &:focus {
    outline: none;
  }
  & > a {
    text-decoration: none;
    color: #fff;
  }
`;

function SignUp() {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mail2, setMail2] = useState("");
  const phoneRef = useRef();

  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isId, setIsId] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const email2Ref = useRef(null);

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
    if (currentId.trim() === "") {
      setIsId(false);
      alert("아이디를 입력해주세요.");
    } else if (!idRegExp.test(currentId)) {
      setIdMessage("사용 불가능한 아이디 입니다.");
      setIsId(false);
    } else {
      setIdMessage("사용 가능한 아이디 입니다.");
      setIsId(true);
    }
  };

  const handleAjax = () => {
    if (id.trim() === "") {
      setIdMessage("아이디를 입력해주세요.");
      setIsId(false);
      alert("아이디를 입력해주세요.");
    } else {
      let isExist = 0;
      idDatas("member", id).then((result) => {
        isExist = result;
        if (isExist === 0) {
          alert("사용 가능한 아이디 입니다.");
          setIsId(true);
        } else if (isExist !== 0) {
          setIdMessage("중복된 아이디 입니다.");
          setIsId(false);
        }
      });
    }
  };

  const onChangeNickName = (e) => {
    const currentName = e.target.value;
    setNickName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setIsNickName(false);
      setNameMessage("사용불가능한 닉네임 입니다.");
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsNickName(true);
    }
  };

  const handleNickAjax = () => {
    if (nickName.trim() === "") {
      setNameMessage("닉네임을 입력해주세요.");
      setIsNickName(false);
      alert("닉네임을 입력해주세요.");
    } else {
      let isExist = 0;
      Promise.all([
        nickDatas("member", nickName),
        nickDatas("socialmember", nickName),
      ]).then(([memberResult, socialMemberResult]) => {
        isExist = memberResult + socialMemberResult;
        if (isExist === 0) {
          alert("사용 가능한 닉네임 입니다.");
          setIsNickName(true);
        } else {
          setNameMessage("중복된 닉네임 입니다.");
          setIsNickName(false);
        }
      });
    }
  };

  const onChangeName = (e) => {
    const curentName = e.target.value;
    setName(curentName);
  };

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

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  };

  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    phoneRef.current.value = result;

    setPhone(e.target.value);
  };

  const handleMailChange = (e) => {
    const selectedValue = e.target.value;

    setMail2(selectedValue);

    const self = email2Ref.current;

    if (selectedValue === "other") {
      // "직접입력"이 선택된 경우
      if (self) {
        self.disabled = false;
        self.value = "";
      }
    } else {
      // 다른 옵션이 선택된 경우
      if (self) {
        self.value = e.target.value; // 기본값 또는 이전 값으로 초기화
        self.disabled = true;
      }
    }
  };

  const handleSubmit = () => {
    if (id === "" || nickName === "" || mail2 === "") {
      alert("빈칸을 모두 채워주세요!");
    } else if (isId && isNickName && isPassword && isPasswordConfirm) {
      addDatas("member", {
        memberId: id,
        memberName: name,
        memberPass: password,
        memberNickName: nickName,
        memberPhone: phone,
        memberMail: email,
        memberMail2: mail2,
      });
    } else {
      if (!isId) {
        alert("아이디 중복확인을 해주세요.");
      }
      if (!isNickName) {
        alert("닉네임 중복확인을 해주세요.");
      }
      if (!isPassword) {
        alert("비밀번호를 입력해주세요.");
      }
      if (!isPasswordConfirm) {
        alert("비밀번호가 일치하지않습니다.");
      }
    }
  };
  const handleCancelCheck = () => {
    const result = window.confirm(
      "입력한 정보가 사라집니다. 정말 가입을 취소하시겠습니까?"
    );
    if (result) {
      window.location.href = "/";
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: "42px" }}> Pet Owner Join </h2>
      <h3>정보입력</h3>
      <div className="headWrapper">
        <h3>
          <div className="sign-num">1</div> -{" "}
          <div className="sign-num now">2</div> -{" "}
          <div className="sign-num">3</div>
        </h3>
        <div className="headWrapper-sum">
          <div> 약관동의 </div>
          <div> 정보입력 </div>
          <div> 가입완료 </div>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="id">아이디</label>
              </div>
            </th>
            <td className="td">
              <input
                id="id"
                name="id"
                value={id}
                onChange={onChangeId}
                placeholder="4-12사이 대소문자 또는 숫자만 입력해 주세요."
              />
              <input
                type="button"
                className="member-btn"
                id="id_ajax"
                value="중복확인"
                onClick={handleAjax}
              />
              <p className={`${isId} ? 'true' : "false"`}>
                {" "}
                &nbsp;{idMessage}{" "}
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="name">이름</label>
              </div>
            </th>
            <td className="td">
              <input id="name" name="name" onChange={onChangeName} />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="password">비밀번호</label>
              </div>
            </th>
            <td className="td">
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={onChangePassword}
                placeholder="숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요."
              />
              <p className={`${isPassword} ? 'true' : 'false'`}>
                &nbsp;{passwordMessage}
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="passwordConfirm">비밀번호 확인</label>
              </div>
            </th>
            <td className="td">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                type="password"
                placeholder="숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요."
                onChange={onChangePasswordConfirm}
              />
              <p className={`${isPasswordConfirm} ? "true" : "false"`}>
                &nbsp;{passwordConfirmMessage}
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="nickname">닉네임</label> <br />
              </div>
            </th>
            <td className="td">
              <input
                id="nickname"
                name="nickname"
                value={nickName}
                onChange={onChangeNickName}
                placeholder="닉네임은 2글자 이상 5글자 이하로 입력해주세요."
              />
              <input
                type="button"
                className="member-btn"
                id="nick_ajax"
                value="중복확인"
                onClick={handleNickAjax}
              />
              <p className={`${isNickName} ? "true" : "false"`}>
                &nbsp;{nameMessage}
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="email">이메일</label>
              </div>
            </th>
            <td className="td">
              <input
                id="email"
                name="name"
                className="mail"
                value={email}
                onChange={onChangeEmail}
              />
              @
              <input
                type="text"
                name="email2"
                className="mail"
                id="email2"
                title="이메일 주소 직접입력"
                disabled={mail2 !== "other"}
                ref={email2Ref}
              />
              &nbsp;
              <select
                name="tmp_mail"
                id="tmp_mail"
                onChange={handleMailChange}
                value={mail2}
              >
                <option value="">선택하세요</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="gmail.com">gmail.com</option>
                <option value="other">직접입력</option>
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label htmlFor="phone">연락처</label>
            </th>
            <td className="td">
              <input
                id="phone"
                name="phone"
                value={phone}
                ref={phoneRef}
                onChange={handlePhone}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label>주소</label>
            </th>
            <td className="td">
              <Adress />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn_wrapper">
        <CancleBtn className="submitBtn" onClick={handleCancelCheck}>
          <Link to="/">취소</Link>
        </CancleBtn>
        <SignBtn type="submit" className="submitBtn" onClick={handleSubmit}>
          <Link to="/OwnerJoinComplete"> 가입하기</Link>
        </SignBtn>
      </div>
    </Container>
  );
}

export default SignUp;
