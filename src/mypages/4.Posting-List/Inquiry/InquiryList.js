import React, { useEffect, useState } from "react";
import CommonTable from "../../table/CommonTable";
import CommonTableColumn from "../../table/CommonTableColumn";
import CommonTableRow from "../../table/CommonTableRow";
import { collection, db, getDocs } from "../../../api/firebase";

const InquiryList = (props) => {
  // //////파이어베이스///////////
  const [PostingI, setPostingI] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const PostingIData = await getDocs(
        collection(db, "MyPageCustomer-PostingI")
      );
      const dataList = PostingIData.docs.map((doc) => doc.data());
      setPostingI(dataList);
    };

    fetchData();
  }, []);

  return (
    <>
      <CommonTable headersName={["", "번호", "문의유형", "문의제목", "날짜"]}>
        {PostingI
          ? PostingI.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <CommonTableColumn>
                    <input type={item.checkbox} />
                  </CommonTableColumn>
                  <CommonTableColumn>{item.no}</CommonTableColumn>
                  <CommonTableColumn>{item.InquiryType}</CommonTableColumn>
                  <CommonTableColumn>{item.InquiryTitle}</CommonTableColumn>
                  <CommonTableColumn>2014-01-16</CommonTableColumn>
                </CommonTableRow>
              );
            })
          : ""}
      </CommonTable>
    </>
  );
};
export default InquiryList;
