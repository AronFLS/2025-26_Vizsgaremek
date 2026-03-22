import { useState } from "react";
import Orders from "../../components/Admin/orders";
import PostProduct from "../../components/Admin/postproduct";
import "./admin.css";

function Admin() {
  const [activeSection, setActiveSection] = useState<"postproduct" | "orders">(
    "postproduct",
  );

  return (
    <>
      <div className="admin-buttons">
        <button
          className={`postproduct-btn ${
            activeSection === "postproduct" ? "btn-active" : "btn-inactive"
          }`}
          onClick={() => setActiveSection("postproduct")}
        >
          PostProduct
        </button>
        <button
          className={`orders-btn ${
            activeSection === "orders" ? "btn-active" : "btn-inactive"
          }`}
          onClick={() => setActiveSection("orders")}
        >
          orders
        </button>
      </div>

      {activeSection === "postproduct" && <PostProduct />}
      {activeSection === "orders" && <Orders />}
    </>
  );
}

export default Admin;
