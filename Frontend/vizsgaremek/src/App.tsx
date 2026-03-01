import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/home/Home";
import Accessories from "./pages/accessories/Accessories";
import Cart from "./pages/cart/cart";
import Phones from "./pages/phones/phones";
import Notebooks from "./pages/notebooks/Notebooks";
import Account from "./pages/account/account";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
