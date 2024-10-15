import * as React from "react";

const AuthContext = React.createContext({
  user: { username: "jakiechan", tagline: "", bio: "" },
});
AuthContext.displayName = "AuthContext";

// const AuthProvider = ({ user, ...props }) => (
//   <AuthContext.Provider value={user} {...props} />
// );

function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth };
