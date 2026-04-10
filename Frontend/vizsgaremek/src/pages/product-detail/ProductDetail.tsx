import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import "./ProductDetail.css";
import { IoArrowBackOutline, IoCloseOutline } from "react-icons/io5";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAccount } from "../../hooks/useAccount";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../utils/productSpecs";
import { formatPrice } from "../../utils/formatPrice";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { IoIosArrowBack } from "react-icons/io";
import Alert from "@mui/material/Alert";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  specs: ProductSpecs;
  description?: string;
  storageQuantity: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const categoryRouteMap: Record<string, string> = {
  iphone: "/iphones",
  macbook: "/macbooks",
  accessories: "/accessories",
};

const categoryConfig: Record<
  string,
  {
    showLoginFeature: boolean;
    checkStockQuantity: boolean;
  }
> = {
  iphone: {
    showLoginFeature: true,
    checkStockQuantity: false,
  },
  macbook: {
    showLoginFeature: false,
    checkStockQuantity: true,
  },
  accessories: {
    showLoginFeature: false,
    checkStockQuantity: true,
  },
};

function getCategoryRoute(categoryName: string): string {
  const key = categoryName.toLowerCase();
  for (const [keyword, route] of Object.entries(categoryRouteMap)) {
    if (key.includes(keyword)) return route;
  }
  return "/";
}

function getCategoryConfig(categoryName: string): {
  showLoginFeature: boolean;
  checkStockQuantity: boolean;
} {
  const key = categoryName.toLowerCase();
  for (const [keyword, config] of Object.entries(categoryConfig)) {
    if (key.includes(keyword)) return config;
  }
  return categoryConfig.iphone;
}

function ProductDetail() {
  const COLLAPSED_DESCRIPTION_MAX_HEIGHT = 170;

  const { id } = useParams<{ id: string }>();
  const isMobile = useMediaQuery("(max-width: 770px)");
  const [loginSnackbarOpen, setLoginSnackbarOpen] = useState(false);
  const [cartSuccessSnackbarOpen, setCartSuccessSnackbarOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showDescriptionToggle, setShowDescriptionToggle] = useState(false);
  const [descriptionMaxHeight, setDescriptionMaxHeight] = useState(
    COLLAPSED_DESCRIPTION_MAX_HEIGHT,
  );
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => axiosInstance.get(`/api/products/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const { data: categories = [] } = useQuery<Category[]>({
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

  const backRoute = product
    ? getCategoryRoute(
        categories.find((c) => c.id === product.categoryId)?.name ?? "",
      )
    : "/";

  const config = product
    ? getCategoryConfig(
        categories.find((c) => c.id === product.categoryId)?.name ?? "",
      )
    : { showLoginFeature: true, checkStockQuantity: false };

  useEffect(() => {
    if (!product || !descriptionRef.current) {
      return;
    }

    const checkOverflow = () => {
      if (!descriptionRef.current) {
        return;
      }

      const isOverflowing =
        descriptionRef.current.scrollHeight >
        COLLAPSED_DESCRIPTION_MAX_HEIGHT + 1;

      setShowDescriptionToggle(isOverflowing);

      if (isDescriptionExpanded) {
        setDescriptionMaxHeight(descriptionRef.current.scrollHeight);
      }

      if (!isOverflowing) {
        setIsDescriptionExpanded(false);
        setDescriptionMaxHeight(COLLAPSED_DESCRIPTION_MAX_HEIGHT);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [product, isDescriptionExpanded, COLLAPSED_DESCRIPTION_MAX_HEIGHT]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found</p>;

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;
  const discountedPrice = product.price * (1 - discount / 100);
  const normalizedDescription = product.description?.replace(/\\n/g, "\n");

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

  const isOutOfStock = (): boolean => {
    if (config.checkStockQuantity && product.storageQuantity !== undefined) {
      return product.storageQuantity === 0;
    }
    return false;
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      handleLoginSnackbarOpen();
      return;
    }

    addProductToCart(product.id);
  };

  const handleDescriptionToggle = () => {
    if (!descriptionRef.current) {
      return;
    }

    if (isDescriptionExpanded) {
      setDescriptionMaxHeight(COLLAPSED_DESCRIPTION_MAX_HEIGHT);
      setIsDescriptionExpanded(false);
      return;
    }

    setDescriptionMaxHeight(descriptionRef.current.scrollHeight);
    setIsDescriptionExpanded(true);
  };

  return (
    <div className="product-detail">
      {!isMobile && (
        <Link to={backRoute}>
          <IoArrowBackOutline className="return-icon" />
        </Link>
      )}
      <div className="image-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="right-column">
        <div className="details">
          <h1>{product.name}</h1>
          <div className="description-section">
            <div
              ref={descriptionRef}
              className={`description-content ${
                isDescriptionExpanded ? "expanded" : "collapsed"
              } ${showDescriptionToggle ? "is-overflowing" : ""}`}
              style={{
                maxHeight: `${descriptionMaxHeight}px`,
              }}
            >
              <p className="description specs-description">
                {formatProductSpecs(product.specs)}
              </p>
              {normalizedDescription && (
                <p className="description">{normalizedDescription}</p>
              )}
            </div>
            {showDescriptionToggle && (
              <button
                type="button"
                className="description-toggle"
                onClick={handleDescriptionToggle}
                aria-expanded={isDescriptionExpanded}
                aria-label={
                  isDescriptionExpanded
                    ? "Collapse description"
                    : "Expand description"
                }
              >
                <IoIosArrowBack
                  className={`description-toggle-icon ${
                    isDescriptionExpanded ? "expanded" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        <div className="price-cart-row">
          {hasDiscount ? (
            <div className="price-block">
              <p className="original-price">{formatPrice(product.price)} Ft</p>
              <p className="price discounted">
                {formatPrice(discountedPrice)} Ft
              </p>
            </div>
          ) : (
            <p className="price">{formatPrice(product.price)} Ft</p>
          )}
          <button
            className={isMobile ? "cartbtnmobile" : "cartbtn"}
            onClick={handleAddToCart}
            disabled={
              config.checkStockQuantity ? isOutOfStock() : addToCartPending
            }
          >
            {config.checkStockQuantity
              ? isOutOfStock()
                ? "Out of stock"
                : "Add to cart"
              : addToCartPending
                ? "Adding..."
                : "Add to cart"}
          </button>
        </div>
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

export default ProductDetail;
