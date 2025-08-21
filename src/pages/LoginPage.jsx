import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-semibold">Sign in</h1>
        <LoginForm />
      </section>
    </main>
  );
}
