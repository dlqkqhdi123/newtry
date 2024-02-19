import styled from "styled-components";

const LgOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 50;
  overflow: hidden;
  ${(props) =>
    props.modalOpen &&
    `
    overflow-y: scroll;
  `}
`;

export default LgOverlay;
