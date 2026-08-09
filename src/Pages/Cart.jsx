import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const qty =
          type === "plus"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return {
          ...item,
          quantity: qty,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: "25px",
        background: "#f3f3f3",
        minHeight: "100vh",
      }}
    >
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>Your cart is empty.</h2>

          <Link to="/customer-view">
            <button
              style={{
                padding: "12px 25px",
                background: "#FFD814",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🛍️ Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                background: "white",
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              {/* PRODUCT IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "contain",
                }}
              />

              {/* PRODUCT DETAILS */}

              <div style={{ flex: 1 }}>
                <h2>{item.name}</h2>

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#B12704",
                  }}
                >
                  ₹{item.price.toLocaleString()}
                </p>

                <p
                  style={{
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  📦 ₹{item.price.toLocaleString()} /{" "}
                  {item.unit || "1 Piece"}
                </p>

                {/* QUANTITY */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "15px 0",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "minus"
                      )
                    }
                    style={{
                      padding: "7px 14px",
                      cursor: "pointer",
                    }}
                  >
                    ➖
                  </button>

                  <span
                    style={{
                      margin: "0 18px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "plus"
                      )
                    }
                    style={{
                      padding: "7px 14px",
                      cursor: "pointer",
                    }}
                  >
                    ➕
                  </button>
                </div>

                {/* TOTAL */}

                <h3>
                  Product Total: ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </h3>

                <p style={{ color: "#666" }}>
                  {item.quantity} ×{" "}
                  {item.unit || "1 Piece"}
                </p>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeProduct(item.id)
                  }
                  style={{
                    background: "#ffdddd",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#b00000",
                    fontWeight: "bold",
                  }}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          {/* GRAND TOTAL */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              marginTop: "25px",
            }}
          >
            <h2>
              Grand Total: ₹
              {total.toLocaleString()}
            </h2>

            <Link to="/checkout">
              <button
                style={{
                  background: "#FFA41C",
                  padding: "14px 30px",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                💳 Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;