import styled from "styled-components";
import "./SignUp.css";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  background-color: #f8ebd8;
  margin: 0 auto;
`;

const LoginBtn = styled.button`
  border: none;
  background-color: #ff9b50;
  color: #fff;
  padding: 8px 48px;
  font-weight: bold;
  margin-top: 24px;
  margin-right: 8px;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
`;

function JoinComplete() {
  return (
    <Container>
      <h2 style={{ fontSize: "42px" }}> Pet Partner Join </h2>
      <h3>가입완료</h3>
      <div className="headWrapper">
        <h3>
          <div className="sign-num">1</div> - <div className="sign-num">2</div>{" "}
          - <div className="sign-num now">3</div>
        </h3>
        <div className="headWrapper-sum">
          <div> 약관동의 </div>
          <div> 정보입력 </div>
          <div> 가입완료 </div>
        </div>
      </div>
      <div className="welcome">
        <p className="welcome-top">
          <strong>회원가입</strong>이 <strong>완료</strong> 되었습니다. :)
        </p>
        <p className="welcome-md">
          모든 회원가입 절차가 완료되었습니다.
          <br /> 로그인 후 모든 서비스를 이용할 수 있습니다.
        </p>
        <div className="welcome-btn">
          <Link to="/login">
            <LoginBtn>로그인</LoginBtn>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default JoinComplete;
