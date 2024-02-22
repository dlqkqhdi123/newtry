import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

function getLinkStyle({ isActive }) {
  return {
    // textDecoration: isActive ? "underline" : undefined,
    borderBottom: isActive ? "3px solid #000" : undefined,
  };
}

function Message() {
  return (
    <div className={styles.contents}>
      <div className={styles.postMenus}>
<NavLink
             className={styles.sidebarItem} to={"/myPage/message1/messageReceived"} style={getLinkStyle}>
          받은 메시지
        </NavLink>
      </div>
      <div className={styles.postMenus}>
      <NavLink
             className={styles.sidebarItem} to={"/myPage/message1/sentMessage"} style={getLinkStyle}>
          보낸 메시지
        </NavLink>
      </div>
    </div>
  );
}

export default Message;
