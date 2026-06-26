import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route
  path="/sell"
  element={
    <ProtectedRoute>
      <Sell />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;