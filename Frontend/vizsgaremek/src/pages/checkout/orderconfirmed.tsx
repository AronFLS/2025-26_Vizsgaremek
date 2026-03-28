import { useLocation } from "react-router-dom";
import "./orderconfirmed.css";

interface OrderConfirmedState {
  orderId?: number;
}

function OrderConfirmed() {
  const location = useLocation();
  const orderId = (location.state as OrderConfirmedState | null)?.orderId;

  return (
    <div className="order-confirmed-container">
      <h1 className="order-confirmed-title">Thank you for your order!</h1>
      <p className="order-confirmed-message">
        Your order has been successfully placed. We will process it shortly.
      </p>
      <p className="order-confirmed-order-id">
        Order number: <strong>#{orderId ?? "-"}</strong>
      </p>
    </div>
  );
}
export default OrderConfirmed;
