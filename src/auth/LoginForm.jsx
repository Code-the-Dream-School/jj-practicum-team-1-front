import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginForm() {
  const { login } = useAuth(); // we use the login function from context
  const navigate = useNavigate();
  

  // local state just for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // also track error & loading here for now
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // reset old errors
    setLoading(true);

    // call login() from AuthContext
    const success = await login({ email, password });
    if (success) {
      // if login worked → go to explore page
      navigate("/explore");
    } else {
      // if login failed → just show a message
      setError("Invalid email or password");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
