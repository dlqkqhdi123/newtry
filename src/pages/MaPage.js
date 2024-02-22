import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import SideBar from "../components/disease/SideBar";

const Div = styled.div`
  display: flex;
`;

function MaPage() {
  return (
    <Div>
      <SideBar />
      <Outlet />
    </Div>
  );
}

export default MaPage;
