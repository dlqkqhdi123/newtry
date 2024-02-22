import "./Button.css";
import OrangeFoot from "../assets/logo/발바닥_or.png";
import WhiteFoot from "../assets/logo/발바닥.png";
import { useMember } from "./../contexts/MemberContext";
import { useEffect, useState } from "react";

function Button({ children, onSendData }) {
  const currentUser = useMember();
  const [userData, setUserData] = useState(currentUser.userData);

  useEffect(() => {
    setUserData(currentUser.userData);
  }, [currentUser.userData]);

  const handleButtonClick = () => {
    const fileInput = document.getElementById("imageInput");
    const selectedImage = fileInput.files && fileInput.files[0];

    if (typeof onSendData === "function") {
      const data = {
        title: "제목",
        content: "내용",
        images: [selectedImage],
        uploadTime: new Date().toISOString(),
        userData: userData,
      };

      onSendData(data);
    } else {
      console.log(
        "Data not sent. currentUser or currentUser.userData is undefined."
      );
    }
  };

  return (
    <div className="bottom-button">
      <button className="button" onClick={handleButtonClick}>
        <div className="button-wrap">
          {children}
          <img src={OrangeFoot} alt="주황 발바닥" />
          <img src={WhiteFoot} alt="발바닥" className="hover-image" />
        </div>
      </button>
    </div>
  );
}

export default Button;
