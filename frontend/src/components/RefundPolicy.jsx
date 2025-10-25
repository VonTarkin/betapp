import "./Policy.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function RefundPolicy() {
  const { t } = useTranslation();
  return (
    <section className="policy-section">
      <div className="policy-content">
        <h2 className="policy-header">{t("refundPolicy.header")}</h2>

        <div className="policy-item">
          <h3>{t("refundPolicy.items.1.title")}</h3>
          <p>
            {t("refundPolicy.items.1.text")}
          </p>
        </div>

        <div className="policy-item">
          <h3>{t("refundPolicy.items.2.title")}</h3>
          <p>
            {t("refundPolicy.items.2.text")}
          </p>
        </div>

        <div className="policy-item">
          <h3>{t("refundPolicy.items.3.title")}</h3>
          <p>
            {t("refundPolicy.items.3.text")}
          </p>
        </div>

        <div className="policy-item">
          <h3>{t("refundPolicy.items.4.title")}</h3>
          <p>
            {t("refundPolicy.items.4.text")}
          </p>
        </div>

        <div className="policy-item">
          <h3>{t("refundPolicy.items.5.title")}</h3>
          <p>
            {t("refundPolicy.items.5.text")}
          </p>
        </div>
      </div>
    </section>
  );
}
