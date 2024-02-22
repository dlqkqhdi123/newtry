import React from "react";
import CommonTable from "../table/CommonTable";
import CommonTableColumn from "../table/CommonTableColumn";
import CommonTableRow from "../table/CommonTableRow";
import styled from "styled-components";

const PointList = (props) => {
  return (
    <>
      <CommonTable headersName={["번호", "내역", "적립금", "사용", "날짜"]}>
        <CommonTableRow>
          <CommonTableColumn>001</CommonTableColumn>
          <CommonTableColumn>회원가입 축하 포인트</CommonTableColumn>
          <CommonTableColumn>
            <span style={{ color: "#ff8b50" }}>3000</span>
          </CommonTableColumn>
          <CommonTableColumn>0</CommonTableColumn>
          <CommonTableColumn>2014-01-16</CommonTableColumn>
        </CommonTableRow>

        <CommonTableRow>
          <CommonTableColumn>002</CommonTableColumn>
          <CommonTableColumn>이벤트 당첨 축하 포인트</CommonTableColumn>
          <CommonTableColumn>
            <span style={{ color: "#ff8b50" }}>5000</span>
          </CommonTableColumn>
          <CommonTableColumn>0</CommonTableColumn>
          <CommonTableColumn>2014-01-16</CommonTableColumn>
        </CommonTableRow>
      </CommonTable>
    </>
  );
};
export default PointList;
