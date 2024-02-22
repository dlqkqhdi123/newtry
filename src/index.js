import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import { MemberProvider } from "./contexts/MemberContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MemberProvider>
    <Main />
  </MemberProvider>
);
