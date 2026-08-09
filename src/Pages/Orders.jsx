import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 3;

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  const filteredOrders = orders.filter((order) => {
    const customer =
      order.customer || "";

    const product =
      order.product || "";

    const status =
      order.status || "Pending";

    return (
      (
        customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product
          .toLowerCase()
          .includes(search.toLowerCase())
      ) &&
      (
        filterStatus === "All" ||
        status === filterStatus
      )
    );
  });

  const lastOrder =
    currentPage * ordersPerPage;

  const firstOrder =
    lastOrder - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      firstOrder,
      lastOrder
    );

  const totalPages =
    Math.ceil(
      filteredOrders.length /
        ordersPerPage
    ) || 1;

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>📦 Orders Page</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="🔍 Search customer or product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* STATUS FILTER */}

      <select
        value={filterStatus}
        onChange={(e) => {
          setFilterStatus(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          marginLeft: "10px",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        <option value="All">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">
          Delivered
        </option>
      </select>

      <br />
      <br />

      {/* ORDERS */}

      {currentOrders.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h3>📭 No orders found.</h3>
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#131921",
                  color: "white",
                }}
              >
                <th style={{ padding: "12px" }}>
                  Order ID
                </th>

                <th style={{ padding: "12px" }}>
                  Customer
                </th>

                <th style={{ padding: "12px" }}>
                  Product
                </th>

                <th style={{ padding: "12px" }}>
                  Price
                </th>

                <th style={{ padding: "12px" }}>
                  Unit
                </th>

                <th style={{ padding: "12px" }}>
                  Quantity
                </th>

                <th style={{ padding: "12px" }}>
                  Total
                </th>

                <th style={{ padding: "12px" }}>
                  Status
                </th>

                <th style={{ padding: "12px" }}>
                  Update Status
                </th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  {/* ORDER ID */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    #{order.id}
                  </td>

                  {/* CUSTOMER */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {order.customer ||
                      "Admin"}
                  </td>

                  {/* PRODUCT */}

                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.product}
                  </td>

                  {/* PRICE */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    ₹
                    {(order.price ||
                      order.amount ||
                      0
                    ).toLocaleString()}
                  </td>

                  {/* UNIT */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    📦{" "}
                    {order.unit ||
                      "1 Piece"}
                  </td>

                  {/* QUANTITY */}

                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    {order.quantity ||
                      1}
                  </td>

                  {/* TOTAL */}

                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹
                    {(
                      order.amount || 0
                    ).toLocaleString()}
                  </td>

                  {/* STATUS */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    <span
                      style={{
                        padding:
                          "6px 10px",
                        borderRadius:
                          "15px",
                        fontWeight:
                          "bold",
                        background:
                          order.status ===
                          "Delivered"
                            ? "#d4edda"
                            : order.status ===
                              "Shipped"
                            ? "#cce5ff"
                            : "#fff3cd",
                        color:
                          order.status ===
                          "Delivered"
                            ? "green"
                            : order.status ===
                              "Shipped"
                            ? "#0056b3"
                            : "#856404",
                      }}
                    >
                      {order.status ===
                        "Pending" &&
                        "⏳ "}

                      {order.status ===
                        "Shipped" &&
                        "🚚 "}

                      {order.status ===
                        "Delivered" &&
                        "✅ "}

                      {order.status ||
                        "Pending"}
                    </span>
                  </td>

                  {/* UPDATE STATUS */}

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {order.status ===
                      "Pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order.id,
                            "Shipped"
                          )
                        }
                        style={{
                          background:
                            "#007bff",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "8px 12px",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                        }}
                      >
                        🚚 Mark Shipped
                      </button>
                    )}

                    {order.status ===
                      "Shipped" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order.id,
                            "Delivered"
                          )
                        }
                        style={{
                          background:
                            "#28a745",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "8px 12px",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                        }}
                      >
                        ✅ Mark Delivered
                      </button>
                    )}

                    {order.status ===
                      "Delivered" && (
                      <span
                        style={{
                          color:
                            "green",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}

      {filteredOrders.length > 0 && (
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            disabled={currentPage === 1}
            style={{
              padding: "8px 15px",
              cursor:
                currentPage === 1
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            ⬅ Previous
          </button>

          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Page {currentPage} of{" "}
            {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
            style={{
              padding: "8px 15px",
              cursor:
                currentPage ===
                totalPages
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;