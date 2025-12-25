import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-link">
        <span>Home</span>
      </Link>
      <Link to="/products" className="nav-link">
        <span>Products</span>
      </Link>
    </nav>
  );
}
export default Navbar;
