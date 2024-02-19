import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAddress } from "../../utills/getAddress";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const Search = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (data) => {
    const address = getAddress(data);
    navigate("/", {
      state: {
        postcode: data.zonecode,
        address: address,
      },
    });
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>주소 찾기</button>
      {isModalOpen && (
        <Modal>
          <p fontSize="3xl">주소 찾기</p>
          <DaumPostcode onComplete={handleComplete} />
          <button onClick={handleClose}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

export default Search;
