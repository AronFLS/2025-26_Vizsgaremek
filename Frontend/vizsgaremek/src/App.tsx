import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";
import ProductDetail from "./pages/product-detail/ProductDetail";
import AccountDetail from "./pages/account-detail/AccountDetail";
import Shipping from "./pages/order-process/shipping/Shipping";
import Checkout from "./pages/order-process/checkout/Checkout";
import OrderConfirmed from "./pages/order-process/order-confirmation/OrderConfirmed";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iphones" element={<Products />} />
        <Route path="/macbooks" element={<Products />} />
        <Route path="/accessories" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/accountdetail" element={<AccountDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orderconfirmed" element={<OrderConfirmed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
