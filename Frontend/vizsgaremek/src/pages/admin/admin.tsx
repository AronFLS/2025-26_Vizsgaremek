import { useState } from "react";
import ActiveOrders from "../../components/Admin/activeorders";
import PostProduct from "../../components/Admin/postproduct";
import PastOrders from "../../components/Admin/pastorders";
import "./admin.css";

function Admin() {
  const [activeSection, setActiveSection] = useState<
    "postproduct" | "orders" | "pastorders"
  >("postproduct");

  return (
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
      </div>

      {activeSection === "postproduct" && <PostProduct />}
      {activeSection === "orders" && <ActiveOrders />}
      {activeSection === "pastorders" && <PastOrders />}
    </>
  );
}

export default Admin;
