import { useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import "./UsersOrders.css";

interface OrderProduct {
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export interface AccountOrder {
  id: number;
  paymentMethod: string;
  status: string;
  addressLine: string;
  city: string;
  zipCode: string;
  active: boolean;
  products: OrderProduct[];
}

interface ActiveOrdersProps {
  orders: AccountOrder[];
  isLoading: boolean;
  errorMessage: string;
}

const getOrderTotal = (order: AccountOrder) => {
  return order.products.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};

function UserActiveOrders({
  orders,
  isLoading,
  errorMessage,
}: ActiveOrdersProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number) => {
    setExpandedOrderId((current) => (current === id ? null : id));
  };

  return (
    <section className="accountdetails-orders-section">
      <div className="accountdetails-section-header">
        <p className="accountdetails-header-title">Active Orders</p>
        <p className="accountdetails-header-subtitle">
          Track your ongoing orders and check their status.
        </p>
      </div>

      {isLoading && <p className="orders-message">Loading active orders...</p>}

      {!isLoading && errorMessage && (
        <p className="orders-message orders-error">{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && orders.length === 0 && (
        <p className="orders-message">No active orders.</p>
      )}

      {!isLoading && !errorMessage && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <article key={order.id} className="order-summary-card">
                <div className="order-summary-top">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{order.products.length} product(s)</p>
                  </div>
                  <span className="order-status-chip">{order.status}</span>
                </div>

                <div className="order-summary-meta">
                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                </div>

                <button
                  type="button"
                  className="toggle-order-btn"
                  onClick={() => toggleOrder(order.id)}
                >
                  {isExpanded ? "Hide details" : "View details"}
                </button>

                {isExpanded && (
                  <div className="order-details-panel">
                    <p>
                      <strong>Shipping address:</strong> {order.zipCode},{" "}
                      {order.city}, {order.addressLine}
                    </p>

                    <div className="order-products-grid">
                      {order.products.map((item) => (
                        <div
                          key={item.product.id}
                          className="order-product-item"
                        >
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>
                            {formatPrice(item.product.price * item.quantity)} Ft
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="order-total-row">
                      Total:{" "}
                      <strong>{formatPrice(getOrderTotal(order))} Ft</strong>
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default UserActiveOrders;
