import "./FAQ.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <section className="faq-section">
      <div className="faq-content">
        <h2 className="faq-header">{t("faq.title")}</h2>

        <div className="faq-item">
          <h3>{t("faq.question1.title")}</h3>
          <p>
            {t("faq.question1.text")}
          </p>
        </div>

        <div className="faq-item">
          <h3>{t("faq.question2.title")}</h3>
          <p>
            {t("faq.question2.text")}
          </p>
        </div>

        <div className="faq-item">
          <h3>{t("faq.question3.title")}</h3>
          <p>
            {t("faq.question3.text")}
          </p>
        </div>

        <div className="faq-item">
          <h3>{t("faq.question4.title")}</h3>
          <p>
            {t("faq.question4.text")}
          </p>
        </div>
      </div>
    </section>
  );
}
