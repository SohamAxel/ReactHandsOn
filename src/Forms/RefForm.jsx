import React, { useRef, useState } from 'react'
import { validateEmail, validatePassword } from '../Validator/formValidator';

const RefForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailErrorList, setEmailErrorList] = useState([]);
  const [passwordErrorList, setPasswordErrorList] = useState([]);
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAfterFirstSubmit(true);

    const checkEmail = validateEmail(emailRef.current.value);
    const checkPassword = validatePassword(passwordRef.current.value);
    setEmailErrorList(checkEmail);
    setPasswordErrorList(checkPassword);
    if (checkEmail.length === 0 && checkPassword.length === 0) {
      alert("success");
    }

  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className={`form-group ${emailErrorList.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          ref={emailRef}
          defaultValue=""
          onChange={(e) => {
            if (isAfterFirstSubmit) {
              setEmailErrorList(validateEmail(emailRef.current.value))
            };
          }}
        />
        {
          emailErrorList.length > 0 && <div className="msg">{emailErrorList.join(', ')}</div>
        }
      </div>
      <div className={`form-group ${passwordErrorList.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          ref={passwordRef}
          defaultValue=""
          onChange={(e) => {
            if (isAfterFirstSubmit) {
              setPasswordErrorList(validatePassword(passwordRef.current.value))
            };
          }}
        />
        {
          passwordErrorList.length > 0 && <div className="msg">{passwordErrorList.join(', ')}</div>
        }
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default RefForm