import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { t } from "../i18n/i18n";
import { useLanguage } from "../i18n/LanguageContext";

//Decode token to see the role later, is this good? Idk lol, my iq is in the low 20s
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function Navbar({ isAuthenticated, onLogout }) {
  const token = localStorage.getItem("authToken");
  const decoded = token ? decodeToken(token) : null;
  const role = decoded?.role || null; 

  const { lang, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleLangChange = (newLang) => {
    changeLanguage(newLang);
    setTimeout(() => setOpen(false), 100);
    };


  return (
    <div className="navbar-section">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link-main">
            {t("navbar.brand")}
          </Link>
          <Link to="/about" className="nav-link">
            {t("navbar.links.about")}
          </Link>
          <Link to="/faq" className="nav-link">
            {t("navbar.links.faq")}
          </Link>
        </div>

        <div className="lang-dropdown">
          <div
            className="nav-link lang-current"
            onClick={() => setOpen((prev) => !prev)}
          >
            {lang.toUpperCase()}
          </div>

          {open && (
            <ul className="lang-menu">
              <li onClick={() => handleLangChange("pl")}>PL</li>
              <li onClick={() => handleLangChange("en")}>EN</li>
            </ul>
          )}
        </div>

        <div className="nav-links">
          {isAuthenticated ? (
            <>
            {role === "ROLE_ADMIN" && (
              <Link to="/CreateMatch" className="nav-link">
              {t("navbar.links.creatematch")}
              </Link>
            )}
            <span
              className="nav-link"
              onClick={onLogout}
            >
              {t("navbar.links.logout")}
            </span>
            <Link to="/account" className="nav-link">
                {t("navbar.links.account")}
            </Link>
            </>
            
          ) : (
            <>
              <Link to="/login" className="nav-link">
                {t("navbar.links.login")}
              </Link>
              <Link to="/register" className="nav-link">
                {t("navbar.links.register")}
              </Link>
            </>
          )}
        </div>

      </nav>
    </div>
  );
}
