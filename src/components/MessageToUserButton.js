import "./MessageToUserButton.css";

function MessageToUserButton({ children, onClick }) {
  return (
    <div className="bottom-buttons">
      <button onClick={onClick} className="MessageToUserButton">
        <div className="button-wrapper">{children}</div>
      </button>
    </div>
  );
}

export default MessageToUserButton;
