import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setResetLink("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/forgotpassword",
        { email }
      );

      setMessage(response.data.message);

      if (response.data.resetLink) {
        setResetLink(response.data.resetLink);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Forgot password request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your admin email address
        </p>

        {message && (
          <div className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        {resetLink && (
          <div className="mt-3 break-all rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
            Development reset link:
            <br />
            <a
              href={resetLink}
              className="font-medium underline"
            >
              {resetLink}
            </a>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              placeholder="Admin Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/admin/login"
            className="text-sm font-medium text-blue-600"
          >
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}