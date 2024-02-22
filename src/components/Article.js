import { Link } from "react-router-dom";
import "firebase/storage";
import { LuClipboardEdit } from "react-icons/lu";
import "./Article.css";
import "./ArticleFooter.css";
import "./ArticleNav.css";
import communityDog from "../assets/source/community_dog.gif";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ArticleListItem from "./ArticleListItem";
import { db, addDatas, getDatas } from "../api/firebase";
import { useMember } from "../contexts/MemberContext";

function Article() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDataList, setModalDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItemCount, setVisibleItemCount] = useState(4);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const userData = useMember();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getDatas("articles");
        setModalDataList(
          articles.sort(
            (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshFlag]);

  const refreshArticle = () => {
    setRefreshFlag((prevFlag) => !prevFlag);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalData = async (data) => {
    data.uploadTime = new Date().toISOString();
    data.userData = userData;
    data.category = selectedCategory;

    try {
      const docRef = await addDatas("articles", data);
      const docId = docRef.id;
      data.docId = docId;

      setModalDataList((prevList) =>
        [...prevList, data].sort(
          (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
        )
      );

      closeModal();
    } catch (error) {
      // console.error("Error adding document to Firestore:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleItemCount(4);
  };
  const loadMoreItems = () => {
    setVisibleItemCount((prevCount) => prevCount + 4);
    setLoadMoreClicked(true);
  };

  const filteredModalDataList = modalDataList.filter((modalData) => {
    if (selectedCategory === "All") {
      return true;
    } else {
      return modalData.category === selectedCategory;
    }
  });

  return (
    <div className="main-container">
      <div className="article-container">
        <div className="wraps">
          <div className="article-header">
            <div className="article-header-inner">
              <h1 className="article-title">Community</h1>
              <div className="article-category">
                <ul className="category-lists">
                  <li
                    className={`category-list ${
                      selectedCategory === "All" && "active"
                    }`}
                  >
                    <Link
                      to="/article"
                      className="category-link"
                      onClick={() => handleCategoryClick("All")}
                    >
                      All
                    </Link>
                  </li>
                  <li
                    className={`category-list ${
                      selectedCategory === "나눔/분양" && "active"
                    }`}
                  >
                    <span onClick={() => handleCategoryClick("나눔/분양")}>
                      나눔/분양
                    </span>
                  </li>
                  <li
                    className={`category-list ${
                      selectedCategory === "꿀팁" && "active"
                    }`}
                  >
                    <span onClick={() => handleCategoryClick("꿀팁")}>
                      꿀팁
                    </span>
                  </li>
                  <li
                    className={`category-list ${
                      selectedCategory === "갤러리" && "active"
                    }`}
                  >
                    <span onClick={() => handleCategoryClick("갤러리")}>
                      갤러리
                    </span>
                  </li>
                </ul>
              </div>
              <div className="article-illust">
                <div className="article-illust-img">
                  <figure className="article-img">
                    <img src={communityDog} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="article-body">
            <div className="article-body-inner">
              <div className="write" onClick={openModal}>
                <p className="write-content">글쓰기</p>
                <LuClipboardEdit />
              </div>
              {filteredModalDataList
                .slice(0, visibleItemCount)
                .map((modalData, index) => (
                  <ArticleListItem
                    key={index}
                    modalData={modalData}
                    index={index}
                    userData={modalData.userData}
                    articleId={modalData.docId}
                    commentCounts={modalData.commentCounts}
                    refreshArticle={refreshArticle}
                    refreshFlag={refreshFlag}
                    category={selectedCategory}
                  />
                ))}
            </div>
            <div className="load-more">
              {filteredModalDataList.length > visibleItemCount && (
                <div className="load-more-overlay" onClick={loadMoreItems}>
                  <span className="load-more-text">More</span>
                </div>
              )}
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSendData={handleModalData}
              refreshArticle={refreshArticle}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Article;
