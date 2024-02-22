import { Link } from "react-router-dom";
import Chat from "./Chat";

function Community() {
  return (
    <ul>
      <li>{/* <Link to="/chat">실시간 채팅</Link> */}</li>
      <li>
        <Link to="/article">이건 우리 커뮤니티쪽</Link>
      </li>
    </ul>
  );
}

export default Community;
