import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim() !== "" && password.trim() !== "";

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
        alert(message || "Logged in successfully!");
      } else if (response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Unexpected server error");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server unreachable. Try again later.");
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
    </section>
  );
}
