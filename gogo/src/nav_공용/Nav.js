import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";
// import Logo from "../assets/Logo_main.svg";
import { useContext } from "react";
import AuthContext from "../components/Account/AuthContext";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : undefined,
  };
}

function Nav() {
  const isLogined = JSON.parse(localStorage.getItem("member"));
  const { isLogin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e) => {
    const paths = ["/SignUp", "/SignUpHos", "/SignUpPh", "/SocialName"];
    if (paths.includes(location.pathname)) {
      if (
        !window.confirm(
          "입력한 정보가 사라집니다. 정말 가입을 취소하시겠습니까?"
        )
      ) {
        e.preventDefault();
        return false; // 취소를 선택한 경우 false 반환
      }
    }
    return true; // 그 외의 경우 true 반환
  };

  const handleRemoveLocal = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("member");
      localStorage.removeItem("com.naver.nid.access_token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("name");
      logout();
      navigate("/");
    }
  };

  const handleMyPageClick = (e) => {
    const result = handleLinkClick(e);
    if (!result) return;

    if (isLogined === null && !isLogin) {
      alert("로그인 후 이용하실 수 있습니다.");
      navigate("/login");
      e.preventDefault();
    } else {
      navigate("/mypage");
    }
  };
  return (
    <nav>
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>
            <div style={{ display: "inline-block" }}></div>
          </Link>
        </div>
        <ul className="nav-ul">
          <li className="nav-item">
            <NavLink
              to="/disease"
              className="nav-link"
              style={getLinkStyle}
              onClick={handleLinkClick}
            >
              Disease
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/hospital"
              className="nav-link"
              style={getLinkStyle}
              onClick={handleLinkClick}
            >
              Hospital
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/mbti"
              className="nav-link"
              style={getLinkStyle}
              onClick={handleLinkClick}
            >
              MBTI
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/article"
              className="nav-link"
              style={getLinkStyle}
              onClick={handleLinkClick}
            >
              Community
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/mypage"
              className="nav-link"
              style={getLinkStyle}
              onClick={(e) => {
                handleMyPageClick(e);
                handleLinkClick(e);
              }}
            >
              My Page
            </NavLink>
          </li>
          <li className="nav-item">
            {!isLogined && !isLogin ? (
              <NavLink
                to="/login"
                className="nav-link"
                style={getLinkStyle}
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className="nav-link"
                style={getLinkStyle}
                onClick={handleRemoveLocal}
              >
                Logout
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
