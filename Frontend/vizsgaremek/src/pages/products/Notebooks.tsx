import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../utils/productSpecs";
import { formatPrice } from "../../utils/price";
import "./product.css";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  specs: ProductSpecs;
  storageQuantity: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

function MacBooks() {
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
    c.name.toLowerCase().includes("macbook"),
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
      <h1>MacBooks</h1>
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
                  {formatProductSpecs(product.specs)}
                </p>
              </div>
            </Link>
            <div className="product-card__footer">
              {product.discount && product.discount > 0 ? (
                <div className="product-card__price-block">
                  <span className="product-card__original-price">
                    {formatPrice(product.price)} Ft
                  </span>
                  <span className="product-card__price discounted">
                    {formatPrice(product.price * (1 - product.discount / 100))}{" "}
                    Ft
                  </span>
                </div>
              ) : (
                <span className="product-card__price">
                  {formatPrice(product.price)} Ft
                </span>
              )}

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

export default MacBooks;
