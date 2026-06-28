import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaHome,
  FaShoppingCart,
  FaStore,
  FaHeart,
  FaBoxOpen,
  FaTruck,
  FaCreditCard,
  FaUserShield,
} from "react-icons/fa";

function Help() {
  const [open, setOpen] = useState(null);

  const helpData = [
    {
      icon: <FaHome className="text-blue-600 text-2xl" />,
      title: "Home",
      content:
        "The Home page displays featured products, categories, latest products and important information about CampusKart.",
    },
    {
      icon: <FaShoppingCart className="text-green-600 text-2xl" />,
      title: "Buy Products",
      content:
        "Browse products, search by name, filter by category, add items to wishlist and purchase securely.",
    },
    {
      icon: <FaStore className="text-purple-600 text-2xl" />,
      title: "Sell Products",
      content:
        "Upload your product with images, price, description and category so other students can buy it.",
    },
    {
      icon: <FaHeart className="text-red-500 text-2xl" />,
      title: "Wishlist",
      content:
        "Save products you like so you can easily find them later.",
    },
    {
      icon: <FaBoxOpen className="text-orange-500 text-2xl" />,
      title: "My Orders",
      content:
        "View all products you have purchased along with payment and order status.",
    },
    {
      icon: <FaTruck className="text-cyan-600 text-2xl" />,
      title: "Seller Orders",
      content:
        "Manage orders received for your products and update their status.",
    },
    {
      icon: <FaCreditCard className="text-yellow-500 text-2xl" />,
      title: "Payments",
      content:
        "CampusKart uses Razorpay for secure online payments with payment verification.",
    },
    {
      icon: <FaUserShield className="text-indigo-600 text-2xl" />,
      title: "Authentication",
      content:
        "Users can securely register, login, verify OTP and access protected pages using JWT authentication.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-16">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center text-blue-600">
            Help Center
          </h1>

          <p className="text-center text-gray-600 mt-4 mb-12">
            Learn how to use every feature of CampusKart.
          </p>

          <div className="space-y-5">

            {helpData.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpen(open === index ? null : index)
                  }
                  className="w-full flex justify-between items-center p-6"
                >

                  <div className="flex items-center gap-4">

                    {item.icon}

                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                  </div>

                  <span className="text-2xl">
                    {open === index ? "-" : "+"}
                  </span>

                </button>

                {open === index && (

                  <div className="px-6 pb-6 text-gray-600 leading-7">

                    {item.content}

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Help;