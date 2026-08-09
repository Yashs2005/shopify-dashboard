import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart =
    location.state?.cart ||
    JSON.parse(localStorage.getItem("cart")) ||
    [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuy = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrders = cart.map((item) => ({
      id: Date.now() + item.id,
      customer: "Admin",
      product: item.name,
      amount: item.price * item.quantity,
      quantity: item.quantity,
      unit: item.unit || "1 Piece",
      price: item.price,
      status: "Pending",
      orderDate: new Date().toISOString(),
    }));

    const updatedOrders = [
      ...oldOrders,
      ...newOrders,
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    localStorage.removeItem("cart");

    alert("✅ Order Placed Successfully!");

    navigate("/customer-view");
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f3f3",
        minHeight: "100vh",
      }}
    >
      <h1>🛒 Checkout</h1>

      {cart.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h3>Your cart is empty.</h3>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h2>{item.name}</h2>

              <p>
                <strong>Price:</strong> ₹
                {item.price.toLocaleString()}
              </p>

              <p>
                <strong>Unit:</strong>{" "}
                {item.unit || "1 Piece"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {item.quantity}
              </p>

              <p
                style={{
                  color: "#555",
                  fontWeight: "bold",
                }}
              >
                {item.quantity} ×{" "}
                {item.unit || "1 Piece"}
              </p>

              <h3>
                Product Total: ₹
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </h3>
            </div>
          ))}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h2>
              Grand Total: ₹
              {total.toLocaleString()}
            </h2>

            <button
              onClick={handleBuy}
              style={{
                background: "#FFD814",
                border: "none",
                padding: "14px 30px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              💳 Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;