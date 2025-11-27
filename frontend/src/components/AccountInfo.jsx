import "./AccountInfo.css";
import { useTranslation } from "../i18n/LanguageContext";

export default function AccountInfo({ accountName, email, creationDate }) {
  const { t } = useTranslation();

  return (
    <section className="account-section">
      <div className="account-content">
        <h2 className="account-header">{t("account.title")}</h2>

        <div className="account-grid">

          <div className="account-card">
            <h3>{t("account.name")}</h3>
            <p>{accountName}</p>
          </div>

          <div className="account-card">
            <h3>{t("account.email")}</h3>
            <p>{email}</p>
          </div>

          <div className="account-card">
            <h3>{t("account.creationDate")}</h3>
            <p>{creationDate}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
