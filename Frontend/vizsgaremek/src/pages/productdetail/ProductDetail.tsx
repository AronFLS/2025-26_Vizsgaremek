import { Link, useParams } from "react-router-dom";
import { products } from "../../mocks/products";
import "./ProductDetail.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const isMobile = useMediaQuery("(max-width: 700px)");
  // Fetch or find your product using the id
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <Link to="/phones">
        <IoArrowBackOutline className="return-icon" />
      </Link>
      <div className="image-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="right-column">
        <div className="details">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
        </div>
        <div className="price-cart-row">
          <p className="price">{product.price.toLocaleString("hu-HU")} Ft</p>
          <button className={isMobile ? "cartbtnmobile" : "cartbtn"}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
