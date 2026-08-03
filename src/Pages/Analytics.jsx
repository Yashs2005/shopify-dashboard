import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const sales = [
    { month: "January", revenue: 45000, orders: 25 },
    { month: "February", revenue: 52000, orders: 32 },
    { month: "March", revenue: 61000, orders: 40 },
    { month: "April", revenue: 70000, orders: 48 },
  ];
    const productData = [
  { name: "iPhone 16", value: 45 },
  { name: "Samsung S25", value: 30 },
  { name: "OnePlus 13", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = ["#008060", "#36A2EB", "#FFCE56", "#FF6384"];
const filteredSales =
  selectedMonth === "All"
    ? sales
    : sales.filter((item) => item.month === selectedMonth);
  return (
    <div className="page">
      <h1>📊 Analytics Dashboard</h1>
      <p>Sales and Orders Overview</p>
      <div style={{ margin: "20px 0" }}>
       <label style={{ marginRight: "10px", fontWeight: "bold" }}>
         Select Month:
       </label>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{
        padding: "8px",
        borderRadius: "6px",
      }}
    >
    <option value="All">All</option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
  </select>
</div>

      <div className="cards">
        <div className="card">
          <h3>Total Sales</h3>
          <h2>₹4,85,000</h2>
        </div>

        <div className="card">
          <h3>Monthly Revenue</h3>
          <h2>₹1,25,000</h2>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <h2>180</h2>
        </div>

        <div className="card">
          <h3>Top Product</h3>
          <h2>iPhone 16</h2>
        </div>

        <div className="card">
          <h3>Average Order Value</h3>
          <h2>₹2,694</h2>
        </div>
      </div>

      <h2>Revenue Chart</h2>

      <div
        style={{
          width: "100%",
          height: 350,
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredSales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#008060" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Orders Trend</h2>

      <div
        style={{
          width: "100%",
          height: 350,
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredSales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#008060"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
 <h2>Product Sales Distribution</h2>

<div
  style={{
    width: "100%",
    height: 350,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  }}
>
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={productData}
        dataKey="value"
        nameKey="name"
        outerRadius={120}
        label
      >
        {productData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  }}
>
  <h2>Monthly Sales Report</h2>

  <button
    onClick={() => alert("Sales Report Exported Successfully!")}
    style={{
      background: "#008060",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Export Report
  </button>
</div>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Orders</th>
          </tr>
        </thead>

        <tbody>
          {filteredSales.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>₹{item.revenue.toLocaleString()}</td>
              <td>{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;