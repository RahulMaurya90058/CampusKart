import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successful");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          CampusKart
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/buy" className="hover:text-blue-600">
            Buy
          </Link>

          <Link to="/sell" className="hover:text-blue-600">
            Sell
          </Link>

          <Link
  to="/wishlist"
  className="hover:text-red-500"
>
  ❤️ Wishlist
</Link>



          <Link
  to="/my-products"
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  My Products
</Link>

<Link
  to="/my-orders"
  className="hover:text-blue-600"
>
  My Orders
</Link>

<Link
  to="/seller-orders"
  className="hover:text-blue-600"
>
  Seller Orders
</Link>

          {user ? (
            <>
              <span className="text-blue-600 font-semibold">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white duration-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;