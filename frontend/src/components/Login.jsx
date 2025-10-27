import { useState } from "react";
import "./Login.css";
import Notification from "./Notification";
import { useTranslation } from "../i18n/LanguageContext";

export default function Login() {
  const { t, lang } = useTranslation();
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
        headers: { "Content-Type": "application/json",
          "Accept-Language": lang
         },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const message = await response.text();
        showNotification(message || t("login.loginSuccess"), "success");
      } else if (response.status === 401) {
        const message = await response.text();
        showNotification(message, "error");
      } else {
        showNotification(t("general.unexpectedServerError"), "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      showNotification(t("general.serverUnreachable"), "error");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <h2 className="login-header">{t("login.title")}</h2>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="email">{t("login.email")}</label>
            <input
              id="email"
              type="email"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">{t("login.password")}</label>
            <input
              id="password"
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              {t("login.login")}
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
