import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FaUserCircle, FaHeart, FaChevronDown, FaSignOutAlt,
  FaHome, FaShoppingBag, FaTag, FaInfoCircle, FaQuestionCircle,
  FaBoxOpen, FaClipboardList, FaStore
} from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // बाहर क्लिक करने पर डेस्कटॉप ड्रॉपडाउन बंद करने के लिए
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    setDropdownOpen(false);
    navigate("/login");
  };

  // डेस्कटॉप लिंक्स के लिए स्टाइल क्लास
  const desktopNavClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"
    }`;

  // मोबाइल स्क्रॉल लिंक्स के लिए क्लीन कैप्सूल पिल स्टाइल क्लास
  const mobileNavClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
      isActive 
        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/10" 
        : "bg-white text-gray-700 border-gray-200 active:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      
      {/* ================= 1. मुख्य नैव बार (डेस्कटॉप व्यू और मोबाइल टॉप हेडर) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600">
            CampusKart
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={desktopNavClass}>Home</NavLink>
            <NavLink to="/buy" className={desktopNavClass}>Buy</NavLink>
            <NavLink to="/sell" className={desktopNavClass}>Sell</NavLink>
            <NavLink to="/about" className={desktopNavClass}>About</NavLink>
            <NavLink to="/help" className={desktopNavClass}>Help</NavLink>
            
            {/* Desktop Wishlist Icon */}
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 text-2xl"
                  : "text-gray-700 hover:text-red-500 text-2xl transition"
              }
            >
              <FaHeart />
            </NavLink>

            <NavLink
  to="/my-chats"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600"
  }
>
  💬 Chats
</NavLink>
          </div>

          {/* Desktop Right Side Content (User Profile Profile/Dropdown or Auth Buttons) */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Desktop User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition"
                >
                  <FaUserCircle className="text-2xl text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <FaChevronDown className="text-xs text-gray-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">
                    <NavLink to="/my-products" className="block px-5 py-3 hover:bg-gray-100 text-sm text-gray-700" onClick={() => setDropdownOpen(false)}>
                      My Products
                    </NavLink>
                    <NavLink to="/my-orders" className="block px-5 py-3 hover:bg-gray-100 text-sm text-gray-700" onClick={() => setDropdownOpen(false)}>
                      My Orders
                    </NavLink>
                    <NavLink to="/seller-orders" className="block px-5 py-3 hover:bg-gray-100 text-sm text-gray-700" onClick={() => setDropdownOpen(false)}>
                      Seller Orders
                    </NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 border-t border-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Auth Buttons (Hidden on Mobile Scroll) */
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="border border-blue-600 px-5 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= 2. मोबाइल हॉरिजॉन्टल स्क्रॉल बार (सिर्फ फ़ोन स्क्रीन्स पर दिखेगा) ================= */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center gap-2.5 overflow-x-auto scrollbar-none unique-mobile-scroll">
        
        {/* Core Links */}
        <NavLink to="/" className={mobileNavClass}>
          <FaHome className="text-sm" /> Home
        </NavLink>
        <NavLink to="/buy" className={mobileNavClass}>
          <FaShoppingBag className="text-sm" /> Buy
        </NavLink>
        <NavLink to="/sell" className={mobileNavClass}>
          <FaTag className="text-sm" /> Sell
        </NavLink>
        
        {/* Wishlist Link inside Scroll */}
        <NavLink 
          to="/wishlist" 
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
              isActive 
                ? "bg-red-500 text-white border-red-500 shadow-sm" 
                : "bg-white text-gray-700 border-gray-200 active:bg-gray-100"
            }`
          }
        >
          <FaHeart className="text-sm text-red-500 fill-current" /> Wishlist
        </NavLink>

    

        {/* Dashboard Links (अगर यूजर लॉग इन है तो स्क्रॉल बार में अपने आप जुड़ जाएंगे) */}
        {user ? (
          <>
            <NavLink to="/my-products" className={mobileNavClass}>
              <FaStore className="text-sm text-blue-500" /> My Products
            </NavLink>
            <NavLink to="/my-orders" className={mobileNavClass}>
              <FaClipboardList className="text-sm text-emerald-500" /> My Orders
            </NavLink>
            <NavLink to="/seller-orders" className={mobileNavClass}>
              <FaBoxOpen className="text-sm text-amber-500" /> Seller Orders
            </NavLink>
            
            {/* Mobile Logout Button embedded inside the scroll */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 bg-red-50 text-red-600 border border-red-200 active:bg-red-100"
            >
              <FaSignOutAlt className="text-sm" /> Logout
            </button>
          </>
        ) : (
          /* अगर यूजर लॉग-इन नहीं है तो मोबाइल स्क्रॉल में ही लॉगिन/साइनअप मिल जाएगा */
          <>
            <Link to="/login" className="flex items-center px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-white text-gray-700 border border-gray-200 active:bg-gray-100">
              Login
            </Link>
            <Link to="/signup" className="flex items-center px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-blue-600 text-white border border-blue-600 shadow-sm">
              Sign Up
            </Link>
          </>
        )}

        {/* Info & Support Links */}
        <NavLink to="/about" className={mobileNavClass}>
          <FaInfoCircle className="text-sm" /> About
        </NavLink>
        <NavLink to="/help" className={mobileNavClass}>
          <FaQuestionCircle className="text-sm" /> Help
        </NavLink>
        
      </div>
    </nav>
  );
}

export default Navbar;