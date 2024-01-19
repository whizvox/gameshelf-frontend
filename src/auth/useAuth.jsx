import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function useLocalStorage(key, defaultValue) {
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log("Could not set local storage value for " + key);
    }
    setStoredValue(newValue);
  };
  return [ storedValue, setValue ];
}

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const value = useMemo(() => ({
    user,
    login() {
      return fetch("/api/user/self")
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            setUser(res.data);
          } else {
            setUser(null);
            navigate("/login");
          }
        });
    },
    logout() {
      return fetch("/api/logout")
        .then(() => {
          navigate("/", { replace: true })
        });
    }
  }), [ user ]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
