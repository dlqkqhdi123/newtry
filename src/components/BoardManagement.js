import CommonTable from "./../mypages/table/CommonTable.js";
import CommonTableRow from "./../mypages/table/CommonTableRow";
import CommonTableColumn from "./../mypages/table/CommonTableColumn";
import {
  getDatas,
  deleteDatas,
  getDocs,
  collection,
  db,
} from "../api/firebase";
import { useEffect, useState } from "react";
import styles from "./BoardModal.module.css";
import BoardModal from "./BoardModal";
import styled from "styled-components";

const MypageButton = styled.button`
  width: 12rem;
  height: 3.5rem;
  border: 2px solid #ff9b50;
  color: #ff9b50;
  background-color: #f8ebd8;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4.5rem 0;

  &:hover,
  &:active {
    background-color: #ff9b50;
    color: #ffffff;
    font-weight: 700;
  }
`;

function BoardManagement() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);
      const querySnapshot = await getDocs(collection(db, "boards"));
      const loadedItems = [];
      querySnapshot.forEach((doc) => {
        loadedItems.push(doc.data());
      });
      setItems(loadedItems);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoadingError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, "boards"));
      const data = query.docs.map((doc) => doc.data());
      setItems(data); // 가져온 데이터를 items 상태에 설정합니다.
      console.log(query);
    };
    fetchData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (item) => {
    setSelectedReservation(item);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.boxbox}>
      <div>
        <h1 className={styles.headhead}>작성한글</h1>
        <CommonTable headersName={["", "번호", "제목", "펫이름", "예약일자"]}>
          {items.map((item, index) => (
            <CommonTableRow key={index}>
              <CommonTableColumn>
                <input type="checkbox" />
              </CommonTableColumn>
              <CommonTableColumn>{item.boardNumber}</CommonTableColumn>
              <CommonTableColumn>
                <button
                  className={styles.modalButton}
                  onClick={() => openModal(item)}
                >
                  {item.boardTitle}
                </button>
              </CommonTableColumn>
              <CommonTableColumn>{item.petName}</CommonTableColumn>
              <CommonTableColumn>{item.updatedAt}</CommonTableColumn>
            </CommonTableRow>
          ))}
          {isModalOpen && (
            <BoardModal
              isOpen={isModalOpen}
              BoardManagement={selectedReservation}
              onClose={closeModal}
            />
          )}
          <CommonTableRow>
            <CommonTableColumn>
              <input type="checkbox" />
            </CommonTableColumn>
            <CommonTableColumn>02</CommonTableColumn>
            <CommonTableColumn>하기시렁</CommonTableColumn>
            <CommonTableColumn>냥냥이</CommonTableColumn>
            <CommonTableColumn>24-01-16</CommonTableColumn>
          </CommonTableRow>
        </CommonTable>
        <div className={styles.tnwjdtkrwp}>
          <MypageButton>삭제</MypageButton>
        </div>
      </div>
    </div>
  );
}

export default BoardManagement;
