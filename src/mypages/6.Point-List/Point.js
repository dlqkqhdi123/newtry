import PointList from "./PointList";
import styles from "../MyPage.module.css";
import styleA from "./Point.module.css";
import style from "./Shop.module.css";
import MypageButton from "../../components/MypageButton";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import Overlay from "./../Overlay";
import ShopingModal from "./ShopingModal";
import {
  getFirebaseDocument,
  updateFirebaseDocument,
} from "../../api/firebase";

function Point() {
  const shoping = [
    {
      id: 1,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_01",
      price: 10000,
      url: require("../../assets/gallery/pointshop_01.png"),
    },
    {
      id: 2,
      label: "산양유 스틱 50g (6개입)",
      alt: "pointshop_02",
      price: 8000,
      url: require("../../assets/gallery/pointshop_02.png"),
    },
    {
      id: 3,
      label: "냥냥 참치캔 85g (3캔)",
      alt: "pointshop_04",
      price: 6000,
      url: require("../../assets/gallery/pointshop_04.png"),
      btn: "교환하기",
    },
    {
      id: 4,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_03",
      price: 10000,
      url: require("../../assets/gallery/pointshop_03.png"),
    },
    {
      id: 5,
      label: "배밴 패드",
      alt: "pointshop_05",
      price: 15000,
      url: require("../../assets/gallery/pointshop_05.png"),
    },
    {
      id: 6,
      label: "고양이 모래",
      alt: "pointshop_07",
      price: 20000,
      url: require("../../assets/gallery/pointshop_07.png"),
    },
    {
      id: 7,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_06",
      price: 10000,
      url: require("../../assets/gallery/pointshop_06.png"),
    },
    {
      id: 8,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_08",
      price: 10000,
      url: require("../../assets/gallery/pointshop_08.png"),
    },
  ];

  let [modalOpen, setModalOpen] = useState(false);
  let [selectedProductId, setSelectedProductId] = useState(null);

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [member, setMember] = useState({});
  const offset = (page - 1) * limit;

  const displayedData = posts.slice(offset, offset + limit);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member && member.memberId) {
      getFirebaseDocument(setMember);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFirebaseDocument(member);
      getFirebaseDocument(setMember);
    } catch (error) {
      console.error("Firebase 문서 업데이트 실패:", error);
    }
  };

  // let point = member?.point;

  console.log(member);

  return (
    <div className={styles.containerBox}>
      <h1 className={styles.h1} style={{ borderBottom: "2px solid #ff8b50" }}>
        포인트 샵
      </h1>

      {/* ////////////////////////////////////// */}
      <form className={styleA.pointbody} onSubmit={handleSubmit}>
        <div key={member.memberId}>
          <p className={styleA.pointsHeld} key={member.memberId}>
            보유포인트
            <span className={styleA.score} key={member.memberId}>
              {member.point && (
                <span style={{ fontSize: "25px" }}> {member.point}</span>
              )}{" "}
              냥
            </span>
          </p>
        </div>

        <div>
          <div className={style.ShopContainer}>
            {shoping.map((shop, index) => (
              <div
                className={style.Shopbox}
                key={index}
                onClick={() => setSelectedProductId(shop.id)}
              >
                <figure className={style.shopImg}>
                  <img
                    src={shop.url}
                    alt={shop.alt}
                    style={{
                      objectFit: "contain",
                      width: "190px",
                      height: "150px",
                    }}
                  />
                </figure>
                <p className={style.shopItem}>{shop.label}</p>
                <h4 className={style.shopPrice}>{shop.price}냥</h4>

                <div className={styles.retouch}>
                  <MypageButton
                    type="submit"
                    className="correction"
                    style={{ margin: "0", height: "2.5rem" }}
                    onClick={() => {
                      setSelectedProductId(shop.id);
                      setModalOpen(true);
                    }}
                  >
                    교환하기
                  </MypageButton>
                </div>
              </div>
            ))}
            {selectedProductId !== null && (
              <>
                {modalOpen && <Overlay modalOpen={true} />}
                {modalOpen && (
                  <ShopingModal
                    shoping={shoping.find(
                      (shop) => shop.id === selectedProductId
                    )}
                    setModalOpen={setModalOpen}
                    member={member}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </form>
      <PointList />
      <p className={styleA.annotation}>
        *기프트콘은 이벤트와 재고량에 따라 수시로 변경될 수 있습니다.
      </p>

      <footer>
        <Pagination
          total={shoping.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
}

export default Point;
