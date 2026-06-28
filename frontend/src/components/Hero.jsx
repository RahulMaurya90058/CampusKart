import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../api/api";

function Hero() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
  products: 0,
  users: 0,
  orders: 0,
  paidOrders: 0,
});


useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const res = await API.get("/dashboard/stats");

    setStats(res.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white min-h-[90vh] flex items-center">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6 py-16">

        {/* Left */}

        <div>

          <span className="inline-flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold shadow-lg">
  🚀 India's Trusted Student Marketplace
</span>

          <h1 className="text-5xl lg:text-7xl font-bold mt-6 leading-tight">

            Buy, Sell & Exchange

            <span className="block text-yellow-300">

              with CampusKart

            </span>

          </h1>

          <p className="mt-8 text-lg text-blue-100 leading-8 max-w-xl">

            Buy books, laptops, mobiles, cycles and many more products
            from students. Sell your unused items quickly and securely.

          </p>

          {/* Search */}

          <div className="mt-8 flex bg-white rounded-xl overflow-hidden shadow-lg">

            <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="flex-1 px-5 py-4 text-gray-700 outline-none"
/>

        <button
  onClick={() => {
    if (!search.trim()) {
      navigate("/buy");
      return;
    }

    navigate(`/buy?search=${encodeURIComponent(search)}`);
  }}
  className="bg-yellow-400 px-6 text-black font-semibold hover:bg-yellow-300"
>
  Search
</button>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-8">

            <button
              onClick={() => navigate("/buy")}
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 duration-300"
            >
              <FaShoppingBag />

              Browse Products

            </button>

            <button
              onClick={() => {
                if (user) {
                  navigate("/sell");
                } else {
                  navigate("/login");
                }
              }}
              className="border-2 border-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-white hover:text-blue-700 duration-300"
            >
              Start Selling

              <FaArrowRight />

            </button>

          </div>

          {/* Stats */}

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 duration-300">
  <h2 className="text-3xl font-bold">{stats.products}</h2>
  <p className="text-blue-100">Products</p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 duration-300">
  <h2 className="text-3xl font-bold">{stats.users}</h2>
  <p className="text-blue-100">Students</p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 duration-300">
  <h2 className="text-3xl font-bold">{stats.orders}</h2>
  <p className="text-blue-100">Orders</p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 duration-300">
  <h2 className="text-3xl font-bold">{stats.paidOrders}</h2>
  <p className="text-blue-100">Payments</p>
</div>

        </div>

        {/* Right */}
<div className="hidden lg:flex justify-center relative">

  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
    alt="CampusKart"
    className="rounded-3xl shadow-2xl w-full max-w-lg"
  />

  {/* Floating Card 1 */}

  <div className="absolute top-6 -left-8 bg-white text-black p-4 rounded-2xl shadow-xl">
    <h3 className="font-bold">💻 Laptop</h3>
    <p className="text-green-600 font-semibold">₹30,000</p>
  </div>

  {/* Floating Card 2 */}

  <div className="absolute bottom-10 -right-8 bg-white text-black p-4 rounded-2xl shadow-xl">
    <h3 className="font-bold">📚 Books</h3>
    <p className="text-green-600 font-semibold">₹499</p>
  </div>

</div>

      </div>

    </section>
  );
}

export default Hero;