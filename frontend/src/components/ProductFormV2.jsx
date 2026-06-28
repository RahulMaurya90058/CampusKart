import { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaTags,
  FaAlignLeft,
} from "react-icons/fa";

function ProductFormV2({
  initialData,
  onPreviewChange,
  onSubmit,
  buttonText = "Publish Product",
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
      });

      if (initialData.image) {
        setPreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
  const updatedData = {
    ...formData,
    [e.target.name]: e.target.value,
  };

  setFormData(updatedData);

  if (onPreviewChange) {
    onPreviewChange({
      ...updatedData,
      image: preview,
    });
  }
};

 const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setImage(file);
  setPreview(imageUrl);

  if (onPreviewChange) {
    onPreviewChange({
      ...formData,
      image: imageUrl,
    });
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await onSubmit(formData, image);

  if (success) {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
    });

    setImage(null);
    setPreview("");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Upload Image */}

      <div className="border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50 p-6 text-center">

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-60 w-full object-cover rounded-xl mb-4"
          />
        ) : (
          <>
            <FaCloudUploadAlt className="mx-auto text-6xl text-blue-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Upload Product Image
            </h3>

            <p className="text-gray-500 mt-2">
              JPG, PNG or JPEG
            </p>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-6 w-full"
        />

      </div>

      {/* Product Title */}

      <div>

        <label className="font-semibold flex items-center gap-2 mb-2">
          <FaBoxOpen className="text-blue-600" />
          Product Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Enter Product Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

      </div>

            {/* Price & Category */}

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FaMoneyBillWave className="text-green-600" />
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="₹ Enter Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

        </div>

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FaTags className="text-purple-600" />
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">💻 Electronics</option>
            <option value="Books">📚 Books</option>
            <option value="Furniture">🪑 Furniture</option>
            <option value="Cycle">🚲 Cycle</option>
            <option value="Mobile">📱 Mobile</option>
            <option value="Laptop">💻 Laptop</option>
            <option value="Notes">📄 Notes</option>
          </select>

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="font-semibold flex items-center gap-2 mb-2">
          <FaAlignLeft className="text-orange-500" />
          Description
        </label>

        <textarea
          name="description"
          rows="5"
          placeholder="Write product description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
          required
        />

        <div className="flex justify-between items-center mt-2">

          <p className="text-sm text-gray-500">
            Write a clear description to attract buyers.
          </p>

          <span className="text-sm text-gray-500">
            {formData.description.length}/500
          </span>

        </div>

      </div>

      {/* Submit Button */}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300"
      >
        🚀 {buttonText}
      </button>

          </form>
  );
}

export default ProductFormV2;