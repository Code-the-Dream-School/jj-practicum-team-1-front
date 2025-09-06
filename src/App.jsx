import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PlantsPage from "./pages/PlantsPage";
import PlantDetailPage from "./pages/PlantDetailPage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route path="/explore" element={<PlantsPage />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}