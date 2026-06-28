import {
  FaTag,
  FaRupeeSign,
  FaCheckCircle,
  FaUser,
  FaClock,
} from "react-icons/fa";

function ProductPreview({ data }) {
  return (
    <div className="sticky top-28">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Heading */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">

          <h2 className="text-2xl font-bold text-white">
            Live Preview
          </h2>

        </div>

        {/* Image */}

        {data.image ? (
          <img
            src={data.image}
            alt="Preview"
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="h-72 flex items-center justify-center bg-gray-100 text-gray-500 text-lg">
            📷 No Image Selected
          </div>
        )}

        {/* Details */}

        <div className="p-6">

          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

            <FaCheckCircle />

            Ready to Sell

          </span>

          <h2 className="text-3xl font-bold mt-5">

            {data.title || "Product Title"}

          </h2>

          <div className="flex items-center gap-2 text-green-600 text-3xl font-bold mt-5">

            <FaRupeeSign />

            {data.price || "0"}

          </div>

          <div className="mt-5">

            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

              <FaTag />

              {data.category || "Category"}

            </span>

          </div>

          <p className="text-gray-600 leading-7 mt-6">

            {data.description ||
              "Your product description will appear here."}

          </p>

          <hr className="my-6" />

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <FaUser className="text-blue-600" />

              <span>
                Seller :
                <strong className="ml-2">
                  Rahul Maurya
                </strong>
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaClock className="text-orange-500" />

              <span>
                Posted :
                <strong className="ml-2">
                  Just Now
                </strong>
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductPreview;