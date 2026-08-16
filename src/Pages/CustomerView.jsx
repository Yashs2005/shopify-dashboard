import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerView({ products }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);
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

    setCartItems(updatedCart);

    alert("🛒 Product Added to Cart!");
  }

  return (
    <div
      className="customer-view"
      style={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <div
        className="customer-header"
        style={{
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: "0 0 15px 0" }}>
          🛍️ NexaCart
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
            className="customer-product-card"
            style={{
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
                className="customer-product-name"
                style={{
                  minHeight: "50px",
                  marginBottom: "8px",
                }}
              >
                {product.name}
              </h3>
            </Link>

            {/* RATING */}

            <p
              className="customer-rating"
              style={{ margin: "5px 0" }}
            >
              ⭐⭐⭐⭐⭐{" "}
              <span>(4.5)</span>
            </p>

            {/* PRICE + UNIT */}

            <div
              style={{
                margin: "10px 0",
              }}
            >
              <span
                className="customer-price"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                ₹{product.price.toLocaleString()}
              </span>

              <span
                className="customer-unit"
                style={{
                  fontSize: "15px",
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

            <Link
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <button
                className="view-product-btn"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #888",
                  borderRadius: "6px",
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
                color: "black",
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

            {/* GO TO CART */}

            {cartItems.some(
              (item) => item.id === product.id
            ) && (
              <Link
                to="/cart"
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#2e7d32",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  🛒 Go to Cart
                </button>
              </Link>
            )}

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

      <div
        className="customer-orders"
        style={{ marginTop: "45px" }}
      >
        <h2>📦 My Orders</h2>

        {orders.length === 0 ? (
          <div
            className="customer-order-card"
            style={{
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
              className="customer-order-card"
              style={{
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