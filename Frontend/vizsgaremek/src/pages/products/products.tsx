import { Link, useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../utils/productSpecs";
import { formatPrice } from "../../utils/formatPrice";
import "./Products.css";
import * as React from "react";
import { useState } from "react";
import { useAccount } from "../../hooks/useAccount";
import { IoCloseOutline } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { IoSearchOutline } from "react-icons/io5";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  specs: ProductSpecs;
  categoryId: number;
  storageQuantity?: number;
  active: boolean;
}

interface Category {
  id: number;
  name: string;
}

const categoryConfig: Record<
  string,
  {
    title: string;
    searchKeywords: string[];
    showLoginFeature: boolean;
    checkStockQuantity: boolean;
  }
> = {
  phones: {
    title: "iPhones",
    searchKeywords: ["phone", "iphone"],
    showLoginFeature: true,
    checkStockQuantity: false,
  },
  accessories: {
    title: "Accessories",
    searchKeywords: ["accessories"],
    showLoginFeature: false,
    checkStockQuantity: true,
  },
  macbooks: {
    title: "MacBooks",
    searchKeywords: ["macbook"],
    showLoginFeature: false,
    checkStockQuantity: true,
  },
};

function Products() {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const location = useLocation();

  let category = paramCategory?.toLowerCase() || "phones";

  if (!paramCategory) {
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes("iphone")) {
      category = "phones";
    } else if (pathname.includes("macbook")) {
      category = "macbooks";
    } else if (pathname.includes("accessories")) {
      category = "accessories";
    }
  }

  const config = categoryConfig[category] || categoryConfig.phones;

  const [loginSnackbarOpen, setLoginSnackbarOpen] = React.useState(false);
  const [cartSuccessSnackbarOpen, setCartSuccessSnackbarOpen] =
    React.useState(false);
  const [query, setQuery] = useState("");

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

  const { data } = useAccount();
  const isLoggedIn = data !== null;

  const { mutate: addProductToCart, isPending: addToCartPending } = useMutation(
    {
      mutationFn: (productId: number) =>
        axiosInstance.post("/Carts/AddProduct", {
          quantity: 1,
          productId,
        }),
      onSuccess: () => {
        setCartSuccessSnackbarOpen(true);
      },
    },
  );

  const categoryId = categories.find((c) =>
    config.searchKeywords.some((keyword) =>
      c.name.toLowerCase().includes(keyword),
    ),
  )?.id;

  const filteredProducts =
    categoryId != null
      ? products
          .filter((p) => p.categoryId === categoryId)
          .filter((p) => p.active === true)
          .filter((p) => {
            const lowerQuery = query.toLowerCase();
            const matchesName = p.name.toLowerCase().includes(lowerQuery);
            const specsString = formatProductSpecs(p.specs).toLowerCase();
            const matchesSpecs = specsString.includes(lowerQuery);
            return matchesName || matchesSpecs;
          })
      : [];

  if (productsLoading || categoriesLoading) {
    return (
      <div className="products-page">
        <p>Loading...</p>
      </div>
    );
  }

  const handleLoginSnackbarOpen = () => {
    setLoginSnackbarOpen(true);
  };

  const handleLoginSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    void event;

    if (reason === "clickaway") {
      return;
    }

    setLoginSnackbarOpen(false);
  };

  const handleCartSuccessSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    void event;

    if (reason === "clickaway") {
      return;
    }

    setCartSuccessSnackbarOpen(false);
  };

  const loginSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="medium"
        aria-label="close"
        onClick={handleLoginSnackbarClose}
      >
        <IoCloseOutline style={{ color: "white" }} />
      </IconButton>
    </React.Fragment>
  );

  const isOutOfStock = (product: Product): boolean => {
    if (config.checkStockQuantity && product.storageQuantity !== undefined) {
      return product.storageQuantity === 0;
    }
    return false;
  };

  const handleAddToCart = (productId: number) => {
    if (!isLoggedIn) {
      handleLoginSnackbarOpen();
      return;
    }

    addProductToCart(productId);
  };

  return (
    <div className="products-page">
      <div className="products-page-header">
        <p className="products-page-title">{config.title}</p>
        <div className="products-search-bar-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="products-search-bar"
          />
          <IoSearchOutline className="products-search-bar-icon" />
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card${
              config.checkStockQuantity && isOutOfStock(product)
                ? " product-card--out-of-stock"
                : ""
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
                onClick={() => handleAddToCart(product.id)}
                disabled={
                  config.checkStockQuantity
                    ? isOutOfStock(product)
                    : addToCartPending
                }
              >
                {config.checkStockQuantity
                  ? isOutOfStock(product)
                    ? "Out of stock"
                    : "Add to cart"
                  : addToCartPending
                    ? "Adding..."
                    : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={loginSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleLoginSnackbarClose}
        message="Please log in to add products to your cart."
        action={loginSnackbarAction}
      />
      <Snackbar
        open={cartSuccessSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCartSuccessSnackbarClose}
      >
        <Alert
          onClose={handleCartSuccessSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product added to cart successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Products;
