import "./About.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-header">{t("about.title")}</h2>

        <p className="about-intro">
          {t("about.intro")}
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>{t("about.goal.title")}</h3>
            <p>
              {t("about.goal.text")}
            </p>
          </div>

          <div className="about-card">
            <h3>{t("about.offer.title")}</h3>
            <p>
              {t("about.offer.text")}
            </p>
          </div>

          <div className="about-card">
            <h3>{t("about.community.title")}</h3>
            <p>
              {t("about.community.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
