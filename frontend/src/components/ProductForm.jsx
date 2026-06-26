import { useState, useEffect } from "react";

function ProductForm({
  initialData,
  onSubmit,
  buttonText = "Add Product",
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData, image);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">

      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full border rounded-lg px-4 py-3"
  required
>
  <option value="">Select Category</option>
  <option value="Electronics">Electronics</option>
  <option value="Books">Books</option>
  <option value="Furniture">Furniture</option>
  <option value="Cycle">Cycle</option>
  <option value="Mobile">Mobile</option>
  <option value="Laptop">Laptop</option>
  <option value="Notes">Notes</option>
</select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full border rounded-lg px-4 py-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        {buttonText}
      </button>

    </form>
  );
}

export default ProductForm;