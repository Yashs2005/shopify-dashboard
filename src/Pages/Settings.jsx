import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Settings({ darkMode,setDarkMode }) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");

  const navigate = useNavigate();

  useEffect(() => {
  const savedName =
    localStorage.getItem("adminName");

  const savedEmail =
    localStorage.getItem("adminEmail");

  const savedNotifications =
    localStorage.getItem("notifications");

  const savedLanguage =
    localStorage.getItem("language");

  const savedDarkMode =
    localStorage.getItem("darkMode");

  if (savedName) {
    setName(savedName);
  }

  if (savedEmail) {
    setEmail(savedEmail);
  }

  if (savedNotifications !== null) {
    setNotifications(
      savedNotifications === "true"
    );
  }

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }

  if (savedDarkMode !== null) {
    setDarkMode(
      savedDarkMode === "true"
    );
    }
    }, []);

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

<button
  onClick={() => {
    const newPassword = prompt(
      "Enter New Password:"
    );

    if (newPassword && newPassword.length >= 4) {
      localStorage.setItem(
        "adminPassword",
        newPassword
      );

      toast("✅ Password Changed Successfully!");
    } else if (newPassword) {
      toast("❌ Password must be at least 4 characters!");
    }
  }}
>
  Change Password
</button>

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
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem(
      "notifications",
      notifications
    );
    localStorage.setItem("language", language);
    localStorage.setItem("darkMode", darkMode);

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