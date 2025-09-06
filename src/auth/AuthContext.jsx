import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import api, {
  setToken as setApiToken,
  getStoredToken,
  clearToken as clearApiToken,
} from "../lib/apiClient.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = getStoredToken();
    if (saved) {
      setApiToken(saved);
      setToken(saved);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      const data = await api.post("/auth/login", { email, password });

      if (!data?.token) {
        throw new Error("Login did not return a token");
      }

      setApiToken(data.token);
      setToken(data.token);

      if (data.user) {
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    try {
      const data = await api.post("/auth/register", { name, email, password });

      if (!data?.token) {
        throw new Error("Signup did not return a token");
      }

      setApiToken(data.token);
      setToken(data.token);

      if (data.user) {
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearApiToken();
    setToken(null);
    setUser(null);
    navigate("/");
  }, [navigate]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      login,
      signup,
      logout,
    }),
    [token, user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
