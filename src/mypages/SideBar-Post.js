import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

function getLinkStyle({ isActive }) {
  return {
    // textDecoration: isActive ? "underline" : undefined,
    borderBottom: isActive ? "3px solid #000" : undefined,
  };
}

function Post() {
  return (
    <div className={styles.contents}>
      <div className={styles.postMenus}>
        <NavLink
          className={styles.sidebarItem}
          to={"/myPage/post1/writing"}
          style={getLinkStyle}
        >
          내가 쓴 글
        </NavLink>
      </div>
      <div className={styles.postMenus}>
        <NavLink
          className={styles.sidebarItem}
          to={"/myPage/post1/review"}
          style={getLinkStyle}
        >
          내가 쓴 후기
        </NavLink>
      </div>
      <div className={styles.postMenus}>
        <NavLink
          className={styles.sidebarItem}
          to={"/myPage/post1/inquiry"}
          style={getLinkStyle}
        >
          문의내역
        </NavLink>
      </div>
    </div>
  );
}

export default Post;
