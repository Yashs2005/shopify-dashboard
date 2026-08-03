import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ products, loading }) {
  const totalOrders=180;
  const totalRevenue=250000;
  const totalStock = products.reduce(
    (total, product) => total + product.stock, 0 );

  const lowStockProducts = products.filter(
    (product) => product.stock < 20 );

  const [search, setSearch] = useState("");
  const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  ];
  
  const notifications = [
  "📦 2 products are low in stock",
  "🛒 5 new orders received",
  "👤 3 new customers registered",
  "💰 Revenue increased by 12% this month",
  ];

  const navigate = useNavigate();
  if (loading) {
  return <h2>Loading Dashboard...</h2>;
   }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
         Welcome to Shopify Admin Panel. Manage your products, orders and customers here.
      </p>

      <h2 style={{ marginTop: "20px" }}>Notifications</h2>

       <ul
        style={{
        background: "#fff3cd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        }}
       >
        {notifications.map((item, index) => (
          <li key={index}>{item}</li>
           ))}
      </ul>

      <div className="cards">
        <div className="card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="card">
          <h3>Customers</h3>
          <h2>95</h2>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <h2>{totalRevenue}</h2>
        </div>

        <div className="card">
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <h2>{lowStockProducts.length}</h2>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={() =>
            alert("Go to Products page to add a new product.")
          }
        >
          Add Product
        </button>

        <button
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/products")}
        >
          View Products
        </button>

        <button onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>

      <h2>Recent Products</h2>

      <Link to="/products">
        <button style={{ marginBottom: "15px" }}>
          View All Products
        </button>
      </Link>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th> 
          </tr>
        </thead>

        <tbody>
          {products
            .filter((product) =>
              product.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .slice(0, 5)
            .map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="50"
                    height="50"
                    style={{ borderRadius: "8px" }}
                  />
                </td>

                <td>
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </td>

                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                   <Link to={`/product/${product.id}`}>
                   <button>View</button>
                   </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {lowStockProducts.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Low Stock Alert</h2>

          <ul>
            {lowStockProducts.map((product) => (
              <li key={product.id}>
                {product.name} - Only {product.stock} left
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 style={{ marginTop: "40px" }}>Sales Analytics</h2>

     <div style={{ width: "100%", height: 300, marginBottom: "30px" }}>
     <ResponsiveContainer width="100%" height="100%">
       <BarChart data={salesData}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Bar dataKey="sales" fill="#3b82f6" />
       </BarChart>
     </ResponsiveContainer>
    </div>

 <h2 style={{ marginTop: "40px" }}>Recent Activity</h2>

<ul
  style={{
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  }}
>
  <li>✅ New product added: iPhone 16</li>
  <li>🛒 Order #1005 placed by Karan</li>
  <li>📦 Samsung S25 stock updated</li>
  <li>👤 New customer registered: Anjali</li>
  <li>💰 Payment received: ₹89,999</li>
</ul>

 <h2 style={{ marginTop: "40px" }}>Quick Actions</h2>

<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <button onClick={() => navigate("/products")}>
    📦 Manage Products
  </button>

  <button onClick={() => navigate("/orders")}>
    🛒 View Orders
  </button>

  <button onClick={() => navigate("/customers")}>
    👥 Customers
  </button>

  <button onClick={() => navigate("/analytics")}>
    📊 Analytics
  </button>
</div>

      <h2 style={{ marginTop: "40px" }}>Recent Orders</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#1001</td>
            <td>Rahul</td>
            <td>iPhone 16</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              Delivered
            </td>
          </tr>

          <tr>
            <td>#1002</td>
            <td>Priya</td>
            <td>Samsung S25</td>
            <td style={{ color: "blue", fontWeight: "bold" }}>
              Shipped
            </td>
          </tr>

          <tr>
            <td>#1003</td>
            <td>Amit</td>
            <td>OnePlus 13</td>
            <td style={{ color: "orange", fontWeight: "bold" }}>
              Processing
            </td>
          </tr>

          <tr>
            <td>#1004</td>
            <td>Neha</td>
            <td>Google Pixel 10</td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              Delivered
            </td>
          </tr>

          <tr>
            <td>#1005</td>
            <td>Karan</td>
            <td>Nothing Phone 4</td>
            <td style={{ color: "red", fontWeight: "bold" }}>
              Pending
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;