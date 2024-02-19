import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { styled } from "styled-components";

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
