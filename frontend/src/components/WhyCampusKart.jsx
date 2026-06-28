import {
  FaShieldAlt,
  FaHeart,
  FaTruck,
  FaBolt,
  FaUniversity,
  FaLock,
} from "react-icons/fa";

function WhyCampusKart() {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Secure Payments",
      desc: "Pay safely using Razorpay integration.",
    },
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: "Wishlist",
      desc: "Save your favourite products for later.",
    },
    {
      icon: <FaTruck className="text-4xl text-green-600" />,
      title: "Order Tracking",
      desc: "Track your order status from purchase to delivery.",
    },
    {
      icon: <FaBolt className="text-4xl text-yellow-500" />,
      title: "Fast Buying",
      desc: "Quick checkout and smooth buying experience.",
    },
    {
      icon: <FaUniversity className="text-4xl text-indigo-600" />,
      title: "Student Marketplace",
      desc: "Buy and sell only within the student community.",
    },
    {
      icon: <FaLock className="text-4xl text-purple-600" />,
      title: "Secure Login",
      desc: "JWT authentication and OTP verification.",
    },
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose CampusKart?
        </h2>

        <p className="text-center text-gray-600 mt-3 mb-12">
          Everything a student needs in one secure marketplace.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 duration-300"
            >
              <div className="mb-5">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyCampusKart;