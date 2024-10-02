import React, { useEffect } from 'react'

const Toast = ({ id, body, autoDismiss, autoDismissTimeout, removeToast}) => {
  useEffect(() => {
    if (autoDismiss) {
      setTimeout(() => {
        removeToast(id);  
      }, autoDismissTimeout);
    }
  }, [])
  

  return (
    <div className="toast" onClick={() => removeToast(id)}>
      {body}
    </div>
  )
}

export default Toast