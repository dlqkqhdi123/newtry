import React, { useEffect, useState } from "react";
import CommonTable from "../../table/CommonTable";
import CommonTableColumn from "../../table/CommonTableColumn";
import CommonTableRow from "../../table/CommonTableRow";
// import { postList } from "./Data";
import Overlay from "../../Overlay";
import WritingModal from "./WritingModal";

import { collection, db, firestore, getDocs } from "../../../api/firebase";

const WritingList = (props) => {
  // //////파이어베이스///////////
  const [PostingW, setPostingW] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const PostingWData = await getDocs(
        collection(db, "MyPageCustomer-PostingW")
      );
      const dataList = PostingWData.docs.map((doc) => doc.data());
      setPostingW(dataList);
    };

    fetchData();
  }, []);

  // ////////모달///////////
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNo, setSelectedNo] = useState(null);

  const openModal = (no) => {
    setSelectedNo(no);
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  return (
    <>
      <CommonTable headersName={["", "번호", "제목", "작성글", "작성일"]}>
        {PostingW
          ? PostingW.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <CommonTableColumn>
                    <input type={item.checkbox} />
                  </CommonTableColumn>
                  <CommonTableColumn>{item.no}</CommonTableColumn>
                  <CommonTableColumn>
                    <p
                      onClick={() => {
                        openModal(item.no);
                      }}
                    >
                      {item.title}
                    </p>
                  </CommonTableColumn>
                  <CommonTableColumn>{item.property}</CommonTableColumn>
                  <CommonTableColumn>{item.createDate}</CommonTableColumn>
                </CommonTableRow>
              );
            })
          : ""}
      </CommonTable>

      {modalOpen && <Overlay modalOpen={modalOpen} />}
      {modalOpen && (
        <WritingModal setModalOpen={setModalOpen} selectedNo={selectedNo} />
      )}
    </>
  );
};
export default WritingList;
