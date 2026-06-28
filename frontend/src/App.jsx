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
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import SellerOrders from "./pages/SellerOrders";
import About from "./pages/About";
import Help from "./pages/Help";
import Chat from "./pages/Chat";
import MyChats from "./pages/MyChats";

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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/seller-orders" element={<SellerOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      
        <Route
  path="/chat/:conversationId"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-chats"
  element={
    <ProtectedRoute>
      <MyChats />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;