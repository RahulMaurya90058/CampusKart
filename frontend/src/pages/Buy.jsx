import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Buy() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <><Navbar />
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Buy Products
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl p-5"
          >
            <img
              src={
                product.image ||
                "https://via.placeholder.com/300x200"
              }
              alt={product.title}
              className="w-full h-52 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {product.description}
            </p>

            <p className="text-xl text-green-600 font-bold mt-3">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Category: {product.category}
            </p>

            <p className="text-sm text-blue-600 mt-2">
              Seller: {product.seller?.name}
            </p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Buy;