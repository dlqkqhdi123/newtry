import React from "react";
import CommonTable from "./table/CommonTable";
import CommonTableRow from "./table/CommonTableRow";
import CommonTableColumn from "./table/CommonTableColumn";
import styles from "./LgMyPage.module.css";

function PartnerCompany() {
  return (
    <div className={styles.boxbox}>
      <div>
        <h1 className={styles.headhead}>제휴업체</h1>
        <CommonTable headersName={["", "번호", "업체명", "유형"]}>
          <CommonTableRow>
            <CommonTableColumn></CommonTableColumn>
            <CommonTableColumn></CommonTableColumn>
            <CommonTableColumn></CommonTableColumn>
            <CommonTableColumn></CommonTableColumn>
          </CommonTableRow>
        </CommonTable>
      </div>
    </div>
  );
}

export default PartnerCompany;
