import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const email = localStorage.getItem("email");

      const res = await API.post("/users/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        toast.success("Account verified successfully");
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <><AuthNavbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-5"
        >
          Verify OTP
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default OtpVerification;