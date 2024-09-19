import { useMemo, useState } from "react";
import "./styles.css";
import { validateEmail, validatePassword } from "./Validator/formValidator";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  const emailErrorList = useMemo(() => {
    return isAfterFirstSubmit ? validateEmail(email) : [];
  }, [email, isAfterFirstSubmit]);

  const passwordErrorList = useMemo(() => {
    return isAfterFirstSubmit ? validatePassword(password) : [];
  }, [password, isAfterFirstSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAfterFirstSubmit(true);

    const checkEmail = validateEmail(email);
    const checkPassword = validatePassword(password);

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
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

export default App;
