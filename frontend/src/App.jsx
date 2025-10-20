import Navbar from "./components/navbar";
import AppLayout from "./layout/AppLayout";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Register  from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <AppLayout>
      <Navbar />
      <Hero />
      <FAQ />
      <About />
      <Register />
      <Footer />
      <Login />
    </AppLayout>
  );
}

