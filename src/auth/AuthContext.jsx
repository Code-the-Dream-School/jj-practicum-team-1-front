// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import api, {
//   setToken as setApiToken,
//   getStoredToken,
//   clearToken as clearApiToken,
// } from "../lib/apiClient.jsx";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   // shows if we’re still checking localStorage on page load
//   const [loading, setLoading] = useState(true);

//   // On app start, try to restore a saved token so the user stays logged in after refresh
//   useEffect(() => {
//     const saved = getStoredToken();
//     if (saved) {
//       setApiToken(saved); // tell api client to use this token
//       setToken(saved); // store it in React state
//     }
//     setLoading(false); // done checking localStorage
//   }, []);

//   // Call this from the Login page later
//   const login = useCallback(async ({ email, password }) => {
//     const data = await api.post("/auth/login", { email, password });
//     if (!data?.token) throw new Error("Login did not return a token");
//     setApiToken(data.token); // keep token in localStorage + api client
//     setToken(data.token);
//     if (data.user) setUser(data.user);
//     return data;
//   }, []);

//   // Simple logout: forget token and user
//   const logout = useCallback(() => {
//     clearApiToken(); // removes token from localStorage + api client
//     setToken(null);
//     setUser(null);
//   }, []);

//   const value = useMemo(
//     () => ({
//       token,
//       user,
//       loading,
//       isAuthenticated: !!token,
//       login,
//       logout,
//     }),
//     [token, user, loading, login, logout]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api, {
  setToken as setApiToken,
  getStoredToken,
  clearToken as clearApiToken,
} from "../lib/apiClient.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  // shows if we’re still checking localStorage on page load
  const [loading, setLoading] = useState(true);

  // On app start, try to restore a saved token so the user stays logged in after refresh
  useEffect(() => {
    const saved = getStoredToken();
    if (saved) {
      setApiToken(saved); // tell api client to use this token
      setToken(saved); // store it in React state
    }
    setLoading(false); // done checking localStorage
  }, []);

  // Login function calls backend with email/password
  // → returns { user: { name, userId }, token }
  // This is my best try, still learning :)
  const login = useCallback(async ({ email, password }) => {
    try {
      // notice the full path /api/v1/auth/login
      const data = await api.post("/api/v1/auth/login", { email, password });

      if (!data?.token) {
        throw new Error("Login did not return a token");
      }

      // store token so requests after this include it
      setApiToken(data.token);
      setToken(data.token);

      if (data.user) {
        setUser(data.user);
        // saving user in localStorage just to persist after refresh
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return true; // success
    } catch (err) {
      console.error("Login error:", err); // for now I just log it
      return false; // later we could show a nicer error message
    }
  }, []);

  // Simple logout: forget token and user
  const logout = useCallback(() => {
    clearApiToken(); // removes token from localStorage + api client
    setToken(null);
    setUser(null);
  }, []);

  // everything we want to use in the rest of the app
  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
