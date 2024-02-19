import React, { useState } from "react";
import RemoveAccount from "./RemoveAccount";
import styled from "styled-components";

const FindIdBtn = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  padding: 8px 32px;
  margin-top: 32px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    background-color: #ff9b50;
  }
`;

function RemoveModal() {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const handleRemove = async () => {
    setRemoveModalOpen(true);
  };

  const closeModal = () => {
    setRemoveModalOpen(false);
  };

  return (
    <>
      <RemoveAccount open={removeModalOpen} onClose={closeModal} />

      <FindIdBtn onClick={handleRemove}>회원탈퇴</FindIdBtn>
    </>
  );
}

export default RemoveModal;
