import { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const slides = [
    {
      image: "images/mainpage1.jpeg",
      title: "Bet on your passion",
      text: "Join the game and feel the thrill of victory",
    },
    {
      image: "images/mainpage2.jpg",
      title: "Play smart",
      text: "Analyze, predict, and win big with BetApp",
    },
    {
      image: "images/mainpage3.jpg",
      title: "Stay ahead",
      text: "Follow live results and make the right move",
    },
  ];

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
          <img src={slide.image} alt={`Slide ${index + 1}`} />
          <div className="hero-text">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
