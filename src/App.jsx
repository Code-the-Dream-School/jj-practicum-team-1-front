import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; // TEMP: Explore placeholder
import PrivateRoute from "./routes/PrivateRoute"; // adjust if PrivateRoute.jsx is not in /routes

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          {/* For now, /explore still uses HomePage as a placeholder */}
          <Route path="/explore" element={<HomePage />} />
        </Route>

        {/* Defaults */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
