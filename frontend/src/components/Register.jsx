import { useState, useMemo } from "react";
import "./Register.css";
import Notification from "./Notification";
import { useTranslation } from "../i18n/LanguageContext";

const USERNAME_REGEX = /^(?=(?:.*[A-Za-z]){3,})[A-Za-z0-9_]{3,24}$/; // min 3 letters, only letters/numbers/_
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const COUNTRY_REGEX = /^\+\d{1,3}$/; // +48, +1, +420 etc.
const PHONE_REGEX = /^\d{5,12}$/; // only digits
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; // >=8 signs, at least 1 letter, 1 digit, 1 special sign.

export default function Register() {
  const { t, lang } = useTranslation();
  const [notif, setNotif] = useState({ message: "", type: "info", visible: false });

  const showNotification = (message, type = "info") => {
  setNotif({ message, type, visible: true });
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+48");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // tooltips shown only when touched
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    country: false,
    phone: false,
    password: false,
    repeat: false,
  });

  const validUsername = useMemo(() => USERNAME_REGEX.test(username), [username]);
  const validEmail = useMemo(() => EMAIL_REGEX.test(email), [email]);
  const validCountry = useMemo(() => COUNTRY_REGEX.test(countryCode.trim()), [countryCode]);
  const validPhone = useMemo(() => PHONE_REGEX.test(phone.trim()), [phone]);
  const validPassword = useMemo(() => PASSWORD_REGEX.test(password), [password]);
  const passwordsMatch = useMemo(() => repeatPassword.length === 0 ? true : password === repeatPassword, [password, repeatPassword]);

  const canSubmit = validUsername && validEmail && validCountry && validPhone && validPassword && passwordsMatch;

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!canSubmit) return;

  const payload = {
    username,
    email,
    phone: `${countryCode}${phone}`,
    password,
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      showNotification(t("register.notifications.success"), "success");
      setUsername("");
      setEmail("");
      setCountryCode("+48");
      setPhone("");
      setPassword("");
      setRepeatPassword("");
    } else {
      const errorText = await response.text();
      showNotification(
      t("register.notifications.failed").replace("{0}", errorText || response.status),
      "error");
    }
  } catch (err) {
    console.error("Registration error:", err);
    showNotification(t("general.serverUnreachable"), "error");
  }
};


  const invalidClass = (isValid, key) =>
    !isValid && touched[key] ? "input invalid" : "input";

  return (
    <section className="register-section">
      <div className="register-card">
        <h2 className="register-header">{t("register.button")}</h2>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="username">{t("register.fields.username.label")}</label>
            <input
              id="username"
              type="text"
              className={invalidClass(validUsername, "username")}
              placeholder={t("register.fields.username.placeholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              onFocus={() => setTouched((t) => ({ ...t, username: true }))}
              autoComplete="username"
            />
            {!validUsername && touched.username && (
              <div className="hint">
                {t("register.fields.username.hint")}
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="email">{t("register.fields.email.label")}</label>
            <input
              id="email"
              type="email"
              className={invalidClass(validEmail, "email")}
              placeholder={t("register.fields.email.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onFocus={() => setTouched((t) => ({ ...t, email: true }))}
              autoComplete="email"
            />
            {!validEmail && touched.email && (
              <div className="hint">{t("register.fields.email.hint")}</div>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="phone">{t("register.fields.phone.label")}</label>
            <div className="two-cols">
              <div className="col small">
                <input
                  id="country"
                  type="text"
                  className={invalidClass(validCountry, "country")}
                  placeholder={t("register.fields.phone.countryPlaceholder")}
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, country: true }))}
                  onFocus={() => setTouched((t) => ({ ...t, country: true }))}
                />
              </div>

              <div className="col">
                <input
                  id="phone"
                  type="tel"
                  className={invalidClass(validPhone, "phone")}
                  placeholder={t("register.fields.phone.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    setPhone(onlyDigits);
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  onFocus={() => setTouched((t) => ({ ...t, phone: true }))}
                  autoComplete="tel"
                />
              </div>
            </div>

            {(!validCountry && touched.country) && (
              <div className="hint">{t("register.fields.phone.hintCountry")}</div>
            )}

            {(!validPhone && touched.phone) && (
              <div className="hint">{t("register.fields.phone.hintPhone")}</div>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="password">{t("register.fields.password.label")}</label>
            <input
              id="password"
              type="password"
              className={invalidClass(validPassword, "password")}
              placeholder={t("register.fields.password.placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              onFocus={() => setTouched((t) => ({ ...t, password: true }))}
              autoComplete="new-password"
            />
            {!validPassword && touched.password && (
              <div className="hint">
                {t("register.fields.password.hint")}
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="repeatPassword">{t("register.fields.repeatPassword.label")}</label>
            <input
              id="repeatPassword"
              type="password"
              className={invalidClass(passwordsMatch, "repeat")}
              placeholder={t("register.fields.repeatPassword.placeholder")}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, repeat: true }))}
              onFocus={() => setTouched((t) => ({ ...t, repeat: true }))}
              autoComplete="new-password"
            />
            {repeatPassword.length > 0 && !passwordsMatch && touched.repeat && (
              <div className="hint">{t("register.fields.repeatPassword.hint")}</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              {t("register.button")}
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
