import { styled } from "styled-components";
import ownerImg from "../../assets/pet owner.png";
import partnerImg from "../../assets/pet partner.png";
import SocialKakaoSimple from "./../login/SocialKakaoSimple";
import SocialNaverSimple from "./../login/SocialNaverSimple";
import { Link } from "react-router-dom";
import SocialGoogleSimple from "../login/SocialGoogleSimple";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 16px;
  flex-direction: column;
  background-color: #f8ebd8;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: center;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 16px;
`;

const Content = styled.div`
  border: 2px solid #d9d9d980;
  padding: 32px;
  background-color: #fff;
  text-align: center;
  & > * {
    padding: 16px;
  }
`;

const ImgWrapper = styled.div`
  & > img {
    width: 100px;
    height: 100px;
  }
`;

const SignInBtn = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  padding: 8px 32px;
  margin: 8px 0;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    background-color: #ff9b50;
  }
`;

const SocialArea = styled.div`
  display: flex;
  font-size: 14px;
  color: #666;
  align-items: center;
  justify-content: space-around;
`;

const SocialBtnArea = styled.div`
  display: flex;
  gap: 6px;
`;

function ChoiceAccount() {
  return (
    <Container>
      <h1 style={{ margin: "30px", fontSize: "42px" }}>Join</h1>
      <ContentBox>
        <Content>
          <h2>펫오너</h2>
          <p>
            진료비와 질병 데이터베이스 <br />
            조회 및 커뮤니티 등의 혜택을 위해 <br />
            지금 바로 가입하세요.
          </p>
          <ImgWrapper>
            <img src={ownerImg} alt="오너" />
          </ImgWrapper>
          <Link to="/Terms">
            <SignInBtn> 펫 오너로 가입 </SignInBtn>
          </Link>
          <SocialArea>
            <p>SNS로 간편 가입하기</p>
            <SocialBtnArea>
              <SocialKakaoSimple />
              <SocialNaverSimple />
              <GoogleOAuthProvider clientId="41843789723-sgafn18v02hjtmrfcdladehsf8hhq1tt.apps.googleusercontent.com">
                <SocialGoogleSimple />
              </GoogleOAuthProvider>
            </SocialBtnArea>
          </SocialArea>
        </Content>
        <Content>
          <h2>펫 병원&middot;약국</h2>
          <p>
            위치기반으로 동물병원 약국을 <br />
            무료로 홍보할 수 있으니, <br />
            지금 바로 가입하세요.
          </p>
          <ImgWrapper>
            <img src={partnerImg} alt="파트너" />
          </ImgWrapper>
          <Link to="/TermsHos">
            <SignInBtn> 펫 병원&middot;약국 가입 </SignInBtn>
          </Link>
        </Content>
      </ContentBox>
    </Container>
  );
}
export default ChoiceAccount;
