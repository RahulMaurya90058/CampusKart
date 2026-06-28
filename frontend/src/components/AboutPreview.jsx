import { Link } from "react-router-dom";
import rahul from "../assets/rahul.png";

function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}

          <div className="flex justify-center">
            <img
              src={rahul}
              alt="Rahul Maurya"
              className="w-80 h-96 object-cover rounded-3xl shadow-2xl border-4 border-blue-600"
            />
          </div>

          {/* Content */}

          <div>

            <span className="text-blue-600 font-semibold uppercase">
              Meet the Developer
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Rahul Maurya
            </h2>

            <h3 className="text-2xl text-gray-600 mt-2">
              Full Stack MERN Developer
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              I am a B.Tech Information Technology student passionate about
              building modern, secure and user-friendly web applications.

              CampusKart is my flagship MERN project featuring authentication,
              wishlist, Razorpay payment integration, seller dashboard,
              order management and responsive UI.
            </p>

            <Link
              to="/about"
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Read Full Profile →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutPreview;