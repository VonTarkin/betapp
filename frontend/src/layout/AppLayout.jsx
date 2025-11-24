import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <main className="app-content">{children}</main>
      <Footer />
    </div>
  );
}
