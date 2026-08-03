import { useState } from "react";

function Customers() {

  const [customers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      orders: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Patil",
      email: "priya@gmail.com",
      phone: "8765432109",
      orders: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "7654321098",
      orders: 2,
      status: "Inactive",
    },
  ]);

  return (
    <div>
      <h1>Customers Page</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Orders</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.orders}</td>
              <td>{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;