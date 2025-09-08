import { Link } from "react-router-dom";
import SignupForm from "../auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Create Account
        </h1>
        <SignupForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
