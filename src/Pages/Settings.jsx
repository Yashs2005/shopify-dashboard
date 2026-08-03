import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="page">
      <h1>Settings</h1>

      <div className="card">
        <h3>Profile Settings</h3>

        <p>Name: {name}</p>
        <input
          type="text"
          placeholder="Enter Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />

        <p>Email: {email}</p>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "8px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />

        <button>Change Password</button>

        <br />
        <br />

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            toast("👋 Logged Out Successfully!");
            navigate("/login");
          }}
        >
          Logout
        </button>

        <br />
        <br />

        <button onClick={handleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />{" "}
          Enable Notifications
        </label>

        <br />
        <br />

        <label>Language: </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>

        <br />
        <br />

       <button
         onClick={() => {
         alert("Button Working");
         toast("✅ Settings Saved Successfully!");
         }}
       >
          Save Settings
      </button>
      </div>
    </div>
  );
}

export default Settings;