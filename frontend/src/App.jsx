import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";
import { useNavigate } from "react-router-dom";
import CreateMatchPage from "./pages/CreateMatchPage";
import MatchesPage from "./pages/MatchesPage";
import MatchBetPage from "./pages/MatchBetPage";

export default function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/matches/:id/bet" element={<MatchBetPage/>} />
        <Route path="/matches/:id" element={<MatchesPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/CreateMatch" element={<CreateMatchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route path="/refundpolicy" element={<RefundPolicyPage />} />
      </Routes>
    </>
  );
}
