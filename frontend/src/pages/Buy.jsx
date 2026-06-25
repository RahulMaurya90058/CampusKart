import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";

function Buy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Buy Products
        </h1>

        <div className="flex justify-center mb-8">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-lg border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
  />
</div>

        {/* Loading */}
        {/* {loading && (
          <div className="flex justify-center items-center h-60">
            <p className="text-2xl font-semibold text-blue-600 animate-pulse">
              Loading Products...
            </p>
          </div>
        )} */}

        {loading && <LoadingSkeleton />}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="text-center text-2xl text-gray-500 mt-20">
            No Products Found
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl duration-300"
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
        )}
      </div>

      <Footer />
    </>
  );
}

export default Buy;