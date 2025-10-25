import { Link } from "react-router-dom";
import "./Navbar.css";
import { t } from "../i18n";

export default function Navbar() {
  return (
    <div className="navbar-section">
      <nav className="navbar">
        <Link to="/" className="nav-link-main">{t("navbar.brand")}</Link>

        <div className="nav-links">
          <Link to="/about" className="nav-link">{t("navbar.links.about")}</Link>
          <Link to="/faq" className="nav-link">{t("navbar.links.faq")}</Link>
        </div>

        <div className="nav-links">
          <Link to="/login" className="nav-link">{t("navbar.links.login")}</Link>
          <Link to="/register" className="nav-link">{t("navbar.links.register")}</Link>
        </div>
      </nav>
    </div>
  );
}
