import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainGallery.css";
import MainCommunity from "./MainCommunity";
import { getDocumentsDescending } from "../api/firebase";

function MainGallery() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const handleLoad = async () => {
      const courseItems = await getDocumentsDescending(
        "articles",
        "uploadTime",
        3
      );
      setItems(courseItems);
    };

    handleLoad();
  }, []);

  return (
    <div className="Container-gallery">
      <div className="Gallery">
        <div className="context">
          <h3>Gallery</h3>
        </div>
        <div className="Community">
          {items.map((articles) => (
            <MainCommunity
              key={articles.title}
              articles={articles}
              memberNickName={articles.userData.memberNickName}
              uploadTime={articles.uploadTime}
            />
          ))}
        </div>
        <Link to="/article" className="StyleLink-Gallery">
          <span className="Inner-Gallery">More</span>
        </Link>
        <div className="Gallery-img-back" />
      </div>
    </div>
  );
}
export default MainGallery;
