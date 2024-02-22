import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import "./App.css";

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
