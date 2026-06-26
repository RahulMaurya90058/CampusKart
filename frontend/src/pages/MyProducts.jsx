import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function MyProducts() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/products/my-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const res = await API.delete(`/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.message);

    // Refresh products
    fetchMyProducts();

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          My Products
        </h1>

        {loading && <LoadingSkeleton />}

        {!loading && products.length === 0 && (
          <div className="text-center text-2xl text-gray-500">
            You haven't added any products yet.
          </div>
        )}

        {!loading && products.length > 0 && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {products.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
      >
        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-5">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h2 className="text-2xl font-bold mt-3 capitalize">
            {product.title}
          </h2>

          <p className="text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          <div className="flex gap-3 mt-6">
            <button
  onClick={() => navigate(`/edit-product/${product._id}`)}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg"
>
  ✏️ Edit
</button>

            <button
              onClick={() => handleDelete(product._id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
      </div>

      <Footer />
    </>
  );
}

export default MyProducts;