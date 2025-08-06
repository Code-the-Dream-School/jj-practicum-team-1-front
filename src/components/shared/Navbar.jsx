import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">PlantApp</Link>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="text-white hover:text-green-200 transition duration-200"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="text-white hover:text-green-200 transition duration-200"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}