import styless from "./ShopingModal.module.css";
import style from "../Modal.module.css";
import { ReactComponent as Close } from "../../assets/icon/icon-close_w.svg";
import { useEffect, useState } from "react";
import {
  getFirebaseDocument,
  updateFirebaseDocument,
} from "../../api/firebase";

function ShopingModal({ shoping, setModalOpen, member }) {
  const [memberPoint, setMemberPoint] = useState({});

  console.log(memberPoint);

  // 주문하기;

  const handleOrder = async () => {
    try {
      // updateFirebaseDocument 함수가 완료될 때까지 대기
      await updateFirebaseDocument(member);

      // shoping.price를 memberpoint에서 빼고 새로운 포인트로 업데이트
      const updatedPoint = member.point - shoping.price;

      console.log("Updated Point:", updatedPoint);

      // updateFirebaseDocument로 포인트 업데이트
      await updateFirebaseDocument({
        memberId: member?.memberId,
        point: updatedPoint,
      });

      // setMemberPoint로 상태 업데이트
      setMemberPoint(updatedPoint);

      // 모달 닫기
      setModalOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("포인트 업데이트 실패:", error);
    }
  };

  return (
    <div className={style.modalbox} style={{ width: "65rem", height: "55rem" }}>
      <div className={style.header}>
        <h4>포인트 교환하기</h4>
        <button
          className={style.closebtn}
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <Close />
        </button>
      </div>
      <div className={styless.shopingbody}>
        {shoping && (
          <div className={styless.Shopbox}>
            <figure className={styless.shopImg}>
              <img
                src={shoping.url}
                alt={shoping.alt}
                className={styless.img}
              />
            </figure>
            <p className={styless.shopItem}>{shoping.label}</p>
            <p className={styless.shopPrice}>{shoping.price}</p>
          </div>
        )}

        <from className={styless.infoBox}>
          <div className={styless.container2}>
            <label className={styless.label} htmlFor="petName">
              받는 이
            </label>
            <input
              className={styless.input}
              type="text"
              id="petName"
              placeholder="반려동물 이름을 작성해주세요."
            />
          </div>

          <div className={styless.container2}>
            <label className={styless.label} htmlFor="petName">
              연락처
            </label>
            <div className={styless.choice}>
              <select className={styless.select2} name="" id="">
                <option value="">선택</option>
              </select>{" "}
              <div>-</div>
              <select className={styless.select2} name="" id="">
                <option value="">선택</option>
              </select>{" "}
              <div>-</div>
              <select className={styless.select2} name="" id="">
                <option value="">선택</option>
              </select>{" "}
            </div>
          </div>

          <div className={styless.container3}>
            <label className={styless.label} htmlFor="add">
              주소 찾기
            </label>
            <div className={styless.choice2}>
              <input
                className={styless.input}
                type="text"
                id="postNumber"
                placeholder="우편번호"
              />
              <input
                className={styless.input}
                type="text"
                id="address"
                placeholder="주소"
              />
              <input
                className={styless.input}
                type="text"
                id="detailedAdd"
                placeholder="상세주소"
              />
            </div>
            <button
              className={style.button2}
              style={{ width: "70.5px", height: "37.5px", marginLeft: "20px" }}
            >
              찾기
            </button>
          </div>
        </from>

        <div className={style.btnbox}>
          <button className={style.button2} type="submit" onClick={handleOrder}>
            주문하기
          </button>
          <button
            className={style.button2}
            type="submit"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopingModal;
