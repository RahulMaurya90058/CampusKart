import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
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

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sell Product
          </h1>

          <ProductForm
            onSubmit={handleAddProduct}
            buttonText="Add Product"
          />

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Sell;