import { useState, useEffect, type SyntheticEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { axiosInstance } from "../../axios";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../utils/productSpecs";
import { formatPrice } from "../../utils/formatPrice";
import "./Cart.css";

interface ProductSpec {
  id: number;
  name: string;
}

interface CartProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  storageQuantity?: number;
  specs: ProductSpec[];
}

interface CartProductListItem {
  quantity: number;
  product: CartProduct;
}

interface CartData {
  products: CartProductListItem[];
  cartId: number;
  userEmail: string;
}

function Cart() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [maxLimitSnackbarOpen, setMaxLimitSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cart, isLoading: cartLoading } = useQuery<CartData>({
    queryKey: ["currentCart"],
    queryFn: () => axiosInstance.get("/Carts/Current").then((r) => r.data),
  });

  const { mutate: updateCartProductQuantity } = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) =>
      axiosInstance.post("/Carts/AddProduct", {
        quantity,
        productId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentCart"] });
    },
  });

  // Initialize quantities when cart loads
  useEffect(() => {
    if (cart && quantities) {
      const initialQuantities = Object.fromEntries(
        cart.products.map((item) => [item.product.id, item.quantity]),
      );
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (
    productId: number,
    newQuantity: number,
    maxQuantity?: number,
  ) => {
    if (maxQuantity !== undefined && newQuantity > maxQuantity) {
      setMaxLimitSnackbarOpen(true);
    }

    const clampedQuantity =
      maxQuantity !== undefined
        ? Math.min(newQuantity, Math.max(1, maxQuantity))
        : newQuantity;

    if (clampedQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: clampedQuantity,
      }));

      updateCartProductQuantity({
        productId,
        quantity: clampedQuantity,
      });
    }
  };

  const handleDecrement = (productId: number, maxQuantity?: number) => {
    handleQuantityChange(
      productId,
      (quantities[productId] || 1) - 1,
      maxQuantity,
    );
  };

  const handleIncrement = (productId: number, maxQuantity?: number) => {
    handleQuantityChange(
      productId,
      (quantities[productId] || 1) + 1,
      maxQuantity,
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });

    updateCartProductQuantity({
      productId,
      quantity: 0,
    });
  };

  const handleMaxLimitSnackbarClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    void event;

    if (reason === "clickaway") {
      return;
    }

    setMaxLimitSnackbarOpen(false);
  };

  const maxLimitSnackbarAction = (
    <>
      <IconButton
        size="medium"
        aria-label="close"
        onClick={handleMaxLimitSnackbarClose}
      >
        <IoCloseOutline style={{ color: "white" }} />
      </IconButton>
    </>
  );

  if (cartLoading) {
    return (
      <div className="cart-page">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-products">
        {cart.products.map((item) => {
          const discount = item.product.discount ?? 0;
          const currentQuantity = quantities[item.product.id] || item.quantity;
          const maxQuantity = item.product.storageQuantity;
          const originalTotalPrice = item.product.price * currentQuantity;
          const discountedTotalPrice =
            item.product.price * (1 - discount / 100) * currentQuantity;

          return (
            <div key={item.product.id} className="cart-product-item">
              <div className="cart-product-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className="cart-product-details">
                <h2>{item.product.name}</h2>
                <p className="cart-product-specs">
                  {formatProductSpecs(item.product.specs as ProductSpecs)}
                </p>
              </div>
              <div className="quantity-actions">
                <div className="quantity-control">
                  <button
                    className="quantity-btn quantity-btn-minus"
                    onClick={() =>
                      handleDecrement(item.product.id, maxQuantity)
                    }
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={currentQuantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.product.id,
                        parseInt(e.target.value) || 1,
                        maxQuantity,
                      )
                    }
                    min="1"
                    max={maxQuantity}
                  />
                  <button
                    className="quantity-btn quantity-btn-plus"
                    onClick={() =>
                      handleIncrement(item.product.id, maxQuantity)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="remove-from-cart-btn"
                  onClick={() => handleRemoveFromCart(item.product.id)}
                >
                  Remove from cart
                </button>
              </div>
              <div className="cart-product-right">
                {discount > 0 ? (
                  <div className="cart-product-price-block">
                    <p className="cart-product-original-price">
                      {formatPrice(originalTotalPrice)} Ft
                    </p>
                    <p className="cart-product-discounted-price">
                      {formatPrice(discountedTotalPrice)} Ft
                    </p>
                  </div>
                ) : (
                  <p className="cart-product-price">
                    {formatPrice(originalTotalPrice)} Ft
                  </p>
                )}
                {discount > 0 && (
                  <p className="cart-product-discount">
                    Saved {item.product.discount}%
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="checkout-btn" onClick={() => navigate("/shipping")}>
        Proceed to Checkout
      </button>
      <Snackbar
        open={maxLimitSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleMaxLimitSnackbarClose}
        message="You reached the maximum available stock for this product."
        action={maxLimitSnackbarAction}
      />
    </div>
  );
}

export default Cart;
