import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-content">
        <p className="copyright-text">© 2025 BetApp</p>
        <p className="policy-text">
          <Link to="/privacypolicy" className="policy-link">Privacy Policy</Link>
          <span className="separator">●</span>
          <Link to="/refundpolicy" className="policy-link">Refund Policy</Link>
        </p>
      </div>
    </footer>
  );
}
