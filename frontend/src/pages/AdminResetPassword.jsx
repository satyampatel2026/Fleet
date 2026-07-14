import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

export default function AdminResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.password !== formData.confirmPassword
    ) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/admin/reset-password/${token}`,
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    }catch (error) {
  console.error(
    "Reset password error:",
    error.response?.data || error.message
  );

  setMessage(
    error.response?.data?.message ||
      error.message ||
      "Password reset failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Reset Password
        </h1>

        {message && (
          <div className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password"
            required
            minLength={6}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
            minLength={6}
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/admin/login"
            className="text-sm text-blue-600"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}