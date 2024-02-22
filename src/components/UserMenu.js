import { Link } from "react-router-dom";
import personIcon from "../assets/person.png";
import "./UserMenu.css";
import { useEffect, useState } from "react";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const isLogined = JSON.parse(localStorage.getItem("member"));

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => setIsOpen(false);

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="userMenu">
      <button className="iconButton" onClick={handleButtonClick}>
        <img className="iconButton img" src={personIcon} alt="userMenu" />
      </button>
      {isOpen && (
        <ul className="popup">
          {!isLogined ? (
            <Link to="/login">
              <li className="list">로그인</li>
            </Link>
          ) : (
            <Link to="/logout">
              <li>로그아웃</li>
            </Link>
          )}
          <Link to="/mypage">
            <li>마이페이지</li>
          </Link>
          <Link to="/customerservice">
            <li>고객센터</li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
