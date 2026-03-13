import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import "./product.css";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  storageQuantity: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

function Accessories() {
  const { data: products = [], isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/api/products").then((r) => r.data),
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: () => axiosInstance.get("/api/categories").then((r) => r.data),
  });

  const phoneCategoryId = categories.find((c) =>
    c.name.toLowerCase().includes("accessories"),
  )?.id;

  const phones =
    phoneCategoryId != null
      ? products.filter((p) => p.categoryId === phoneCategoryId)
      : [];

  if (productsLoading || categoriesLoading) {
    return (
      <div className="products-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Accessories</h1>
      <div className="products-grid">
        {phones.map((product) => (
          <div
            key={product.id}
            className={`product-card${
              product.storageQuantity === 0 ? " product-card--out-of-stock" : ""
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
                disabled={product.storageQuantity === 0}
              >
                {product.storageQuantity === 0 ? "Out of stock" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;
