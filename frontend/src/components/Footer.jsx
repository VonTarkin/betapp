import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-content">
        <p className="copyright-text">© 2025 BetApp</p>
        <p className="policy-text">
          <a href="#" className="policy-link">Privacy Policy</a>
          <span className="separator">●</span>
          <a href="#" className="policy-link">Refund Policy</a>
        </p>
      </div>
    </footer>
  );
}
