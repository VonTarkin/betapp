import { useState, useMemo } from "react";
import "./Register.css";

const USERNAME_REGEX = /^(?=(?:.*[A-Za-z]){3,})[A-Za-z0-9_]{3,24}$/; // min 3 letters, only letters/numbers/_
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const COUNTRY_REGEX = /^\+\d{1,3}$/; // +48, +1, +420 etc.
const PHONE_REGEX = /^\d{5,12}$/; // only digits
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; // >=8 signs, at least 1 letter, 1 digit, 1 special sign.

export default function Register() {
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
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Account created successfully!");
      setUsername("");
      setEmail("");
      setCountryCode("+48");
      setPhone("");
      setPassword("");
      setRepeatPassword("");
    } else {
      const errorText = await response.text();
      alert(`Registration failed: ${errorText || response.status}`);
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Server error, please try again later.");
  }
};


  const invalidClass = (isValid, key) =>
    !isValid && touched[key] ? "input invalid" : "input";

  return (
    <section className="register-section">
      <div className="register-card">
        <h2 className="register-header">Create your account</h2>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="username">Account Name</label>
            <input
              id="username"
              type="text"
              className={invalidClass(validUsername, "username")}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              onFocus={() => setTouched((t) => ({ ...t, username: true }))}
              autoComplete="username"
            />
            {!validUsername && touched.username && (
              <div className="hint">
                Min. 3 Letters. Only Numbers, Characters and _ allowed.
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={invalidClass(validEmail, "email")}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onFocus={() => setTouched((t) => ({ ...t, email: true }))}
              autoComplete="email"
            />
            {!validEmail && touched.email && (
              <div className="hint">Please enter a valid e-mail address.</div>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone Number</label>
            <div className="two-cols">
              <div className="col small">
                <input
                  id="country"
                  type="text"
                  className={invalidClass(validCountry, "country")}
                  placeholder="+48"
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
                  placeholder="123456789"
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
              <div className="hint">Use format like +48 / +1 / +420.</div>
            )}

            {(!validPhone && touched.phone) && (
              <div className="hint">Digits only (5–12).</div>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={invalidClass(validPassword, "password")}
              placeholder="Min. 8 signs, at least 1 letter, 1 digit and 1 special signs."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              onFocus={() => setTouched((t) => ({ ...t, password: true }))}
              autoComplete="new-password"
            />
            {!validPassword && touched.password && (
              <div className="hint">
                Min. 8 signs, at least 1 letter, 1 digit and 1 special signs.
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              className={invalidClass(passwordsMatch, "repeat")}
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, repeat: true }))}
              onFocus={() => setTouched((t) => ({ ...t, repeat: true }))}
              autoComplete="new-password"
            />
            {repeatPassword.length > 0 && !passwordsMatch && touched.repeat && (
              <div className="hint">Passwords don’t match.</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              Create account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
