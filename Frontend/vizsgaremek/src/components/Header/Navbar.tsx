import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="nav-logo">
        <span>Logo</span>
      </NavLink>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>Products</span>
        </NavLink>
      </nav>
      <NavLink to="/cart" className="nav-cart">
        <span>Cart</span>
      </NavLink>
    </header>
  );
}
export default Navbar;
