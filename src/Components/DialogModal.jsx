import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DialogModal = () => {
  const [showDialogModal, setShowDialogModal] = useState(false);

  const hideModal = () => {
    setShowDialogModal(false);
  };
  const toggleModal = () => {
    setShowDialogModal((p) => !p);
  };

  return (
    <>
      <button onClick={() => toggleModal()}>DialogModal</button>
      <DialogModalPortal hideModal={hideModal} showDialogModal={showDialogModal}>
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
      </DialogModalPortal>
    </>
  );
};

const DialogModalPortal = ({ hideModal, showDialogModal, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (showDialogModal == false) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }, [showDialogModal])

  useEffect(() => {
    if (showDialogModal == true) {
      dialogRef.current.addEventListener('close', hideModal);
    }

    return () => {
      document.body.removeEventListener('close', hideModal);
    }
  }, [hideModal]);

  return createPortal(
    <dialog ref={dialogRef}>
      {children}
      <button onClick={() => hideModal()}>Close</button>
    </dialog>,
    document.querySelector("#react-modals")
  );
};

export default DialogModal;
