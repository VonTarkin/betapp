import { useState } from "react";
import "./Login.css";
import Notification from "./Notification";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  const [notif, setNotif] = useState({ message: "", type: "info", visible: false });

  const showNotification = (message, type = "info") => {
  setNotif({ message, type, visible: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = { email, password };

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const message = await response.text();
        showNotification(message || "Logged in successfully!", "success");
      } else if (response.status === 401) {
        showNotification("Invalid email or password", "error");
      } else {
        showNotification("Unexpected server error", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      showNotification("Server unreachable. Try again later.", "error");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <h2 className="login-header">Welcome back</h2>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              Log in
            </button>
          </div>
        </form>
      </div>      
        {notif.visible && (
        <Notification
          message={notif.message}
          type={notif.type}
          visible={notif.visible}
          onClose={() => setNotif({ ...notif, visible: false })}
        />
)}
    </section>
  );
}
