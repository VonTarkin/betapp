import "./FAQ.css";

export default function FAQ() {
  return (
    <section className="faq-section">
      <div className="faq-content">
        <h2 className="faq-header">Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>What is BetApp?</h3>
          <p>
            BetApp is a modern betting platform that allows users to predict match outcomes,
            manage their wagers, and compete with friends in a safe and engaging environment.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is BetApp free to use?</h3>
          <p>
            Absolutely. You can register, browse matches, and participate in public games for free.
            Some advanced analytics or tournaments may require an upgraded account in the future.
          </p>
        </div>

        <div className="faq-item">
          <h3>How can I reset my password?</h3>
          <p>
            Simply go to the login page and click on <em>“Forgot Password?”</em>.
            You’ll receive an email with instructions to securely reset it.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I contact support?</h3>
          <p>
            Yes! Our support team is available 24/7.
            Just visit the <em>Contact</em> section or email us at <strong>support@betapp.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
