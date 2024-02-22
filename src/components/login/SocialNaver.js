import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import NaverLogo from "../../assets/logo/naver logo.png";
import { addDatas, getSocialMember } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Account/AuthContext";

const NaverIdLogin = styled.div`
  display: none;
`;

const NaverLoginBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #06bd34;
  border: none;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
`;

function Naver() {
  const [user, setUser] = useState(null);
  const [memberObj, setMemberObj] = useState(null);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  const naverRef = useRef();
  const { naver } = window;

  const naverLogin = new naver.LoginWithNaverId({
    clientId: "Dt3h07_52mnBoskaynlU",
    callbackUrl: "http://localhost:3000/login",
    isPopup: false,
    loginButton: {
      color: "green",
      type: 1,
      height: 50,
    },
  });

  useEffect(() => {
    naverLogin.init();
    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        const userData = { ...naverLogin.user };
        setLoginStatus(status);
        setUser(userData);

        // getSocialMember 함수 호출
        const memberObjFromFirebase = await getSocialMember(userData.nickname);
        setMemberObj(memberObjFromFirebase); // memberObj 상태 업데이트

        if (memberObjFromFirebase) {
          alert(`돌아오신 것을 환영합니다! ${userData.nickname} 님`);
          handleLogin();
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          // 일치하는 회원 정보가 없는 경우
          navigate("/SocialName");
        }
      }
    });
  }, []);

  const handleNaverLogin = () => {
    if (naverRef.current && naverRef.current.children[0]) {
      naverRef.current.children[0].click();
    }
  };

  return (
    <div>
      <div>
        <NaverIdLogin ref={naverRef} id="naverIdLogin" />
        <NaverLoginBtn onClick={handleNaverLogin}>
          <img src={NaverLogo} alt="네이버 로그인 아이콘" />
          Naver 로 로그인
          <div></div>
        </NaverLoginBtn>
      </div>
    </div>
  );
}

export default Naver;
