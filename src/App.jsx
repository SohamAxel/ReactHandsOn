import { useRef, useState } from "react";
import { allowedPositions, useToastContext } from "./ToastContext";
import "./styles.css";

export default function App() {
  const { addToast, removeToast } = useToastContext();
  const inputRef = useRef(null);
  const [id, setId] = useState();

  function createToast(timeout) {
    if (inputRef.current == null || inputRef.current.value === "") return;
    const randomPosition =
      allowedPositions[Math.floor(Math.random() * allowedPositions.length)];
    setId(
      addToast(inputRef.current.value, {
        options: {
          position: randomPosition,
          autoDismiss: timeout ? true : false,
          autoDismissTimeout: timeout ? timeout : 0,
        },
      })
    );
  }

  return (
    <div className="form">
      <input type="text" ref={inputRef} />
      <button onClick={createToast}>Add Toast</button>
      <button onClick={() => createToast(3000)}>
        Add Toast with 3s timeout
      </button>
      <button onClick={() => id != null && removeToast(id)}>
        Remove Last Toast
      </button>
    </div>
  );
}
