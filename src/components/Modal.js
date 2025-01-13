import React from 'react';
import './Modal.css'; // أنشئ هذا الملف لاحقًا

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
