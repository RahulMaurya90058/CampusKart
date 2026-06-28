import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FaUserCircle, FaHeart, FaChevronDown, FaSignOutAlt,
  FaHome, FaShoppingBag, FaTag, FaInfoCircle, FaQuestionCircle,
  FaBoxOpen, FaClipboardList, FaStore, FaComments, FaUser
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

  // डेस्कटॉप लिंक्स के लिए प्रीमियम स्टाइल क्लास (Text thoda bada kiya hai)
  const desktopNavClass = ({ isActive }) =>
    `text-base font-semibold transition-all duration-200 ${
      isActive 
        ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
        : "text-gray-600 hover:text-blue-600"
    }`;

  // मोबाइल स्क्रॉल लिंक्स के लिए क्लीन कैप्सूल पिल स्टाइल क्लास (Text chhota se normal kiya)
  const mobileNavClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
      isActive 
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-600/10" 
        : "bg-white text-gray-700 border-gray-200 active:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      
      {/* ================= 1. मुख्य नैव बार (डेस्कटॉप व्यू और मोबाइल टॉप हेडर) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo with Gradient Text */}
          <Link to="/" className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
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
                  ? "text-red-500 text-2xl transition-transform scale-110"
                  : "text-gray-600 hover:text-red-500 text-2xl transition-all"
              }
            >
              <FaHeart />
            </NavLink>

            {/* Desktop Chats Button with Gradient on Active */}
            <NavLink
              to="/my-chats"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-600 hover:text-blue-600"
                }`
              }
            >
              <FaComments className="text-base" />
              Chats
            </NavLink>
          </div>

          {/* Desktop Right Side Content (User Profile or Auth Buttons) */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Desktop User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition focus:outline-none"
                >
                  <FaUserCircle className="text-2xl text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right transition-all duration-200 scale-100 opacity-100 parse-animation animate-[fadeIn_0.2s_ease-out_forwards]">
                    
                    {/* User Info Header Section inside Dropdown */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email || "Active Member"}</p>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1">
                      <NavLink to="/my-products" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-sm font-semibold text-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                        <FaStore className="text-gray-400 text-base" /> My Products
                      </NavLink>
                      <NavLink to="/my-orders" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-sm font-semibold text-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                        <FaClipboardList className="text-gray-400 text-base" /> My Orders
                      </NavLink>
                      <NavLink to="/seller-orders" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-sm font-semibold text-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                        <FaBoxOpen className="text-gray-400 text-base" /> Seller Orders
                      </NavLink>
                    </div>

                    {/* Logout Option */}
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 border-t border-gray-100 transition">
                      <FaSignOutAlt className="text-base" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Auth Buttons */
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="border border-blue-600 px-5 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-95 shadow-sm transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= 2. मोबाइल हॉरिजॉन्टल स्क्रॉल बार (सिर्फ फ़ोन स्क्रीन्स पर दिखेगा) ================= */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center gap-2.5 overflow-x-auto scrollbar-none unique-mobile-scroll">
        
        {/* Core Links */}
        <NavLink to="/" className={mobileNavClass}>
          <FaHome className="text-base" /> Home
        </NavLink>
        <NavLink to="/buy" className={mobileNavClass}>
          <FaShoppingBag className="text-base" /> Buy
        </NavLink>
        <NavLink to="/sell" className={mobileNavClass}>
          <FaTag className="text-base" /> Sell
        </NavLink>
        
        {/* Mobile Compatible Chats Button */}
        <NavLink 
          to="/my-chats" 
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
              isActive 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-sm" 
                : "bg-white text-gray-700 border-gray-200 active:bg-gray-100"
            }`
          }
        >
          <FaComments className="text-base" /> Chats
        </NavLink>

        {/* Wishlist Link inside Scroll */}
        <NavLink 
          to="/wishlist" 
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
              isActive 
                ? "bg-red-500 text-white border-red-500 shadow-sm" 
                : "bg-white text-gray-700 border-gray-200 active:bg-gray-100"
            }`
          }
        >
          <FaHeart className="text-base text-red-500 fill-current" /> Wishlist
        </NavLink>

        {/* Dashboard Links */}
        {user ? (
          <>
            <NavLink to="/my-products" className={mobileNavClass}>
              <FaStore className="text-base text-blue-500" /> My Products
            </NavLink>
            <NavLink to="/my-orders" className={mobileNavClass}>
              <FaClipboardList className="text-base text-emerald-500" /> My Orders
            </NavLink>
            <NavLink to="/seller-orders" className={mobileNavClass}>
              <FaBoxOpen className="text-base text-amber-500" /> Seller Orders
            </NavLink>
            
            {/* Mobile Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 bg-red-50 text-red-600 border border-red-200 active:bg-red-100"
            >
              <FaSignOutAlt className="text-base" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="flex items-center px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap bg-white text-gray-700 border border-gray-200 active:bg-gray-100">
              Login
            </Link>
            <Link to="/signup" className="flex items-center px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-sm">
              Sign Up
            </Link>
          </>
        )}

        {/* Info & Support Links */}
        <NavLink to="/about" className={mobileNavClass}>
          <FaInfoCircle className="text-base" /> About
        </NavLink>
        <NavLink to="/help" className={mobileNavClass}>
          <FaQuestionCircle className="text-base" /> Help
        </NavLink>
        
      </div>

      {/* CSS Animation Utility (Drop-down smooth entry ke liye) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;