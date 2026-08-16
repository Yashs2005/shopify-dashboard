import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ products, loading }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  if (loading) {
    return (
      <div
        className="dashboard-page"
        style={{
          padding: "30px",
          minHeight: "100vh",
        }}
      >
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.amount || 0),
    0
  );

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) => Number(product.stock) < 20
  );

  const customers = [
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
    },
    {
      name: "Priya Patil",
      email: "priya@gmail.com",
    },
    {
      name: "Amit Kumar",
      email: "amit@gmail.com",
    },
  ];

  const totalCustomers = customers.length;

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
  ];

  const notifications = [
    `📦 ${lowStockProducts.length} products are low in stock`,
    `🛒 ${totalOrders} total orders received`,
    `👤 ${totalCustomers} customers registered`,
    `💰 Total revenue: ₹${totalRevenue.toLocaleString()}`,
  ];

  return (
    <div
      className="dashboard-page"
      style={{
        padding: "25px",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#131921",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          📊 Dashboard
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#ddd",
          }}
        >
          Welcome to Shopify Admin Panel. Manage
          your products, orders and customers here.
        </p>
      </div>

      {/* NOTIFICATIONS */}

      <h2>🔔 Notifications</h2>

      <div
        className="dashboard-notifications"
        style={{
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "25px",
        }}
      >
        {notifications.map((item, index) => (
          <p
            key={index}
            style={{
              margin: "8px 0",
            }}
          >
            {item}
          </p>
        ))}
      </div>

      {/* STAT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* PRODUCTS */}

        <div className="dashboard-card">
          <p>📦 Total Products</p>
          <h2>{products.length}</h2>
        </div>

        {/* ORDERS */}

        <div className="dashboard-card">
          <p>🛒 Total Orders</p>
          <h2>{totalOrders}</h2>
        </div>

        {/* CUSTOMERS */}

        <div className="dashboard-card">
          <p>👥 Customers</p>
          <h2>{totalCustomers}</h2>
        </div>

        {/* REVENUE */}

        <div className="dashboard-card">
          <p>💰 Revenue</p>
          <h2>
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        {/* STOCK */}

        <div className="dashboard-card">
          <p>📦 Total Stock</p>
          <h2>{totalStock}</h2>
        </div>

        {/* LOW STOCK */}

        <div className="dashboard-card">
          <p>⚠️ Low Stock</p>

          <h2
            style={{
              color:
                lowStockProducts.length > 0
                  ? "#d32f2f"
                  : "green",
            }}
          >
            {lowStockProducts.length}
          </h2>
        </div>
      </div>

      {/* SEARCH */}

      <div className="dashboard-section">
        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "100%",
            maxWidth: "500px",
            border: "1px solid #ccc",
            borderRadius: "7px",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* QUICK BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => navigate("/products")}
        >
          ➕ Add / Manage Products
        </button>

        <button
          onClick={() => navigate("/orders")}
        >
          🛒 View Orders
        </button>

        <button
          onClick={() => navigate("/customers")}
        >
          👥 Customers
        </button>

        <button
          onClick={() => navigate("/analytics")}
        >
          📊 Analytics
        </button>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          🔄 Refresh
        </button>
      </div>

      {/* RECENT PRODUCTS */}

      <div className="dashboard-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>📦 Recent Products</h2>

          <Link to="/products">
            <button>
              View All Products
            </button>
          </Link>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px",
            marginTop: "15px",
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
                ID
              </th>

              <th style={{ padding: "12px" }}>
                Image
              </th>

              <th style={{ padding: "12px" }}>
                Product
              </th>

              <th style={{ padding: "12px" }}>
                Price
              </th>

              <th style={{ padding: "12px" }}>
                Stock
              </th>

              <th style={{ padding: "12px" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts
              .slice(0, 5)
              .map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    #{product.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="55"
                      height="55"
                      style={{
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td style={{ padding: "12px" }}>
                    <Link
                      to={`/product/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </td>

                  <td style={{ padding: "12px" }}>
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        color:
                          product.stock < 20
                            ? "red"
                            : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td style={{ padding: "12px" }}>
                    <Link
                      to={`/product/${product.id}`}
                    >
                      <button>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* LOW STOCK */}

      {lowStockProducts.length > 0 && (
        <div className="dashboard-section low-stock-section">
          <h2>⚠️ Low Stock Alert</h2>

          {lowStockProducts.map(
            (product) => (
              <p key={product.id}>
                🔴 <strong>{product.name}</strong>{" "}
                — Only {product.stock} left
              </p>
            )
          )}
        </div>
      )}

      {/* SALES ANALYTICS */}

      <div className="dashboard-section">
        <h2>📈 Sales Analytics</h2>

        <div
          style={{
            width: "100%",
            height: 320,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ACTIVITY */}

      <div className="dashboard-section">
        <h2>🕒 Recent Activity</h2>

        <p>✅ New product added</p>
        <p>🛒 New order received</p>
        <p>📦 Product stock updated</p>
        <p>👤 Customer activity detected</p>
        <p>💰 Payment received</p>
      </div>

      {/* RECENT ORDERS */}

      <div className="dashboard-section">
        <h2>🛒 Recent Orders</h2>

        {orders.length === 0 ? (
          <p>
            No orders yet. Place an order from
            Customer View.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "650px",
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
                  Amount
                </th>

                <th style={{ padding: "12px" }}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: "12px" }}>
                      #{order.id}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {order.customer}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {order.product}
                    </td>

                    <td style={{ padding: "12px" }}>
                      ₹
                      {Number(
                        order.amount || 0
                      ).toLocaleString()}
                    </td>

                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          color:
                            order.status ===
                            "Delivered"
                              ? "green"
                              : order.status ===
                                "Shipped"
                              ? "blue"
                              : "orange",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;