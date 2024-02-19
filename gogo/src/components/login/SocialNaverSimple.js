import { useEffect, useRef } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import NaverLogo from "../../assets/naver logo_r.png";
import { useNavigate } from "react-router-dom";
const { naver } = window;

const NaverIdLogin = styled.div`
  display: none;
`;

function NaverSimple() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const naverRef = useRef();

  const naverLogin = new naver.LoginWithNaverId({
    clientId: "Dt3h07_52mnBoskaynlU",
    callbackUrl: "http://localhost:3000/Account/ChoiceAccount",
    isPopup: false,
    loginButton: {
      color: "green",
      type: 1,
      height: 50,
    },
  });

  useEffect(() => {
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        setUser({ ...naverLogin.user });
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("nickname", user.nickname);
      navigate("/SocialName");
    }
  }, [user]);

  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  return (
    <div>
      <div>
        <NaverIdLogin ref={naverRef} id="naverIdLogin" />
        <img
          src={NaverLogo}
          alt="네이버 로그인 아이콘"
          onClick={handleNaverLogin}
          style={{ width: "25px" }}
        />
      </div>
    </div>
  );
}

export default NaverSimple;
