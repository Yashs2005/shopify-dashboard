import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
  if (
    email === "admin@gmail.com" &&
    password === "admin123"
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("adminName", "Admin");
    localStorage.setItem(
      "adminEmail",
      "admin@gmail.com"
    );
    localStorage.setItem(
      "adminPassword",
      "admin123"
    );

    alert("Login Successful");
    navigate("/");
  } else {
    alert("Invalid Email or Password");
  }
}

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Shopify Dashboard Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;