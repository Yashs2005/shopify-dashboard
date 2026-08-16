import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Settings({ darkMode, setDarkMode }) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("Yash");
  const [email, setEmail] = useState("admin@gmail.com");

  // Forget Email / Password screen
  const [showForgetAccount, setShowForgetAccount] =
    useState(false);

  const [forgetName, setForgetName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // =========================
  // LOAD SETTINGS
  // =========================

  useEffect(() => {
    const savedName =
      localStorage.getItem("adminName") || "Yash";

    const savedEmail =
      localStorage.getItem("adminEmail");

    const savedNotifications =
      localStorage.getItem("notifications");

    const savedLanguage =
      localStorage.getItem("language");

    const savedDarkMode =
      localStorage.getItem("darkMode");

    setName(savedName);

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
  }, [setDarkMode]);

  // =========================
  // DARK MODE
  // =========================

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

  // =========================
  // FORGET EMAIL / PASSWORD
  // =========================

  function handleForgetAccount() {
    setForgetName("");
    setNewEmail("");
    setNewPassword("");

    setShowForgetAccount(true);
  }

  // =========================
  // CHANGE EMAIL / PASSWORD
  // =========================

  function handleAccountChange() {
    const savedName =
      localStorage.getItem("adminName") || "Yash";

    // Admin Name required
    if (!forgetName.trim()) {
      toast.error(
        "❌ Please enter Admin Name!"
      );
      return;
    }

    // Check Admin Name
    if (
      forgetName.trim().toLowerCase() !==
      savedName.trim().toLowerCase()
    ) {
      toast.error(
        "❌ Admin name does not match!"
      );
      return;
    }

    // Both Email and Password empty
    if (
      !newEmail.trim() &&
      !newPassword.trim()
    ) {
      toast.error(
        "❌ Please enter Email or Password!"
      );
      return;
    }

    // =========================
    // EMAIL CHANGE
    // =========================

    if (newEmail.trim()) {
      localStorage.setItem(
        "adminEmail",
        newEmail.trim()
      );

      setEmail(newEmail.trim());
    }

    // =========================
    // PASSWORD CHANGE
    // =========================

    if (newPassword.trim()) {
      if (newPassword.length < 4) {
        toast.error(
          "❌ Password must be at least 4 characters!"
        );
        return;
      }

      localStorage.setItem(
        "adminPassword",
        newPassword
      );
    }

    // Success
    toast.success(
      "✅ Account Details Changed Successfully!"
    );

    // Clear fields
    setForgetName("");
    setNewEmail("");
    setNewPassword("");

    // Back to Settings
    setShowForgetAccount(false);
  }

  // =========================
  // CANCEL
  // =========================

  function handleCancelForget() {
    setForgetName("");
    setNewEmail("");
    setNewPassword("");

    // No changes saved
    // Back to Settings
    setShowForgetAccount(false);
  }

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    localStorage.removeItem(
      "isLoggedIn"
    );

    toast(
      "👋 Logged Out Successfully!"
    );

    navigate("/login");
  }

  // =========================
  // FORGET ACCOUNT SCREEN
  // =========================

  if (showForgetAccount) {
    return (
      <div className="page">
        <h1>Forget Email / Password</h1>

        <div className="card">
          <h3>Change Account Details</h3>

          <p>
            Enter your Admin Name and change
            Email or Password.
          </p>

          {/* ADMIN NAME */}

          <label>Admin Name</label>

          <input
            type="text"
            placeholder="Enter Admin Name"
            value={forgetName}
            onChange={(e) =>
              setForgetName(e.target.value)
            }
            style={{
              padding: "8px",
              marginTop: "10px",
              marginBottom: "15px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          {/* NEW EMAIL */}

          <label>New Email</label>

          <input
            type="email"
            placeholder="Enter New Email"
            value={newEmail}
            onChange={(e) =>
              setNewEmail(e.target.value)
            }
            style={{
              padding: "8px",
              marginTop: "10px",
              marginBottom: "15px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          {/* NEW PASSWORD */}

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{
              padding: "8px",
              marginTop: "10px",
              marginBottom: "20px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          {/* CHANGE */}

          <button onClick={handleAccountChange}>
            Change
          </button>

          {/* CANCEL */}

          <button
            onClick={handleCancelForget}
            style={{
              marginLeft: "10px",
              background: "#777",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // NORMAL SETTINGS SCREEN
  // =========================

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
          onChange={(e) =>
            setName(e.target.value)
          }
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
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            padding: "8px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />

        {/* FORGET EMAIL / PASSWORD */}

        <button
          onClick={handleForgetAccount}
          style={{
            background: "#555",
          }}
        >
          Forget Email / Password
        </button>

        <br />
        <br />

        {/* LOGOUT */}

        <button onClick={handleLogout}>
          Logout
        </button>

        <br />
        <br />

        {/* DARK MODE */}

        <button onClick={handleDarkMode}>
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <br />
        <br />

        {/* NOTIFICATIONS */}

        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(
                !notifications
              )
            }
          />{" "}
          Enable Notifications
        </label>

        <br />
        <br />

        {/* LANGUAGE */}

        <label>Language: </label>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

        <br />
        <br />

        {/* SAVE SETTINGS */}

        <button
          onClick={() => {
            localStorage.setItem(
              "adminName",
              name
            );

            localStorage.setItem(
              "adminEmail",
              email
            );

            localStorage.setItem(
              "notifications",
              notifications
            );

            localStorage.setItem(
              "language",
              language
            );

            localStorage.setItem(
              "darkMode",
              darkMode
            );

            toast.success(
              "✅ Settings Saved Successfully!"
            );
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;