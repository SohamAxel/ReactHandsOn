import { createContext, useContext, useEffect, useState } from "react";
import {
  getLoggedInUser,
  signup as signupService,
  login as loginService,
} from "../services/authentication";
import { useLocation, useNavigate } from "react-router-dom";

export const Context = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoadingUser(true);
    getLoggedInUser()
      .then(setUser)
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

  function signup(email: string, password: string) {
    return signupService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }

  function login(email: string, password: string) {
    return loginService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }

  return (
    <Context.Provider
      value={{
        user,
        isLoadingUser,
        signup,
        login,
        isLoggedIn: user != null,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const useAuth = () => {
  const auth = useContext(Context)
  return auth;
}

export { useAuth };
