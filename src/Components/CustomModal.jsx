import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CustomModal = () => {
  const [showCustomModal, setShowCustomModal] = useState(false);

  const hideModal = () => {
    setShowCustomModal(false);
  };
  const toggleModal = () => {
    setShowCustomModal((p) => !p);
  };
  return (
    <>
      <button onClick={() => toggleModal()}>CustomModal</button>
      <CustomModalPortal
        showCustomModal={showCustomModal}
        hideModal={hideModal}
      >
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
      </CustomModalPortal>
    </>
  );
};

const CustomModalPortal = ({ children, showCustomModal, hideModal }) => {
  useEffect(() => {
    function keyPress(e) {
      if (e.key === "Escape") {
        hideModal();
      }
    }
    if (showCustomModal == true) {
      document.body.addEventListener('keydown', keyPress);
    }

    return () => {
      document.body.removeEventListener('keydown', keyPress);
    }
  }, [hideModal]);

  return createPortal(
    <div className={`modal-overlay ${showCustomModal ? "show" : ""}`}>
      <div className="modal">
        {children}
        <button onClick={() => hideModal()}>Close</button>
      </div>
    </div>,
    document.querySelector("#react-modals")
  );
};

export default CustomModal;
