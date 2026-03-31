import { Link } from "react-router-dom";
import accessoriesFinal from "../../../assets/accessoriesfinal.png";
import iphonesFinal from "../../../assets/iphonesfinal.png";
import macbooksFinal from "../../../assets/macbooksfinal.png";
import "./ProductCard.css";

const productImages = [
  { src: iphonesFinal, alt: "iPhones" },
  { src: macbooksFinal, alt: "MacBooks" },
  { src: accessoriesFinal, alt: "Accessories" },
];

function ProductCard() {
  return (
    <section className="product-cards" aria-label="Product categories">
      {productImages.map((image) => (
        <article className="product-card" key={image.alt}>
          <Link to={`/${image.alt.toLowerCase()}`}>
            <img
              src={image.src}
              alt={image.alt}
              className="product-card__image"
            />
          </Link>
        </article>
      ))}
    </section>
  );
}

export default ProductCard;
