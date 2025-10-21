import "./Policy.css";

export default function PrivacyPolicy() {
  return (
    <section className="policy-section">
      <div className="policy-content">
        <h2 className="policy-header">Privacy Policy</h2>

        <div className="policy-item">
          <h3>1. Information We Collect</h3>
          <p>
            BetApp collects basic personal information such as your username, email address,
            and activity data. This helps us improve user experience and maintain account security.
          </p>
        </div>

        <div className="policy-item">
          <h3>2. How We Use Your Data</h3>
          <p>
            Your information is used to personalize your experience, provide secure authentication,
            and enhance platform functionality. We do not sell or rent your personal data to third parties.
          </p>
        </div>

        <div className="policy-item">
          <h3>3. Data Protection</h3>
          <p>
            All sensitive information is encrypted and securely stored. Our team follows strict data protection
            procedures to prevent unauthorized access, modification, or disclosure.
          </p>
        </div>

        <div className="policy-item">
          <h3>4. Cookies</h3>
          <p>
            We use cookies to analyze traffic, remember preferences, and optimize performance.
            You can disable cookies in your browser settings at any time.
          </p>
        </div>

        <div className="policy-item">
          <h3>5. Contact</h3>
          <p>
            If you have any questions about this policy, please reach out to us at{" "}
            <strong>privacy@betapp.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
