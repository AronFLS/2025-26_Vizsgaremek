import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import { useAccount } from "../../../hooks/useAccount";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../../utils/productSpecs";
import { formatPrice } from "../../../utils/formatPrice";
import "./Checkout.css";

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
}

interface OrderDraftData {
  id: number;
  paymentMethod: string;
  addressLine: string;
  city: string;
  zipCode: string;
}

interface UserSummary {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { data: accountData } = useAccount();

  const rawEmailFromToken = (
    accountData as Record<string, string | string[] | undefined> | null
  )?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

  const emailFromToken =
    typeof rawEmailFromToken === "string" ? rawEmailFromToken : "";

  const { data: cart, isLoading: cartLoading } = useQuery<CartData>({
    queryKey: ["currentCart"],
    queryFn: () =>
      axiosInstance.get("/Carts/Current").then((resp) => resp.data),
  });

  const { data: orderDraft, isLoading: orderDraftLoading } =
    useQuery<OrderDraftData>({
      queryKey: ["currentOrderDraft"],
      queryFn: () =>
        axiosInstance.get("/OrderDrafts/Current").then((resp) => resp.data),
      retry: 5,
      retryDelay: (attemptIndex) => Math.min(300 * 2 ** attemptIndex, 2000),
    });

  const { data: userDetails } = useQuery<UserSummary | null>({
    queryKey: ["checkout-user", emailFromToken],
    enabled: typeof emailFromToken === "string" && emailFromToken.length > 0,
    queryFn: async () => {
      const users = await axiosInstance
        .get<UserSummary[]>("/Auth/users")
        .then((resp) => resp.data);

      const foundUser = users.find(
        (user) => user.email.toLowerCase() === emailFromToken.toLowerCase(),
      );

      return foundUser ?? null;
    },
  });

  const { mutate: createOrder, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
      if (!orderDraft) {
        throw new Error(
          "Missing shipping details. Please complete shipping first.",
        );
      }

      const orderResponse = await axiosInstance.post("/Orders", {
        paymentMethod: orderDraft.paymentMethod,
        status: "pending",
        addressLine: orderDraft.addressLine,
        city: orderDraft.city,
        zipCode: orderDraft.zipCode,
      });

      try {
        await axiosInstance.delete(`/OrderDrafts/${orderDraft.id}`);
      } catch {}

      return orderResponse;
    },
    onSuccess: (response) => {
      const orderId = (response.data as { id?: number })?.id;

      setErrorMessage("");
      setSuccessMessage("Order submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["currentCart"] });
      queryClient.invalidateQueries({ queryKey: ["current-orders"] });
      queryClient.invalidateQueries({ queryKey: ["currentOrderDraft"] });
      navigate("/orderconfirmed", { state: { orderId } });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<string>;
      setSuccessMessage("");
      setErrorMessage(
        axiosError.response?.data ??
          "Order could not be submitted. Please try again.",
      );
    },
  });

  const orderRows = cart?.products ?? [];

  const totalPrice = useMemo(() => {
    return orderRows.reduce((sum, row) => {
      const discountMultiplier = 1 - (row.product.discount ?? 0) / 100;
      return sum + row.product.price * discountMultiplier * row.quantity;
    }, 0);
  }, [orderRows]);

  const firstName = userDetails?.firstName ?? accountData?.firstName ?? "-";
  const lastName = userDetails?.lastName ?? accountData?.lastName ?? "-";
  const email =
    userDetails?.email ??
    (typeof emailFromToken === "string" ? emailFromToken : "-");
  const phoneNumber = userDetails?.phoneNumber ?? "-";

  if (!accountData) {
    return (
      <div className="checkout-page">
        <p className="checkout-message">Please log in to continue checkout.</p>
      </div>
    );
  }

  if (cartLoading || orderDraftLoading) {
    return (
      <div className="checkout-page">
        <p className="checkout-message">Loading checkout details...</p>
      </div>
    );
  }

  if (!cart || orderRows.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p className="checkout-message">Your cart is empty.</p>
      </div>
    );
  }

  if (!orderDraft) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p className="checkout-message">
          Shipping details are missing. Please complete shipping first.
        </p>
      </div>
    );
  }

  return (
    <main className="checkout-page">
      <p className="checkout-pagetitle">Checkout</p>

      <div className="checkout-top-grid">
        <section className="checkout-card">
          <p className="checkout-card-titles">Your Information</p>
          <div className="checkout-info-grid">
            <p className="checkout-informationcard-infotitle">
              <strong>Name:</strong> {firstName} {lastName}
            </p>
            <p className="checkout-informationcard-infotitle">
              <strong>Email:</strong> {email}
            </p>
            <p className="checkout-informationcard-infotitle">
              <strong>Phone number:</strong> {phoneNumber}
            </p>
          </div>
        </section>

        <section className="checkout-card">
          <p className="checkout-card-titles">Shipping</p>
          <div className="checkout-info-grid">
            <p className="checkout-informationcard-infotitle">
              <strong>Payment:</strong> {orderDraft.paymentMethod}
            </p>
            <p className="checkout-informationcard-infotitle">
              <strong>Address:</strong> {orderDraft.zipCode}, {orderDraft.city},{" "}
              {orderDraft.addressLine}
            </p>
          </div>
        </section>
      </div>

      <section className="checkout-card">
        <p className="checkout-card-titles">Ordered Products</p>
        <div className="checkout-products">
          {orderRows.map((item) => {
            const hasDiscount = (item.product.discount ?? 0) > 0;
            const originalLineTotal = item.product.price * item.quantity;
            const unitPrice =
              item.product.price * (1 - (item.product.discount ?? 0) / 100);
            const lineTotal = unitPrice * item.quantity;

            return (
              <article className="checkout-product-row" key={item.product.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="checkout-product-content">
                  <p className="checkout-product-name">{item.product.name}</p>
                  <p>
                    {formatProductSpecs(item.product.specs as ProductSpecs)}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="checkout-product-price">
                  {hasDiscount && (
                    <p className="checkout-original-price">
                      {formatPrice(originalLineTotal)} Ft
                    </p>
                  )}
                  <p className={hasDiscount ? "checkout-discounted-price" : ""}>
                    {formatPrice(lineTotal)} Ft
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="checkout-total-row">
          <p className="checkout-total-label">Total</p>
          <p className="checkout-total-price">{formatPrice(totalPrice)} Ft</p>
        </div>

        <button
          type="button"
          className="checkout-order-button"
          onClick={() => createOrder()}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing order..." : "Order"}
        </button>

        {errorMessage && <p className="checkout-error">{errorMessage}</p>}
        {successMessage && <p className="checkout-success">{successMessage}</p>}
      </section>
    </main>
  );
}

export default Checkout;
