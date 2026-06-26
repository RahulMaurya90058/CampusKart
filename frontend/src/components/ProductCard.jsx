import { useNavigate } from "react-router-dom";
import { FiUser, FiArrowRight, FiHeart } from "react-icons/fi";

function ProductCard({ 
    product,
  wishlist = [],
  handleWishlist,
  showWishlist = true, 
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Category */}
       <div className="flex justify-between items-center mt-3">
  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
    {product.category}
  </span>

  {showWishlist && (
  <button
    onClick={() => handleWishlist(product._id)}
    className={`text-2xl transition ${
      wishlist.includes(product._id)
        ? "text-red-500"
        : "text-gray-400 hover:text-red-500"
    }`}
  >
    <FiHeart
      fill={
        wishlist.includes(product._id)
          ? "currentColor"
          : "none"
      }
    />
  </button>
)}
</div>

        {/* Title */}
        <h2 className="text-2xl font-bold mt-3 capitalize">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-3xl font-bold text-green-600 mt-4">
          ₹{product.price}
        </p>

        {/* Seller */}
        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <FiUser />
          <span>{product.seller?.name || "Unknown Seller"}</span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 transition"
        >
          View Details
          <FiArrowRight />
        </button>

      </div>
    </div>
  );
}

export default ProductCard;