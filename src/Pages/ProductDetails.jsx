import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedProducts =
      localStorage.getItem("products");

    if (savedProducts) {
      const products = JSON.parse(savedProducts);

      const foundProduct = products.find(
        (p) => p.id === Number(id)
      );

      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  // Add to Cart
  const handleAddToCart = () => {
    const cart = [
      {
        ...product,
        quantity,
      },
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("✅ Product added to Cart");

    navigate("/cart");
  };

  // Buy Now
  const handleBuyNow = () => {
    const buyNowCart = [
      {
        ...product,
        quantity,
      },
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(buyNowCart)
    );

    navigate("/checkout", {
      state: {
        cart: buyNowCart,
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "30px",
        alignItems: "flex-start",
        background: "#f3f3f3",
        minHeight: "100vh",
      }}
    >
      {/* LEFT SIDE IMAGE */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* RIGHT SIDE DETAILS */}

      <div
        style={{
          flex: 1,
          background: "white",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h1>{product.name}</h1>

        <p
          style={{
            color: "#e47911",
            fontSize: "18px",
          }}
        >
          ⭐⭐⭐⭐⭐ 4.5 (2,340 ratings)
        </p>

        <hr />

        {/* PRICE */}

        <h2
          style={{
            color: "#B12704",
            fontSize: "30px",
            marginBottom: "5px",
          }}
        >
          ₹{product.price.toLocaleString()}
        </h2>

        {/* UNIT */}

        <p
          style={{
            fontSize: "17px",
            color: "#555",
            fontWeight: "bold",
            marginTop: "5px",
          }}
        >
          📦 Price: ₹
          {product.price.toLocaleString()} /{" "}
          {product.unit || "1 Piece"}
        </p>

        <p>Inclusive of all taxes</p>

        {/* STOCK */}

        <p
          style={{
            color:
              product.stock > 0
                ? "green"
                : "red",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {product.stock > 0
            ? `✅ In Stock (${product.stock} available)`
            : "❌ Out of Stock"}
        </p>

        <hr />

        {/* QUANTITY */}

        <h3>Quantity</h3>

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
            style={{
              padding: "8px 15px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ➖
          </button>

          <span
            style={{
              margin: "0 20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {quantity}
          </span>

          <button
            onClick={() =>
              quantity < product.stock &&
              setQuantity(quantity + 1)
            }
            style={{
              padding: "8px 15px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ➕
          </button>
        </div>

        {/* TOTAL */}

        <h2>
          Total: ₹
          {(product.price * quantity).toLocaleString()}
        </h2>

        <p
          style={{
            color: "#555",
          }}
        >
          {quantity} × {product.unit || "1 Piece"}
        </p>

        {/* ADD TO CART */}

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          style={{
            background:
              product.stock > 0
                ? "#FFD814"
                : "#ccc",
            border: "none",
            padding: "14px 30px",
            borderRadius: "30px",
            cursor:
              product.stock > 0
                ? "pointer"
                : "not-allowed",
            marginRight: "15px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          🛒 Add to Cart
        </button>

        {/* BUY NOW */}

        <button
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          style={{
            background:
              product.stock > 0
                ? "#FFA41C"
                : "#ccc",
            border: "none",
            padding: "14px 30px",
            borderRadius: "30px",
            cursor:
              product.stock > 0
                ? "pointer"
                : "not-allowed",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ⚡ Buy Now
        </button>

        <br />
        <br />

        {/* BACK BUTTON */}

        <Link to="/customer-view">
          <button
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            ⬅ Back to Customer View
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;