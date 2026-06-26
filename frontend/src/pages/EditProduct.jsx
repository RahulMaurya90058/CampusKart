import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      toast.error("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (formData, image) => {
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

      const res = await API.put(
        `/products/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      navigate("/my-products");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Edit Product
            </h1>

            <ProductForm
              initialData={product}
              onSubmit={handleUpdateProduct}
              buttonText="Update Product"
            />

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default EditProduct;