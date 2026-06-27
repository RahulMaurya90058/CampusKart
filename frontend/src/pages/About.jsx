import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import rahul from "../assets/rahul.png";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-16">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-5xl font-bold text-center text-blue-600 mb-12">
            About Developer
          </h1>

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Image */}

            <div className="flex justify-center">

              <img
  src={rahul}
  alt="Rahul Maurya"
  className="w-80 rounded-3xl shadow-2xl border-4 border-blue-500 hover:scale-105 transition duration-300"
/>

            </div>

            {/* Details */}

            <div>

              <h2 className="text-4xl font-bold">
                Rahul Maurya
              </h2>

              <p className="text-xl text-blue-600 mt-2">
                MERN Stack Developer
              </p>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
  Hello! I'm <span className="font-semibold text-blue-600">Rahul Maurya</span>,
  a B.Tech Information Technology student passionate about Full Stack Web
  Development. I specialize in building modern, responsive and secure web
  applications using the MERN Stack.

  <br /><br />

  CampusKart is my major project, designed to help students buy, sell and
  exchange products within their college community. It includes secure JWT
  authentication, Razorpay payment integration, wishlist management, seller
  dashboard, order tracking and many other real-world marketplace features.
</p>

              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-4">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    HTML
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    CSS
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    JavaScript
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    React
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    Node.js
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    Express
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    MongoDB
                  </span>

                  <span className="bg-blue-100 px-4 py-2 rounded-full">
                    Razorpay
                  </span>

                </div>


                <div className="mt-10">

  <h3 className="text-2xl font-bold mb-5">
    Featured Projects
  </h3>

  <div className="space-y-4">

    <div className="bg-gray-100 p-4 rounded-xl">
      <h4 className="font-bold text-blue-600">
        CampusKart
      </h4>

      <p>
        A complete MERN marketplace with authentication,
        Razorpay payment gateway, wishlist, order management,
        seller dashboard and responsive UI.
      </p>
    </div>

    <div className="bg-gray-100 p-4 rounded-xl">
      <h4 className="font-bold text-blue-600">
        Stopwatch
      </h4>

      <p>
        Responsive stopwatch with start, stop,
        reset and lap functionality.
      </p>
    </div>

    <div className="bg-gray-100 p-4 rounded-xl">
      <h4 className="font-bold text-blue-600">
        Calculator
      </h4>

      <p>
        Responsive calculator built using HTML,
        CSS and JavaScript.
      </p>
    </div>

  </div>

</div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default About;