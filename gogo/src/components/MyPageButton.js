import React from "react";
import styled from "styled-components";

const MyPageButton = styled.button`
  // padding: 10px 50px;
  width: 150px;
  height: 50px;
  border: 2px solid #ff9b50;
  color: #ff9b50;
  background-color: #f8ebd8;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4.5rem 0;
  font-size: 16px;

  &:hover,
  &:active {
    background-color: #ff9b50;
    color: #ffffff;
  }
`;

export default MyPageButton;
