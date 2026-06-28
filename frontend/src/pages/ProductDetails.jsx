import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMessageCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
      fetchRelatedProducts(res.data.product.category, res.data.product._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Product not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category, id) => {
    try {
      const res = await API.get(`/products/related/${category}/${id}`);
      setRelatedProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
      setAverageRating(res.data.averageRating);
      setTotalReviews(res.data.totalReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      return toast.error("Please add both a rating and a comment");
    }
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/reviews/add",
        { productId: id, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review Added");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 py-10 flex-grow">
        {loading ? (
          <LoadingSkeleton />
        ) : !product ? (
          <div className="text-center py-20 text-gray-500 text-xl">Product details could not be loaded.</div>
        ) : (
          <div className="space-y-12">
            {/* Main Product Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid md:grid-cols-2 gap-12 p-6 md:p-10">
              
              {/* Left Side: Product Image */}
              <div className="flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-4 h-[400px] md:h-[500px]">
                <img
                  src={product.image || "https://via.placeholder.com/600x600?text=No+Image"}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain rounded-xl mix-blend-multiply transition duration-500 hover:scale-105"
                />
              </div>

              {/* Right Side: Product Core Info */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>

                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 capitalize tracking-tight leading-tight">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-4 mt-4">
                    <p className="text-4xl font-black text-gray-900">₹{product.price}</p>
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 border border-emerald-200">
                      ● Available
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mt-2">
                    Posted on {new Date(product.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>

                  <div className="mt-6 border-t border-b border-gray-100 py-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Description</h2>
                    <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                  </div>
                </div>

                {/* Seller Info Card */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Seller Information</h3>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                      <FiUser className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.seller?.name || "Unknown Seller"}</p>
                      <p className="text-xs text-gray-500">{product.seller?.email || "Not Available"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={() => navigate(`/checkout/${product._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <FiShoppingCart className="text-lg" />
                    Buy Now
                  </button>

                  <button className="flex-1 border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all">
                    <FiMessageCircle className="text-lg" />
                    Chat with Seller
                  </button>
                </div>
              </div>
            </div>

            {/* Review Section (Full Width Breakdown) */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
              
              {/* Review Input and Summary Column */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 md:col-span-1 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Ratings & Reviews</h2>
                
                <div className="flex items-center gap-4 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  <span className="text-5xl font-black text-amber-500">{Number(averageRating).toFixed(1)}</span>
                  <div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className={star <= Math.round(averageRating) ? "fill-current" : "text-gray-200"} />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1">{totalReviews} Global Ratings</p>
                  </div>
                </div>

                {/* Add Review Form */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setRating(star)}>
                        <FaStar className={`text-2xl transition-transform active:scale-125 ${star <= rating ? "text-amber-400" : "text-gray-200"}`} />
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows="3"
                    placeholder="Share your thoughts about this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"
                  />

                  <button
                    onClick={submitReview}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* User Reviews List Column */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 px-1">User Feedback ({reviews.length})</h3>
                {reviews.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm border border-gray-100">
                    No reviews yet. Be the first to review this product!
                  </div>
                ) : (
                  <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {reviews.map((review) => (
                      <div key={review._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-gray-800 text-sm">{review.user?.name || "Anonymous"}</h4>
                          <div className="flex text-xs text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar key={star} className={star <= review.rating ? "fill-current" : "text-gray-200"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="bg-gray-50 rounded-xl overflow-hidden h-36 flex items-center justify-center p-2 mb-3">
                          <img
                            src={item.image || "https://via.placeholder.com/300x200"}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 capitalize line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-base font-black text-gray-900 mt-2">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;