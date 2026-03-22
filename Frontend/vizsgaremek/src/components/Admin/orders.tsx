import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import "./orders.css";

interface OrderProduct {
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface Order {
  id: number;
  paymentMethod: string;
  status: string;
  addressLine: string;
  city: string;
  zipCode: string;
  active?: boolean;
  userId: number;
  products: OrderProduct[];
}

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipping",
  "delivered",
  "cancelled",
] as const;

const normalizeStatus = (status: string) => status.trim().toLowerCase();

const getReadableStatus = (status: string) => {
  const normalized = normalizeStatus(status);
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const getOrderTotal = (order: Order) => {
  return order.products.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};

function Orders() {
  const queryClient = useQueryClient();
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<number, string>
  >({});
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    "",
  );

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: () => axiosInstance.get("/Orders").then((r) => r.data),
  });

  const { mutateAsync: updateOrderStatusAsync, isPending: isUpdatingStatus } =
    useMutation({
      mutationFn: async ({
        orderId,
        status,
      }: {
        orderId: number;
        status: string;
      }) => {
        return axiosInstance.put(`/Orders/Status/${orderId}`, {
          id: orderId,
          status,
        });
      },
      onSuccess: async (_, variables) => {
        setFeedbackType("success");
        setFeedbackMessage(`Order #${variables.orderId} updated successfully.`);
        await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      },
      onError: (err: unknown) => {
        const axiosErr = err as {
          response?: {
            data?: unknown;
          };
        };

        const apiMessage =
          typeof axiosErr?.response?.data === "string"
            ? axiosErr.response.data
            : undefined;

        setFeedbackType("error");
        setFeedbackMessage(
          apiMessage ?? "Status update failed. Please verify backend route.",
        );
      },
    });

  const visibleOrders = useMemo(() => {
    return (orders ?? []).filter((order) => order.active === true);
  }, [orders]);

  const handleStatusChange = (orderId: number, value: string) => {
    setFeedbackMessage("");
    setFeedbackType("");
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const submitStatusUpdate = async (order: Order) => {
    const selectedStatus =
      selectedStatuses[order.id] ?? normalizeStatus(order.status);

    await updateOrderStatusAsync({
      orderId: order.id,
      status: selectedStatus,
    });
  };

  if (isLoading) {
    return (
      <section className="orders-admin">
        <h2>Orders</h2>
        <p className="orders-info">Loading active orders...</p>
      </section>
    );
  }

  if (isError) {
    const err = error as { message?: string };

    return (
      <section className="orders-admin">
        <h2>Orders</h2>
        <p className="orders-error">
          Could not load orders. {err?.message ? `(${err.message})` : ""}
        </p>
      </section>
    );
  }

  return (
    <section className="orders-admin">
      <div className="orders-header">
        <h2>Active Orders</h2>
        <p>{visibleOrders.length} active order(s)</p>
      </div>

      {feedbackMessage && (
        <p
          className={
            feedbackType === "error" ? "orders-error" : "orders-success"
          }
        >
          {feedbackMessage}
        </p>
      )}

      {visibleOrders.length === 0 ? (
        <p className="orders-info">No active orders at the moment.</p>
      ) : (
        <div className="orders-grid">
          {visibleOrders.map((order) => {
            const normalizedCurrentStatus = normalizeStatus(order.status);
            const selectedStatus =
              selectedStatuses[order.id] ?? normalizedCurrentStatus;

            return (
              <article key={order.id} className="order-card">
                <div className="order-card-top">
                  <h3>Order #{order.id}</h3>
                  <span className="order-status-chip">
                    {getReadableStatus(order.status)}
                  </span>
                </div>

                <div className="order-meta">
                  <p>
                    <strong>User ID:</strong> {order.userId}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.zipCode}, {order.city},{" "}
                    {order.addressLine}
                  </p>
                </div>

                <div className="order-products">
                  {order.products.map((item) => (
                    <div key={item.product.id} className="order-product-row">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="order-total">
                  Total: <strong>${getOrderTotal(order).toFixed(2)}</strong>
                </p>

                <div className="order-actions">
                  <label htmlFor={`status-${order.id}`}>Change status</label>
                  <select
                    id={`status-${order.id}`}
                    value={selectedStatus}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    disabled={isUpdatingStatus}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {getReadableStatus(status)}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={
                      isUpdatingStatus ||
                      selectedStatus === normalizedCurrentStatus
                    }
                    onClick={() => void submitStatusUpdate(order)}
                  >
                    {isUpdatingStatus ? "Saving..." : "Update"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Orders;
