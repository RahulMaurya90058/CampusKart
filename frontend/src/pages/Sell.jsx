import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductFormV2 from "../components/ProductFormV2";
import { toast } from "react-toastify";

function Sell() {
  const handleAddProduct = async (formData, image) => {
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);

      if (image) {
        data.append("image", image);
      }

      const res = await API.post("/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
      return false;
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-14">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center mb-14">

            <h1 className="text-5xl font-bold text-blue-700">
              Sell Your Product
            </h1>

            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              Turn your unused products into money. Fill the details below and
              publish your product for thousands of students.
            </p>

          </div>

          {/* Layout */}

          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left */}

            <div className="lg:col-span-3">

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <ProductFormV2
                  onSubmit={handleAddProduct}
                  buttonText="Publish Product"
                />

              </div>

            </div>

            {/* Right */}

            <div className="lg:col-span-2">

              <div className="sticky top-24 space-y-6">

                {/* Seller Tips */}

                <div className="bg-white rounded-3xl shadow-xl p-7">

                  <h2 className="text-2xl font-bold text-blue-600 mb-5">
                    💡 Seller Tips
                  </h2>

                  <ul className="space-y-4 text-gray-700">

                    <li>📸 Upload a high quality image.</li>

                    <li>📝 Keep title short and attractive.</li>

                    <li>💰 Choose a reasonable price.</li>

                    <li>📄 Mention all product details.</li>

                    <li>✅ Be honest about condition.</li>

                  </ul>

                </div>

                {/* Why Sell */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-7 text-white shadow-xl">

                  <h2 className="text-2xl font-bold mb-5">
                    🚀 Why Sell on CampusKart?
                  </h2>

                  <div className="space-y-4">

                    <div>
                      <h3 className="font-semibold">
                        ⚡ Fast Selling
                      </h3>

                      <p className="text-blue-100 text-sm">
                        Reach students instantly.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        🔒 Secure Platform
                      </h3>

                      <p className="text-blue-100 text-sm">
                        Safe buying & selling.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        💸 Zero Listing Fee
                      </h3>

                      <p className="text-blue-100 text-sm">
                        Publish unlimited products.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Sell;