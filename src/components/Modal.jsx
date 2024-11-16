import "../styles/Modal.css";

export default function Modal({ isOpen, onClose, content, restart }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div className="modal-content">
        {content}
        <button onClick={restart}>New game</button>
      </div>
    </div>
  );
}
