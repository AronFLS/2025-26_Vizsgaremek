import { useState } from "react";
import ActiveOrders from "../../components/admin/active-orders/ActiveOrders";
import PostProduct from "../../components/admin/post-products/PostProduct";
import PastOrders from "../../components/admin/past-orders/PastOrders";
import UpdateProducts from "../../components/admin/update-products/UpdateProducts";
import "./Admin.css";
import { useAccount } from "../../hooks/useAccount";

function Admin() {
  const [activeSection, setActiveSection] = useState<
    "postproduct" | "orders" | "pastorders" | "updateproducts"
  >("postproduct");
  const { isAdmin } = useAccount();

  return (
    <div>
      {!isAdmin ? (
        <p style={{ textAlign: "center" }}>you aren't an admin</p>
      ) : (
        <>
          <div className="admin-buttons">
            <button
              className={`postproduct-btn ${
                activeSection === "postproduct" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => setActiveSection("postproduct")}
            >
              Post Product/Spec
            </button>
            <button
              className={`orders-btn ${
                activeSection === "orders" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => setActiveSection("orders")}
            >
              ActiveOrders
            </button>
            <button
              className={`past-orders-btn ${
                activeSection === "pastorders" ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => setActiveSection("pastorders")}
            >
              PastOrders
            </button>
            <button
              className={`update-products-btn ${
                activeSection === "updateproducts"
                  ? "btn-active"
                  : "btn-inactive"
              }`}
              onClick={() => setActiveSection("updateproducts")}
            >
              UpdateProducts
            </button>
          </div>

          {activeSection === "postproduct" && <PostProduct />}
          {activeSection === "orders" && <ActiveOrders />}
          {activeSection === "pastorders" && <PastOrders />}
          {activeSection === "updateproducts" && <UpdateProducts />}
        </>
      )}
    </div>
  );
}

export default Admin;
