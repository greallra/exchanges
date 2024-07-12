// src/hooks/useAuth.jsx
//https://blog.logrocket.com/authentication-react-router-v6/
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import useLanguages from '@/hooks/useLanguages';
import { formatUserData } from '@/utils'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const { languages } = useLanguages();
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    const formattedData = formatUserData(data, languages)
    setUser(formattedData);
    navigate("/exchanges");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser('');
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};