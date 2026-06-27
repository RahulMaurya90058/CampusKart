import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "../components/ProductCard";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

function Buy() {
    
    const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [searchParams] = useSearchParams();

  const categories = [
    "All",
    "Electronics",
    "Books",
    "Furniture",
    "Cycle",
    "Mobile",
    "Laptop",
    "Notes",
  ];

  useEffect(() => {
  fetchProducts();
  fetchWishlist();
}, []);

useEffect(() => {
  console.log(searchParams.get("search"));

  const query = searchParams.get("search");

  if (query) {
    setSearch(query);
  }
}, [searchParams]);

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


  const fetchWishlist = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await API.get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWishlist(
      res.data.wishlist.map((item) => item.product._id)
    );

  } catch (error) {
    console.log(error);
  }
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
  category === "All" ||
  product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (wishlist.includes(productId)) {

      await API.delete(`/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(
        wishlist.filter((id) => id !== productId)
      );

    } else {

      await API.post(
        "/wishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist([...wishlist, productId]);

    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Buy Products
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-full py-4 pl-12 pr-5 shadow-md outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-blue-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && <LoadingSkeleton />}

        {/* No Products */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center text-2xl text-gray-500 mt-20">
            No Products Found
          </div>
        )}

        {/* Products */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
  key={product._id}
  product={product}
  wishlist={wishlist}
  handleWishlist={handleWishlist}
/>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Buy;