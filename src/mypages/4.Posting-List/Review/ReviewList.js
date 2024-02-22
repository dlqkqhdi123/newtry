import React, { useEffect, useState } from "react";
import CommonTable from "../../table/CommonTable";
import CommonTableColumn from "../../table/CommonTableColumn";
import CommonTableRow from "../../table/CommonTableRow";
import Overlay from "../../Overlay";
import ReviewModal from "./ReviewModal";
import { collection, db, getDocs } from "../../../api/firebase";

const ReviewList = (props) => {
  // //////파이어베이스///////////
  const [PostingR, setPostingR] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const PostingRData = await getDocs(
        collection(db, "MyPageCustomer-PostingR")
      );
      const dataList = PostingRData.docs.map((doc) => doc.data());
      setPostingR(dataList);
    };

    fetchData();
  }, []);

  // //////모달///////////
  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
    <>
      <CommonTable headersName={["", "번호", "업체명", "후기 제목", "날짜"]}>
        {PostingR
          ? PostingR.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <CommonTableColumn>
                    <input type={item.checkbox} />
                  </CommonTableColumn>
                  <CommonTableColumn>{item.no}</CommonTableColumn>
                  <CommonTableColumn>{item.company}</CommonTableColumn>
                  <CommonTableColumn>
                    {" "}
                    <p
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      {item.title}
                    </p>
                  </CommonTableColumn>
                  <CommonTableColumn>{item.createDate}</CommonTableColumn>
                </CommonTableRow>
              );
            })
          : ""}
      </CommonTable>

      {modalOpen && <Overlay modalOpen={modalOpen} />}
      {modalOpen && <ReviewModal setModalOpen={setModalOpen} />}
    </>
  );
};
export default ReviewList;
