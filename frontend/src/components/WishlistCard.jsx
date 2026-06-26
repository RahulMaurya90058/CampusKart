import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function WishlistCard({ item, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <img
        src={
          item.product.image ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={item.product.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        {/* Category */}
        <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
          {item.product.category}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold mt-3 capitalize">
          {item.product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2 line-clamp-2">
          {item.product.description}
        </p>

        {/* Price */}
        <p className="text-3xl font-bold text-green-600 mt-4">
          ₹{item.product.price}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => navigate(`/product/${item.product._id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
          >
            View
            <FiArrowRight />
          </button>

          <button
            onClick={() => onRemove(item.product._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg flex justify-center items-center"
          >
            <FiTrash2 />
          </button>

        </div>

      </div>
    </div>
  );
}

export default WishlistCard;