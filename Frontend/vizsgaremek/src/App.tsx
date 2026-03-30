import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/home/Home";
import Products from "./pages/products/products";
import Cart from "./pages/cart/cart";
import Account from "./pages/account/account";
import Admin from "./pages/admin/admin";
import ProductDetail from "./pages/productdetail/ProductDetail";
import AccountDetail from "./pages/accountdetail/AccountDetail";
import Shipping from "./pages/shipping/shipping";
import Checkout from "./pages/checkout/checkout";
import OrderConfirmed from "./pages/checkout/orderconfirmed";

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
        <Route path="/account" element={<Account />} />
        <Route path="/accountdetail" element={<AccountDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orderconfirmed" element={<OrderConfirmed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
