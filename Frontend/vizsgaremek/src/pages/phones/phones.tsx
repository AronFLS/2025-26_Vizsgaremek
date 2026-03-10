import { Link } from "react-router-dom";
import { getProductsByCategory } from "../../mocks/products";
import "./phones.css";

const phones = getProductsByCategory("phones");

function Phones() {
  return (
    <div className="products-page">
      <h1>iPhones</h1>
      <div className="products-grid">
        {phones.map((product) => (
          <div
            key={product.id}
            className={`product-card${
              product.stock === 0 ? " product-card--out-of-stock" : ""
            }`}
          >
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="product-card__image-wrapper">
                <img src={product.imageUrl} alt={product.name} />
              </div>

              <div className="product-card__body">
                <h2 className="product-card__name">{product.name}</h2>
                <p className="product-card__description">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="product-card__footer">
              <span className="product-card__price">
                {product.price.toLocaleString("hu-HU")} Ft
              </span>

              <button
                className="product-card__btn"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of stock" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phones;
