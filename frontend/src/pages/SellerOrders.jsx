import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { toast } from "react-toastify";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/orders/seller-orders", {
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

  const updateStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.put(
      `/orders/update-status/${orderId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message);

    fetchOrders();

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

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Seller Orders
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

                  <h2 className="text-2xl font-bold">
                    {order.product?.title}
                  </h2>

                  <p className="text-green-600 font-bold text-2xl mt-2">
                    ₹{order.amount}
                  </p>

                  <p className="mt-2">
                    <strong>Buyer:</strong> {order.user?.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.user?.email}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.paymentStatus}
                  </p>

                  <div className="mt-3 flex items-center gap-3">

  <strong>Status:</strong>

  <select
    value={order.orderStatus}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
    className="border rounded-lg px-3 py-2"
  >
    <option value="Placed">Placed</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>

</div>

                </div>

              </div>

            </div>
          ))}

      </div>

      <Footer />
    </>
  );
}

export default SellerOrders;