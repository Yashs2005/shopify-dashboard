import { useState } from "react";

function Orders() {
  const [orders] = useState([
    {
      id: 101,
      customer: "Rahul Sharma",
      product: "iPhone 16",
      amount: 79999,
      status: "Pending",
    },
    {
      id: 102,
      customer: "Priya Patil",
      product: "Samsung S25",
      amount: 74999,
      status: "Shipped",
    },
    {
      id: 103,
      customer: "Amit Kumar",
      product: "Laptop",
      amount: 65999,
      status: "Delivered",
    },
    {
      id: 104,
      customer: "Sneha Joshi",
      product: "Headphones",
      amount: 2999,
      status: "Pending",
    },
    {
      id: 105,
      customer: "Rohit Singh",
      product: "Smart Watch",
      amount: 4999,
      status: "Delivered",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 3;

  const filteredOrders = orders.filter((order) => {
    return (
      (order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "All" || order.status === filterStatus)
    );
  });

  const lastOrder = currentPage * ordersPerPage;
  const firstOrder = lastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(firstOrder, lastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div>
      <h1>Orders Page</h1>

      <input
        type="text"
        placeholder="Search customer or product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <select
        value={filterStatus}
        onChange={(e) => {
          setFilterStatus(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>₹{order.amount}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Orders;