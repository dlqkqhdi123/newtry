import { useState } from "react";
import styled from "styled-components";
// import SocialKakao from "./SocialKakao";
// import SocialNaver from "./SocialNaver";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMember } from "../../api/firebase";
import "../Account/SignUp.css";
// import SocialGoogle from "./SocialGoogle";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 60vh;
  padding: 16px;
  flex-direction: column;
  background-color: #f8ebd8;
  margin: 0 auto;
  box-sizing: border-box;
`;

const LoginBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 50;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 300px;
  margin-bottom: 30px;
`;

const LoginBtn = styled.button`
  height: 50px;
  font-size: 16px;
  background-color: #1c1b1f;
  color: #fff;
  border: none;
  &:hover {
    background-color: #ffc26f;
    font-weight: bold;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  margin: 0;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  &:focus {
    background-color: #f9f9f9;
    border: 1.5px solid #666;
  }
`;

const LoginBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 8px;

  & > a {
    text-decoration: none;
    color: #c5c5c1;
    &:hover {
      color: #ffc26f;
      font-weight: bold;
    }
  }
`;

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    input_id: "", // 수정된 필드명
    input_pw: "", // 수정된 필드명
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { memberObj, message } = await getMember(values);
    if (message === "") {
      if (memberObj !== null) {
        if (
          values.input_id === memberObj.memberId &&
          values.input_pw === memberObj.memberPass
        ) {
          navigate(state ? state : "/");
        } else {
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      } else {
        console.log(memberObj);
        alert("일치하는 회원 정보가 없습니다.");
      }
    } else if (message === null) {
      localStorage.setItem("member", JSON.stringify(memberObj));
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <Container>
      <div>
        <h2 style={{ margin: "30px", fontSize: "42px" }}>Login</h2>
        <form style={{ margin: "50px" }} onSubmit={handleLogin}>
          <InputArea>
            <LoginInput
              type="text"
              name="input_id"
              onChange={handleValueChange}
              placeholder="아이디"
            />
            <LoginInput
              type="password"
              name="input_pw"
              onChange={handleValueChange}
              placeholder="비밀번호"
            />
          </InputArea>
          <LoginBtnWrapper>
            <LoginBtn type="submit">로그인</LoginBtn>
            {/* <SocialNaver />
            <SocialKakao />
            <GoogleOAuthProvider clientId="41843789723-sgafn18v02hjtmrfcdladehsf8hhq1tt.apps.googleusercontent.com">
              <SocialGoogle></SocialGoogle>
            </GoogleOAuthProvider> */}
            <LoginBottom>
              <Link to="/Account/ChoiceAccount">회원가입</Link>
              <Link to="/findId">아이디 비밀번호 찾기</Link>
            </LoginBottom>
          </LoginBtnWrapper>
        </form>
      </div>
    </Container>
  );
}

export default Login;
