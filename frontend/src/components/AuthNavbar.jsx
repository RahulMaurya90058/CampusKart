import { Link } from "react-router-dom";

function AuthNavbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          CampusKart
        </Link>

        {/* Home Button */}
        <Link
          to="/"
          className="border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white duration-200"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}

export default AuthNavbar;