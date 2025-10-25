import "./Footer.css";
import { Link } from "react-router-dom";
import { t } from "../i18n";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-content">
        <p className="copyright-text">{t("footer.copyright")}</p>
        <p className="policy-text">
          <Link to="/privacypolicy" className="policy-link">{t("footer.privacyPolicy")}</Link>
          <span className="separator">●</span>
          <Link to="/refundpolicy" className="policy-link">{t("footer.refundPolicy")}</Link>
        </p>
      </div>
    </footer>
  );
}
