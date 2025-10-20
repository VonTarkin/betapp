import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-section">
      <nav className="navbar">
        <a href="#" className="nav-link-main">BetApp</a>

        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">FAQ</a>
        </div>

        <div className="nav-buttons">
          <button className="nav-button">Login</button>
          <button className="nav-button">Register</button>
        </div>
      </nav>
    </div>
  );
}
