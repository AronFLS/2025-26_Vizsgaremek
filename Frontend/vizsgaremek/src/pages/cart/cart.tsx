import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));

      updateCartProductQuantity({
        productId,
        quantity: newQuantity,
      });
    }
  };

  const handleDecrement = (productId: number) => {
    handleQuantityChange(productId, (quantities[productId] || 1) - 1);
  };

  const handleIncrement = (productId: number) => {
    handleQuantityChange(productId, (quantities[productId] || 1) + 1);
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
          const currentQuantity = quantities[item.product.id] || item.quantity;
          const originalTotalPrice = item.product.price * currentQuantity;
          const discountedTotalPrice =
            item.product.price *
            (1 - (item.product.discount || 0) / 100) *
            currentQuantity;

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
                    onClick={() => handleDecrement(item.product.id)}
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
                      )
                    }
                    min="1"
                  />
                  <button
                    className="quantity-btn quantity-btn-plus"
                    onClick={() => handleIncrement(item.product.id)}
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
                {item.product.discount && item.product.discount > 0 ? (
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
                {item.product.discount && item.product.discount > 0 && (
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
    </div>
  );
}

export default Cart;
