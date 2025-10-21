import "./Policy.css";

export default function RefundPolicy() {
  return (
    <section className="policy-section">
      <div className="policy-content">
        <h2 className="policy-header">Refund Policy</h2>

        <div className="policy-item">
          <h3>1. General Refund Conditions</h3>
          <p>
            BetApp offers refunds only in specific cases related to technical errors
            or accidental duplicate payments. Refunds are not available for completed bets
            or digital services already delivered.
          </p>
        </div>

        <div className="policy-item">
          <h3>2. Refund Requests</h3>
          <p>
            To request a refund, contact our support team at{" "}
            <strong>billing@betapp.com</strong> within 7 days of the transaction.
            Include your username, payment ID, and a brief explanation.
          </p>
        </div>

        <div className="policy-item">
          <h3>3. Processing Time</h3>
          <p>
            Refund requests are reviewed within 5–10 business days.
            Once approved, the amount will be returned to your original payment method.
          </p>
        </div>

        <div className="policy-item">
          <h3>4. Non-Refundable Situations</h3>
          <p>
            Refunds will not be issued for intentional misuse, violation of BetApp Terms of Service,
            or dissatisfaction with bet outcomes or predictions.
          </p>
        </div>

        <div className="policy-item">
          <h3>5. Contact</h3>
          <p>
            For more details, please email our finance department at{" "}
            <strong>refunds@betapp.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
