import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/LanguageContext";
import Notification from "./Notification";
import "./MatchDetails.css";

export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notif, setNotif] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const showNotification = (message, type = "info") => {
    setNotif({ message, type, visible: true });
  };

  const handleNotificationClose = () => {
    setNotif((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/matches/${id}`, {
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

        const data = await response.json();
        setMatch(data);
      } catch (err) {
        showNotification(t("general.serverUnreachable"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id, lang, t]);

  if (loading) {
    return <p>{t("incomingMatches.loading")}</p>;
  }

  if (!match) {
    return (
      <section className="match-details-page">
        <Notification
          message={notif.message}
          type={notif.type}
          visible={notif.visible}
          onClose={handleNotificationClose}
        />
        <div className="match-details-wrapper">
          <h2 className="match-details-header">
            {t("matchDetails.notFound") || "Match not found"}
          </h2>
          <button className="back-button" onClick={() => navigate(-1)}>
            {t("matchDetails.back") || "Back"}
          </button>
        </div>
      </section>
    );
  }

  const formattedDate = match.matchDate
    ? new Date(match.matchDate).toLocaleString(
        lang === "pl" ? "pl-PL" : "en-GB"
      )
    : "-";

  return (
    <section className="match-details-page">
      <Notification
        message={notif.message}
        type={notif.type}
        visible={notif.visible}
        onClose={handleNotificationClose}
      />

      <div className="match-details-wrapper">
        <h2 className="match-details-header">
          {t("matchDetails.title") || "Match details"}
        </h2>

        <div className="match-details-card">
          <div className="teams-row">
            <div className="team-block">
              <img
                src="/images/question_mark.png"
                alt={`${match.country1} flag`}
                className="team-flag"
              />
              <span className="team-name">{match.country1}</span>
            </div>

            <div className="score-block">
              <span className="score">
                {match.scoreCountry1 != null ? match.scoreCountry1 : "-"}
              </span>
              <span className="score-separator">:</span>
              <span className="score">
                {match.scoreCountry2 != null ? match.scoreCountry2 : "-"}
              </span>
            </div>

            <div className="team-block">
              <span className="team-name">{match.country2}</span>
              <img
                src="/images/question_mark.png"
                alt={`${match.country2} flag`}
                className="team-flag"
              />
            </div>
          </div>

          <div className="match-meta">
            <div className="meta-row">
              <span className="meta-label">
                {t("matchDetails.date") || "Match date"}:
              </span>
              <span className="meta-value">{formattedDate}</span>
            </div>
          </div>

          <div className="meta-row">
            <span className="meta-label">
              {t("matchDetails.odds") || "Odds"}:
            </span>
              <span className="meta-value">
              {match.odds != null ? match.odds : "-"}
            </span>
          </div>


          <div className="match-actions">
            <button
            className="action-button"
            onClick={() => navigate(`/matches/${id}/bet`)}
            >
              {t("matchDetails.placeABet") || "Place a Bet"}
              </button>

            <button className="action-button" onClick={() => navigate(-1)}>
              {t("matchDetails.back") || "Back"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
