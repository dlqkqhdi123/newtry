import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./../nav_공용/Nav";
import Footer from "./../footer_공용/Footer";

const appContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#F8EBD8",
};

function App() {
  return (
    <div style={appContainer}>
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
