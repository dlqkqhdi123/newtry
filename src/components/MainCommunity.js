import React from "react";
import "./MainCommunity.css";
import defaultImage from "../assets/icon/icon_profile.svg";

function MainCommunity({ articles, memberNickName, uploadTime }) {
  const date = new Date(uploadTime);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="Community-item">
      <div className="Community-image">
        <img src={articles.images} alt="Community Image" />
        <ul className="Community-context">
          <li className="Community-context-1">{articles.title}</li>

          <ul className="Community-context-in">
            <li className="Community-context-2">
              <img
                className="in-profile"
                src={
                  articles.userData.profileImageURL
                    ? articles.userData.profileImageURL
                    : defaultImage
                }
                alt="Profile"
              />
              <div className="Community-context-2-2">{memberNickName}</div>
            </li>
            <li className="Community-context-3">{formattedDate}</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default MainCommunity;
