import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-blue-400">
              CampusKart
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              CampusKart is a secure student marketplace where you can
              buy, sell and exchange products easily within your campus.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>

              <Link to="/buy" className="hover:text-blue-400">
                Buy
              </Link>

              <Link to="/sell" className="hover:text-blue-400">
                Sell
              </Link>

              <Link to="/about" className="hover:text-blue-400">
                About
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3">

              <Link to="/help" className="hover:text-blue-400">
                Help Center
              </Link>

              <Link to="/wishlist" className="hover:text-blue-400">
                Wishlist
              </Link>

              <Link to="/my-orders" className="hover:text-blue-400">
                My Orders
              </Link>

              <Link to="/seller-orders" className="hover:text-blue-400">
                Seller Orders
              </Link>

            </div>

          </div>

          {/* Connect */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="space-y-4">

              <a
                href="https://github.com/RahulMaurya90058"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/rahul-maurya-16b957312"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaLinkedin />
                LinkedIn
              </a>

              <a
                href="mailto:rahulmaurya956945@gmail.com"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaEnvelope />
                Email
              </a>

            </div>

          </div>

        </div>

        <hr className="border-gray-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400">
            © 2026 CampusKart. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-400">
            Built with
            <FaHeart className="text-red-500" />
            by Rahul Maurya
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;