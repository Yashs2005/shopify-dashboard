import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Customers() {
  const { darkMode } = useOutletContext();
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

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f3f3f3",
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
        <h1 style={{ margin: "0 0 8px 0" }}>
          👥 Customers
        </h1>

        <p style={{ margin: 0, color: "#ddd" }}>
          Manage and view your store customers
        </p>
      </div>

      {/* STAT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        {/* TOTAL */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ color: "#666" }}>
            👥 Total Customers
          </p>

          <h2 style={{ margin: 0 }}>
            {totalCustomers}
          </h2>
        </div>

        {/* ACTIVE */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ color: "#666" }}>
            🟢 Active Customers
          </p>

          <h2
            style={{
              margin: 0,
              color: "green",
            }}
          >
            {activeCustomers}
          </h2>
        </div>

        {/* INACTIVE */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ color: "#666" }}>
            🔴 Inactive Customers
          </p>

          <h2
            style={{
              margin: 0,
              color: "#d32f2f",
            }}
          >
            {inactiveCustomers}
          </h2>
        </div>
      </div>

      {/* SEARCH */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search customer by name, email or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "7px",
            border: "1px solid #ccc",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* CUSTOMER TABLE */}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflowX: "auto",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "750px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#131921",
                color: "white",
              }}
            >
              <th style={{ padding: "14px" }}>
                ID
              </th>

              <th style={{ padding: "14px" }}>
                Customer
              </th>

              <th style={{ padding: "14px" }}>
                Email
              </th>

              <th style={{ padding: "14px" }}>
                Phone
              </th>

              <th style={{ padding: "14px" }}>
                Total Orders
              </th>

              <th style={{ padding: "14px" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  <h3>
                    🔍 No customers found
                  </h3>
                </td>
              </tr>
            ) : (
              filteredCustomers.map(
                (customer) => (
                  <tr
                    key={customer.id}
                    style={{
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px",
                        textAlign: "center",
                      }}
                    >
                      #{customer.id}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      👤 {customer.name}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                      }}
                    >
                      {customer.email}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                      }}
                    >
                      📱 {customer.phone}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      📦 {customer.orders}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontWeight: "bold",
                          background:
                            customer.status ===
                            "Active"
                              ? "#d4edda"
                              : "#f8d7da",
                          color:
                            customer.status ===
                            "Active"
                              ? "green"
                              : "#b00020",
                        }}
                      >
                        {customer.status ===
                        "Active"
                          ? "🟢 Active"
                          : "🔴 Inactive"}
                      </span>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

{/* FOOTER */}

<div
  style={{
    marginTop: "20px",
    padding: "15px 20px",
    color: darkMode ? "#ffffff" : "#222222",
    background: darkMode ? "#1e1e1e" : "#f3f3f3",
    fontSize: "16px",
    fontWeight: "normal",
    textAlign: "left",
    borderRadius: "8px",
  }}
>
  Showing{" "}
  <strong style={{ color: darkMode ? "#ffffff" : "#222222" }}>
    {filteredCustomers.length}
  </strong>{" "}
  of{" "}
  <strong style={{ color: darkMode ? "#ffffff" : "#222222" }}>
    {totalCustomers}
  </strong>{" "}
  customers
</div>
    </div>
  );
}

export default Customers;