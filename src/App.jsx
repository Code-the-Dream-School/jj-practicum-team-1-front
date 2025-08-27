import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; // TEMP: use as Explore placeholder for now

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* TEMP: point /explore to HomePage until you build ExplorePage */}
        <Route path="/explore" element={<HomePage />} />
        {/* defaults */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
