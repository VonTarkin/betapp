import React, { useEffect, useState } from "react";
import "./MatchList.css";
import { useTranslation } from "../i18n/LanguageContext";
import Notification from "./Notification";

export default function MatchList() {
  const { t, lang } = useTranslation();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [notif, setNotif] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const showNotification = (message, type = "info") => {
    setNotif({ message, type, visible: true });
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/matches", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        });

        if (!response.ok) {
          let errorMessage = t("general.unexpectedServerError");

          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (_) {
          }

          showNotification(errorMessage, "error");
          setLoading(false);
          return;
        }

        let data = await response.json();
        data.sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

        setMatches(data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        showNotification(t("general.serverUnreachable"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [lang, t]);

  if (loading) {
    return <p>{t("incomingMatches.loading")}</p>;
  }

  return (
  <section className="match-list-section">
    <div className="match-list-wrapper">
      <h2 className="match-list-header">{t("incomingMatches.title")}</h2>

      <ul className="match-list">
        {matches.map((match, index) => (
          <li key={index} className="match-item">
            <div className="match-details">
              <img
                src="images/question_mark.png"
                alt={`${match.country1} flag`}
              />
              <span>{match.country1}</span>

              <span>-</span>

              <span>{match.country2}</span>
              <img
                src="images/question_mark.png"
                alt={`${match.country2} flag`}
              />
            </div>

            <a
              className="match-info"
              href={`/matches/${match.id}`}
            >
              {t("incomingMatches.matchdetails")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

}
