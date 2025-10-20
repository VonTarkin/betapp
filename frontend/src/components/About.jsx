import "./About.css";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-header">About BetApp</h2>

        <p className="about-intro">
          BetApp is a modern web application designed for sports enthusiasts who love prediction,
          competition, and strategy. Our mission is to bring excitement and analytical thinking
          together in one seamless experience.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Our Goal</h3>
            <p>
              To make sports predictions engaging, fair, and community-driven.
              BetApp provides both casual users and advanced players with the tools to track,
              compare, and improve their prediction accuracy.
            </p>
          </div>

          <div className="about-card">
            <h3>What We Offer</h3>
            <p>
              Real-time match data, detailed analytics, and a transparent betting system —
              all wrapped in an intuitive interface built with cutting-edge web technologies.
            </p>
          </div>

          <div className="about-card">
            <h3>Join the Community</h3>
            <p>
              Compete with your friends, climb the leaderboard, and prove your sports knowledge.
              Whether you’re a casual player or a statistic lover, BetApp has a place for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
