import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-section">
      <nav className="navbar">
        <Link to="/" className="nav-link-main">BetApp</Link>

        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </div>

        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>
    </div>
  );
}
