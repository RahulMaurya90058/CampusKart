import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">

      <div className="max-w-6xl mx-auto px-6 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready to Buy or Sell?
        </h2>

        <p className="text-xl mt-6 text-blue-100 max-w-3xl mx-auto">
          Join CampusKart today and become a part of the trusted student
          marketplace. Buy amazing products or sell your unused items
          quickly and securely.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">

          <button
            onClick={() => navigate("/buy")}
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 duration-300"
          >
            Browse Products
          </button>

          <button
            onClick={() => {
              if (user) {
                navigate("/sell");
              } else {
                navigate("/login");
              }
            }}
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 duration-300"
          >
            Start Selling
          </button>

        </div>

      </div>

    </section>
  );
}

export default CallToAction;