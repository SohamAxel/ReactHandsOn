import React, { useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const CustomModal = ({ children, title, handleCloseEventForm, openEventModal }) => {
  if (!openEventModal) return null;

  return createPortal(
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          {title}
          <button className="close-btn" onClick={handleCloseEventForm}>&times;</button>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector("#modals")
  );
};

export default CustomModal;
