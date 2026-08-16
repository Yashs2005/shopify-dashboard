import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Layout({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
   };
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
  "📦 New product added",
  "🛒 New order received",
  "👤 New customer registered",
   ]);

  return (
    <div className={darkMode ? "app dark" :"app"}>
      <header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Shopify Dashboard</h1>
          <p>Welcome to Admin Panel</p>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            🔔 {notifications.length}
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50px",
                background: "white",
                color: "black",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                width: "250px",
                zIndex: 100,
              }}
            >
              <h4>Notifications</h4>
                {notifications.map((item, index) => (
                <p key={index}>{item}</p>
                ))}
            </div>
          )}
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h2>Shopify</h2>

          <ul>
          <li
            style={{
            background:
            location.pathname === "/"
            ? "rgba(255,255,255,0.25)"
            : "",
            }}
          >
            <Link to="/">🏠 Dashboard</Link>
          </li>

          <li
            style={{
            background:
            location.pathname === "/products"
            ? "rgba(255,255,255,0.25)"
            : "",
            }}
          >
            <Link to="/products">📦 Products</Link>
         </li>

         <li
          style={{
          background:
          location.pathname === "/orders"
          ? "rgba(255,255,255,0.25)"
          : "",
          }}
         >
          <Link to="/orders">🛒 Orders</Link>
        </li>

        <li
         style={{
         background:
         location.pathname === "/customers"
         ? "rgba(255,255,255,0.25)"
         : "",
         }}
       >
           <Link to="/customers">👥 Customers</Link>
       </li>

       <li
          style={{
          background:
          location.pathname === "/customer-view"
          ? "rgba(255,255,255,0.25)"
          : "",
          }}
       >
            <Link to="/customer-view">🛍️ Customer View</Link>
       </li>

       <li
        style={{
        background:
        location.pathname === "/analytics"
        ? "rgba(255,255,255,0.25)"
        : "",
        }}
      >
         <Link to="/analytics">📊 Analytics</Link>
      </li>

      <li
        style={{
        background:
        location.pathname === "/settings"
        ? "rgba(255,255,255,0.25)"
        : "",
        }}
      >
        <Link to="/settings">⚙️ Settings</Link>
      </li>

          <button onClick={() => setDarkMode(!darkMode)}>
             {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
             Logout
          </button>
          </ul>
        </aside>

        <main className="content">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;