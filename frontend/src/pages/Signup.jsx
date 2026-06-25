import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post("/users/signup", formData);

      if (res.data.success) {
        localStorage.setItem("email", formData.email);
        toast.success("OTP sent successfully");
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending OTP..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;