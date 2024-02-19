import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "../../assets/google logo_r.png";
import { styled } from "styled-components";
import { addDatas } from "../../api/firebase";
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

function SocialGoogleSimple() {
  const navigate = useNavigate();
  const clientId =
    "41843789723-0iutpsu7570l8m4kk6lfusurgvk5qt28.apps.googleusercontent.com";

  const login = useGoogleLogin({
    clientId: clientId,
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      const accessToken = tokenResponse.access_token;
      console.log(accessToken);
      if (accessToken) {
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            const email = (data && data.email) || "";
            const name = (data && data.name) || "";
            const profilePicture = (data && data.picture) || "";
            console.log(`이메일: ${email}`);
            console.log(`이름: ${name}`);
            console.log(`프로필 사진: ${profilePicture}`);
            localStorage.setItem("nickname", name);
            navigate("/SocialName");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    onFailure: (error) => {
      console.error(error);
    },
  });

  const handleLoginClick = () => {
    login();
  };

  return (
    <NewBtn onClick={handleLoginClick}>
      {" "}
      <img
        src={GoogleLogo}
        alt="구글 로그인 로고"
        style={{ width: "25px" }}
        onClick={() => login()}
      />
    </NewBtn>
  );
}

export default SocialGoogleSimple;
