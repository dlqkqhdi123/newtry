import React from "react";
import CommonTable from "../table/CommonTable";
import CommonTableColumn from "../table/CommonTableColumn";
import CommonTableRow from "../table/CommonTableRow";

const InquiryList = (props) => {
  return (
    <>
      <CommonTable
        headersName={[
          "",
          "번호",
          "문의유형",
          "문의제목",
          "날짜"
        ]}
      >
        <CommonTableRow>
          <CommonTableColumn>
            <input type="checkbox" />
          </CommonTableColumn>
          <CommonTableColumn>001</CommonTableColumn>
          <CommonTableColumn>제휴 및 제안문의</CommonTableColumn>
          <CommonTableColumn>안녕하세요. 저희는 댕댕업체입니다...</CommonTableColumn>
          <CommonTableColumn>2014-01-16</CommonTableColumn>
        </CommonTableRow>
 
        <CommonTableRow>
          <CommonTableColumn>
            <input type="checkbox" />
          </CommonTableColumn>
          <CommonTableColumn>002</CommonTableColumn>
          <CommonTableColumn>기타</CommonTableColumn>
          <CommonTableColumn>병원진료 예약을 했는데 업체에서...</CommonTableColumn>
          <CommonTableColumn>2014-01-16</CommonTableColumn>
        </CommonTableRow>

      </CommonTable>
    </>
  );
};
export default InquiryList;
