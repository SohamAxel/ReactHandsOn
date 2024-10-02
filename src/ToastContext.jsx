import { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

const ToastContext = createContext();

export const allowedPositions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const DEFAULTOPTIONS = {
  autoDismiss: false,
  autoDismissTimeout: 0,
  position: allowedPositions[0],
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (body, { options }) => {
    const id = crypto.randomUUID();
    setToasts((oldToasts) => [
      ...oldToasts,
      {
        id,
        body,
        ...DEFAULTOPTIONS,
        ...options,
      },
    ]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((oldToasts) => oldToasts.filter((val) => val.id !== id));
  };

  const filteredToasts = toasts.reduce((result, toast) => {
    if (result[toast.position] == null) {
      result[toast.position] = [];
    }
    result[toast.position].push(toast);
    return result;
  }, {});

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastPortal filteredToasts={filteredToasts} removeToast={removeToast}/>
    </ToastContext.Provider>
  );
};

const ToastPortal = ({ filteredToasts, removeToast }) => {
  return createPortal(
    Object.keys(filteredToasts).map((value) => {
      const position = value;
      return (
        <div className={`toast-container ${position}`} key={position}>
          {filteredToasts[value].map((toast) => {
            console.log(toast);
            return (
              <Toast key={toast.id} {...toast} removeToast={removeToast}/>
            );
          })}
        </div>
      );
    }),
    document.querySelector("#toast")
  );
};

const useToastContext = () => {
  const data = useContext(ToastContext);
  return data;
};

export { ToastProvider, useToastContext };
