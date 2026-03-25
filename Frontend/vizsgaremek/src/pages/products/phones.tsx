import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../utils/productSpecs";
import { formatPrice } from "../../utils/price";
import "./product.css";
import * as React from "react";
import { useAccount } from "../../hooks/useAccount";
import { IoCloseOutline } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  specs: ProductSpecs;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

function Phones() {
  const [loginSnackbarOpen, setLoginSnackbarOpen] = React.useState(false);
  const [cartSuccessSnackbarOpen, setCartSuccessSnackbarOpen] =
    React.useState(false);

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

  const phoneCategoryId = categories.find(
    (c) =>
      c.name.toLowerCase().includes("phone") ||
      c.name.toLowerCase().includes("iphone"),
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
        color="inherit"
        onClick={handleLoginSnackbarClose}
      >
        <IoCloseOutline />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="products-page">
      <h1>iPhones</h1>
      <div className="products-grid">
        {phones.map((product) => (
          <div key={product.id} className={`product-card`}>
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
                onClick={
                  isLoggedIn
                    ? () => addProductToCart(product.id)
                    : handleLoginSnackbarOpen
                }
                disabled={addToCartPending}
              >
                {addToCartPending ? "Adding..." : "Add to cart"}
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

export default Phones;
