import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { t } from "../i18n/i18n";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
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
          <Link to="/login" className="nav-link">
            {t("navbar.links.login")}
          </Link>
          <Link to="/register" className="nav-link">
            {t("navbar.links.register")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
