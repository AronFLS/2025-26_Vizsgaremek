import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/home/Home";
import Accessories from "./pages/products/Accessories";
import Cart from "./pages/cart/cart";
import Phones from "./pages/products/phones";
import Notebooks from "./pages/products/Notebooks";
import Account from "./pages/account/account";
import Admin from "./pages/admin/admin";
import ProductDetail from "./pages/productdetail/ProductDetail";
import AccountDetail from "./pages/accountdetail/AccountDetail";
import Checkout from "./pages/checkout/checkout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/accountdetail" element={<AccountDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
