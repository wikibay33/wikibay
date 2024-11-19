
'use client'
import React, { useEffect } from 'react';

const Modal = ({ show, onClose, onConfirm, confirmText, cancelText, children }) => {
 

  const handleClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  if (!show) return null;
  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div className={`bg-white p-8 rounded shadow-md max-h-screen mt-24  w-full mx-auto lg:w-1/2 ${confirmText === "مسح" ? 'h-fit' : ''}`}>
        {children}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 ${confirmText === "مسح" ? "bg-red-600" : "bg-blue-500" }  text-white rounded`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
