import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerView({ products }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addToCart(product) {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = savedCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("🛒 Product Added to Cart!");
  }

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
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: "0 0 15px 0" }}>
          🛍️ Shopify Store
        </h1>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            fontSize: "16px",
          }}
        />
      </div>

      {/* PRODUCTS */}

      <h2>Today's Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "15px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            {/* IMAGE */}

            <Link
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                }}
              />

              <h3
                style={{
                  minHeight: "50px",
                  marginBottom: "8px",
                }}
              >
                {product.name}
              </h3>
            </Link>

            {/* RATING */}

            <p style={{ margin: "5px 0" }}>
              ⭐⭐⭐⭐⭐{" "}
              <span style={{ color: "#666" }}>
                (4.5)
              </span>
            </p>

            {/* PRICE + UNIT */}

            <div
              style={{
                margin: "10px 0",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                ₹{product.price.toLocaleString()}
              </span>

              <span
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginLeft: "8px",
                }}
              >
                / {product.unit || "1 Piece"}
              </span>
            </div>

            {/* STOCK */}

            <p
              style={{
                color:
                  product.stock > 0
                    ? "green"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {product.stock > 0
                ? `✓ In Stock (${product.stock})`
                : "✕ Out of Stock"}
            </p>

            {/* VIEW PRODUCT */}

            <Link to={`/product/${product.id}`}>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #888",
                  borderRadius: "6px",
                  background: "white",
                  cursor: "pointer",
                  marginBottom: "8px",
                }}
              >
                View Product
              </button>
            </Link>

            {/* ADD TO CART */}

            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                background:
                  product.stock > 0
                    ? "#ffd814"
                    : "#ccc",
                cursor:
                  product.stock > 0
                    ? "pointer"
                    : "not-allowed",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              🛒 Add to Cart
            </button>

            {/* BUY NOW */}

            <Link
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <button
                disabled={product.stock <= 0}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  background:
                    product.stock > 0
                      ? "#ff9900"
                      : "#ccc",
                  color: "black",
                  cursor:
                    product.stock > 0
                      ? "pointer"
                      : "not-allowed",
                  fontWeight: "bold",
                }}
              >
                ⚡ Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* MY ORDERS */}

      <div style={{ marginTop: "45px" }}>
        <h2>📦 My Orders</h2>

        {orders.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <p>No orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "white",
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{order.product}</h3>

              <p>
                <strong>Order ID:</strong>{" "}
                {order.id}
              </p>

              <p>
                <strong>Amount:</strong> ₹
                {order.amount}
              </p>

              <p>
                <strong>Delivery Status:</strong>{" "}
                {order.status === "Pending" &&
                  "⏳ Pending"}

                {order.status === "Shipped" &&
                  "🚚 Shipped"}

                {order.status === "Delivered" &&
                  "✅ Delivered"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerView;