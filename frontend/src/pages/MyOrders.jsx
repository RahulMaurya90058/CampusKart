import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useNavigate } from "react-router-dom";

function MyOrders() {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
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
          My Orders
        </h1>

        {loading && <LoadingSkeleton />}

        {!loading && orders.length === 0 && (
          <div className="text-center text-2xl text-gray-500">
            No Orders Found
          </div>
        )}

        {!loading &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-6">

                <img
                  src={order.product?.image}
                  alt={order.product?.title}
                  className="w-48 h-40 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold capitalize">
                    {order.product?.title}
                  </h2>

                  <p className="text-green-600 text-2xl font-bold mt-2">
                    ₹{order.amount}
                  </p>

                  <p className="mt-2">
                    <strong>Payment:</strong>{" "}
                    <span className="text-green-600">
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p className="mt-2">
  <strong>Order Status:</strong>{" "}
  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
    {order.orderStatus}
  </span>
</p>

                  <p>
                    <strong>Seller:</strong>{" "}
                    {order.seller?.name}
                  </p>

                  <p>
                    <strong>Ordered On:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>

                  <button
  onClick={() => navigate(`/product/${order.product._id}`)}
  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
>
  View Product
</button>

                </div>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;