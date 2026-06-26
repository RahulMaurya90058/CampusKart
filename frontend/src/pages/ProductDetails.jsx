import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FiShoppingCart, FiMessageCircle } from "react-icons/fi";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/${id}`);

      setProduct(res.data.product);
      fetchRelatedProducts(
  res.data.product.category,
  res.data.product._id
);
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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="grid md:grid-cols-2 gap-10 p-8">

              {/* Product Image */}
              <div>
               <img
  src={
    product.image ||
    "https://via.placeholder.com/600x600?text=No+Image"
  }
  alt={product.title}
  className="w-full h-[450px] object-cover rounded-xl transition duration-500 hover:scale-105"
/>
              </div>

              {/* Product Details */}
              <div>

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>

               <h1 className="text-4xl font-bold mt-4 capitalize">
  {product.title}
</h1>

                <p className="text-4xl text-green-600 font-bold mt-6">
                  ₹{product.price}
                </p>

                <div className="mt-4">
  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
    ✅ Available
  </span>
</div>

<p className="text-gray-500 mt-4">
  📅 Posted on{" "}
  {new Date(product.createdAt).toLocaleDateString("en-IN")}
</p>


<div className="bg-gray-100 rounded-xl p-5 mt-6 shadow-sm">

  <h3 className="text-xl font-semibold mb-4">
    Seller Information
  </h3>

  <div className="flex items-center gap-3 mb-3">
    <FiUser className="text-xl text-blue-600" />
    <span className="font-medium">
      {product.seller?.name || "Unknown Seller"}
    </span>
  </div>

  <p className="text-gray-600">
    📧 {product.seller?.email || "Not Available"}
  </p>

</div>


                <div className="bg-gray-50 rounded-xl p-5 mt-6">
  <h2 className="text-2xl font-semibold mb-3">
    Description
  </h2>

  <p className="text-gray-600 leading-7">
    {product.description}
  </p>
</div>

                <div className="flex gap-4 mt-10">

  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition">
    <FiShoppingCart />
    Buy Now
  </button>

  <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-xl flex justify-center items-center gap-2 transition">
    <FiMessageCircle />
    Chat Seller
  </button>

</div>

              </div>

            </div>

          </div>
        )}

      </div>

      <div className="max-w-6xl mx-auto mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Related Products
  </h2>

  <div className="grid md:grid-cols-4 gap-6">
    {relatedProducts.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
      >
        <img
          src={
            item.image ||
            "https://via.placeholder.com/300x200"
          }
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg"
        />

        <h3 className="text-lg font-semibold mt-3 capitalize">
          {item.title}
        </h3>

        <p className="text-green-600 font-bold mt-2">
          ₹{item.price}
        </p>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </>
  );
}

export default ProductDetails;