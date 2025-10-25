import { useEffect, useState } from "react";
import "./Hero.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const slides = t("hero.slides");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic switching per 5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img
            src={`images/mainpage${index + 1}.jpg`}
            alt={`Slide ${index + 1}`}
          />
          <div className="hero-text">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
