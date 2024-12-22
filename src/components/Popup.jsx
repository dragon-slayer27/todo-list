function Popup(props) {
  const {
    isOpen = false,
    title = "",
    message = "",
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = props;

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal") {
      onCancel();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modalContent">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modalActions">
          {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
          {onCancel && <button onClick={onCancel}>{cancelText}</button>}
        </div>
      </div>
    </div>
  );
}

export default Popup;
