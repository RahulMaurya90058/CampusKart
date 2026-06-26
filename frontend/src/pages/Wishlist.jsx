import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import WishlistCard from "../components/WishlistCard";
import API from "../api/api";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);

      fetchWishlist();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
          ❤️ My Wishlist
        </h1>

        {loading && <LoadingSkeleton />}

        {!loading && wishlist.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-600">
              Your Wishlist is Empty ❤️
            </h2>

            <p className="text-gray-500 mt-3">
              Explore products and save your favourites.
            </p>
          </div>
        )}

        {!loading && wishlist.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <WishlistCard
                key={item._id}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;