import MypageButton from "../../components/MypageButton";
import styles from "../MyPage.module.css";
import style from "./Shop.module.css";
import { useEffect, useState } from "react";
import Overlay from "../Overlay";
import ShopingModal from "./ShopingModal";

function Shop({ points }) {
  const shoping = [
    {
      id: 1,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_01",
      price: 15000,
      url: require("../../assets/gallery/pointshop_01.png"),
    },
    {
      id: 2,
      label: "산양유 스틱 50g (6개입)",
      alt: "pointshop_02",
      price: "12,000냥",
      url: require("../../assets/gallery/pointshop_02.png"),
    },
    {
      id: 3,
      label: "냥냥 참치캔 85g (3캔)",
      alt: "pointshop_04",
      price: "15,000냥",
      url: require("../../assets/gallery/pointshop_04.png"),
      btn: "교환하기",
    },
    {
      id: 4,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_03",
      price: "15,000냥",
      url: require("../../assets/gallery/pointshop_03.png"),
    },
    {
      id: 5,
      label: "배밴 패드",
      alt: "pointshop_05",
      price: "25,000냥",
      url: require("../../assets/gallery/pointshop_05.png"),
    },
    {
      id: 6,
      label: "고양이 모래",
      alt: "pointshop_07",
      price: "25,000냥",
      url: require("../../assets/gallery/pointshop_07.png"),
    },
    {
      id: 7,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_06",
      price: "15,000냥",
      url: require("../../assets/gallery/pointshop_06.png"),
    },
    {
      id: 8,
      label: "고구마 져키 50g (6개입)",
      alt: "pointshop_08",
      price: "15,000냥",
      url: require("../../assets/gallery/pointshop_08.png"),
    },
  ];

  let [modalOpen, setModalOpen] = useState(false);
  let [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
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
          <h4 className={style.shopPrice}>{shop.price}</h4>

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
              shoping={shoping.find((shop) => shop.id === selectedProductId)}
              setModalOpen={setModalOpen}
              points={points}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Shop;
