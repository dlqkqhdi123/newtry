import KakaoLogo from "../../assets/kakao logo_r.png";
import { useEffect, useState } from "react";
import { addDatas } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

const SocialKakaoSimple = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { Kakao } = window;
  const navigate = useNavigate();

  const initKakao = async () => {
    const jsKey = "12960e8f1d627ea898d565f3b8ab8afb";
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(jsKey);
    }
  };

  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: async (res) => {
        console.log(res);
        Kakao.Auth.setAccessToken(res.access_token);
        console.log("카카오 로그인 성공");

        Kakao.API.request({
          url: "/v2/user/me",
          success: async (res) => {
            console.log("카카오 인가 요청 성공");
            setIsLogin(true);
            const kakaoAccount = res.kakao_account;
            const data = {
              nickname: kakaoAccount.profile.nickname,
            };

            try {
              localStorage.setItem("nickname", kakaoAccount.profile.nickname);
              navigate("/SocialName");
            } catch (error) {
              console.log("Firebase 데이터 저장 에러:", error);
            }
          },
          fail: (error) => {
            console.log("카카오 인가 요청 실패:", error);
          },
        });
      },
      fail: (error) => {
        console.log("카카오 로그인 실패:", error);
      },
    });
  };

  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    if (isLogin) {
      setUser({
        email: localStorage.getItem("email"),
        profileImg: localStorage.getItem("profileImg"),
        nickname: localStorage.getItem("nickname"),
      });
    }
  }, [isLogin]);

  return (
    <div className="App">
      <img
        src={KakaoLogo}
        alt="카카오 로그인 로고"
        onClick={kakaoLogin}
        style={{ width: "25px" }}
      />
    </div>
  );
};

export default SocialKakaoSimple;
