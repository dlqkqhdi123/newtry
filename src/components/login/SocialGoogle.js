import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "../../assets/logo/google logo.png";
import { styled } from "styled-components";
import { addDatas, getSocialMember } from "../../api/firebase";
import { useContext, useState } from "react";
import AuthContext from "../Account/AuthContext";
import { useNavigate } from "react-router-dom";

const NewBtn = styled.div`
  & > button {
    background-color: #fff;
    border: none;
    font-size: 16px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 16px;
    opacity: 1;
    cursor: pointer;
  }
`;

function SocialGoogle() {
  const [isLogin, setIsLogin] = useState(false);
  const [memberObj, setMemberObj] = useState(null);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const clientId =
    "41843789723-0iutpsu7570l8m4kk6lfusurgvk5qt28.apps.googleusercontent.com";

  const login = useGoogleLogin({
    clientId: clientId,
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse); // tokenResponse 객체 출력
      const accessToken = tokenResponse.access_token;
      console.log(accessToken); // accessToken 값 출력
      if (accessToken) {
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            // async 키워드 추가
            const email = (data && data.email) || "";
            const name = (data && data.name) || "";
            const profilePicture = (data && data.picture) || "";
            console.log(`이메일: ${email}`);
            console.log(`이름: ${name}`);
            console.log(`프로필 사진: ${profilePicture}`);
            localStorage.setItem("name", name);

            const userData = {
              nickname: name,
            };
            const memberObj = await getSocialMember(userData.nickname);
            console.log(memberObj);
            if (memberObj) {
              alert(`돌아오신 것을 환영합니다! ${userData.nickname} 님`);
              const memberObj = await getSocialMember(userData.nickname);
              setMemberObj(memberObj);
              handleLogin();
              setTimeout(() => {
                navigate("/");
              }, 500); // 500ms 후에 navigate 함수를 호출합니다.
            } else {
              // 일치하는 회원 정보가 없는 경우
              navigate("/SocialName");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    onFailure: (error) => {
      console.error(error); // 로그인 실패 시 에러 출력
    },
  });

  const handleLoginClick = () => {
    login();
  };

  return (
    <NewBtn>
      <button onClick={handleLoginClick}>
        <img
          src={GoogleLogo}
          alt="구글 로그인 로고"
          style={{ width: "30px" }}
        />
        Google 로 로그인
        <div></div>
      </button>
    </NewBtn>
  );
}

export default SocialGoogle;
