import { useState } from "react";
import type { AccountOrder } from "./activeorders";
import "./activeorders.css";

interface PastOrdersProps {
  orders: AccountOrder[];
  isLoading: boolean;
  errorMessage: string;
}

const getOrderTotal = (order: AccountOrder) => {
  return order.products.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};

function PastOrders({ orders, isLoading, errorMessage }: PastOrdersProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number) => {
    setExpandedOrderId((current) => (current === id ? null : id));
  };

  return (
    <section className="account-past-orders-section">
      <div className="account-section-header">
        <h2>Past Orders</h2>
        <p>See completed or archived orders from your history.</p>
      </div>

      {isLoading && <p className="orders-message">Loading past orders...</p>}

      {!isLoading && errorMessage && (
        <p className="orders-message orders-error">{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && orders.length === 0 && (
        <p className="orders-message">No past orders.</p>
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
                  <span className="order-status-chip order-status-chip-muted">
                    {order.status}
                  </span>
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
                            {(item.product.price * item.quantity).toFixed(0)}Ft
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="order-total-row">
                      Total:{" "}
                      <strong>{getOrderTotal(order).toFixed(0)}Ft</strong>
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

export default PastOrders;
