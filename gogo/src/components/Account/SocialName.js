import { useEffect, useRef, useState } from "react";
import Adress from "./Adress";
import { addDatas, idDatas, nickDatas } from "../../api/firebase";
import "./SignUp.css";
import { styled } from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mail2, setMail2] = useState("");
  const phoneRef = useRef();
  const [nameMessage, setNameMessage] = useState("");
  const [isNickName, setIsNickName] = useState(false);
  const email2Ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setNickName(localStorage.getItem("nickname") || "");
  }, []);

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
      if (self) {
        self.disabled = false;
        self.value = "";
      }
    } else {
      if (self) {
        self.value = e.target.value;
        self.disabled = true;
      }
    }
  };

  const handleSubmit = async () => {
    if (nickName === "" || mail2 === "") {
      alert("빈칸을 모두 채워주세요!");
    } else if (isNickName) {
      try {
        await addDatas("member", {
          memberNickName: nickName,
          memberPhone: phone,
          memberMail: email,
          memberMail2: mail2,
          memberType: "social",
        });
        navigate("/SocialNameComplete");
      } catch (error) {
        console.log("Firebase 데이터 저장 에러:", error);
      }
    } else {
      if (!isNickName) {
        alert("닉네임 중복확인을 해주세요.");
      }
    }
  };

  const handleCancelCheck = () => {
    const result = window.confirm(
      "입력한 정보가 사라집니다 정말 가입을 취소하시겠습니까?"
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
          <div className="sign-num now">1</div> -{" "}
          <div className="sign-num">2</div>
        </h3>
        <div className="headWrapper-sum">
          <div> 정보입력 </div>
          <div> 가입완료 </div>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th scope="row">
              <div className="form-el">
                <label htmlFor="nickname">닉네임</label> <br />
              </div>
            </th>
            <td>
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
            <td>
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
            <td>
              <input
                id="phone"
                name="phone"
                value={phone}
                ref={phoneRef}
                onChange={handlePhone}
              />
              <input
                type="button"
                className="member-btn"
                id="nick_ajax"
                value="본인인증"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label>주소</label>
            </th>
            <td>
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
          <div style={{ color: "#fff" }}> 가입하기</div>
        </SignBtn>
      </div>
    </Container>
  );
}

export default SignUp;
