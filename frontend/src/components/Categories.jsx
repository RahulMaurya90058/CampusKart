import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaLaptop,
  FaMobileAlt,
  FaBicycle,
  FaChair,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Books", icon: <FaBook className="text-4xl text-blue-600" /> },
    { name: "Laptop", icon: <FaLaptop className="text-4xl text-blue-600" /> },
    { name: "Mobile", icon: <FaMobileAlt className="text-4xl text-blue-600" /> },
    { name: "Cycle", icon: <FaBicycle className="text-4xl text-blue-600" /> },
    { name: "Furniture", icon: <FaChair className="text-4xl text-blue-600" /> },
    { name: "Notes", icon: <MdMenuBook className="text-4xl text-blue-600" /> },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-3">
          Shop by Category
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Find everything you need for your campus life.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() =>
                navigate(`/buy?category=${encodeURIComponent(item.name)}`)
              }
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer text-center"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;