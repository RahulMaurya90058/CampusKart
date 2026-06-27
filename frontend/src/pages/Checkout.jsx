import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import API from "../api/api";
import { toast } from "react-toastify";

function Checkout() {

    const { id } = useParams();

const [product, setProduct] = useState(null);

const [address, setAddress] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
});

const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProduct();
}, [id]);

const fetchProduct = async () => {
  try {
    setLoading(true);

    const res = await API.get(`/products/${id}`);

    setProduct(res.data.product);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleChange = (e) => {
  setAddress({
    ...address,
    [e.target.name]: e.target.value,
  });
};

const handlePayment = async () => {
  if (
    !address.fullName ||
    !address.phone ||
    !address.address ||
    !address.city ||
    !address.state ||
    !address.pincode
  ) {
    return toast.error("Please fill all delivery details");
  }

  try {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/orders/create",
    {
      productId: product._id,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success(res.data.message);

} catch (error) {
  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
}
  // Order API call yahin hoga
};

  return (
    <>
  <Navbar />

  <div className="min-h-screen bg-gray-100 p-8">

    {loading ? (
      <LoadingSkeleton />
    ) : (
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Product */}

          <div>

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-xl"
            />

          </div>

          {/* Details */}

          <div>

            <h2 className="text-3xl font-bold capitalize">
              {product.title}
            </h2>

            <p className="text-gray-500 mt-4">
              {product.description}
            </p>

            <p className="text-blue-600 mt-4 font-semibold">
              {product.category}
            </p>

            <p className="text-4xl text-green-600 font-bold mt-6">
              ₹{product.price}
            </p>

          </div>

          <div className="mt-10 border-t pt-8">

  <h2 className="text-2xl font-bold mb-6">
    Delivery Details
  </h2>

  <div className="grid gap-4">

    <input
      type="text"
      name="fullName"
      placeholder="Full Name"
      value={address.fullName}
      onChange={handleChange}
      className="border rounded-lg px-4 py-3"
    />

    <input
      type="text"
      name="phone"
      placeholder="Phone Number"
      value={address.phone}
      onChange={handleChange}
      className="border rounded-lg px-4 py-3"
    />

    <textarea
      name="address"
      placeholder="Address"
      value={address.address}
      onChange={handleChange}
      className="border rounded-lg px-4 py-3"
    />

    <div className="grid grid-cols-2 gap-4">

      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3"
      />

    </div>

    <input
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={address.pincode}
      onChange={handleChange}
      className="border rounded-lg px-4 py-3"
    />

  </div>

</div>

<div className="mt-10 bg-gray-100 rounded-xl p-6">

  <h2 className="text-2xl font-bold mb-5">
    Order Summary
  </h2>

  <div className="flex justify-between mb-3">
    <span>Product Price</span>
    <span>₹{product.price}</span>
  </div>

  <div className="flex justify-between mb-3">
    <span>Delivery Charge</span>
    <span className="text-green-600">Free</span>
  </div>

  <hr className="my-4" />

  <div className="flex justify-between text-2xl font-bold">
    <span>Total</span>
    <span>₹{product.price}</span>
  </div>

  <button
  onClick={handlePayment}
  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl"
>
  Proceed to Payment
</button>

</div>

        </div>

      </div>
    )}

  </div>

  <Footer />
</>
  );
}

export default Checkout;