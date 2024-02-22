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

export default MypageButton;
