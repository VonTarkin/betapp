import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../i18n/LanguageContext";
import Notification from "./Notification";
import "./MatchBetMenu.css";

export default function MatchBetMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currency, setCurrency] = useState("PLN");
  const [stake, setStake] = useState("");

  const [betType, setBetType] = useState("HOME_WIN");

  const [notif, setNotif] = useState({ message: "", type: "info", visible: false });

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
            if (errorData?.message) errorMessage = errorData.message;
          } catch (_) {}
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

  const formattedDate = match?.matchDate
    ? new Date(match.matchDate).toLocaleString(lang === "pl" ? "pl-PL" : "en-GB")
    : "-";

   const baseOdds = match?.odds != null ? Number(match.odds) : null;

  const homeOdds = baseOdds && baseOdds > 0 ? baseOdds : null;
  const awayOdds = baseOdds && baseOdds > 0 ? 1 / baseOdds : null;
  const drawOdds =
    homeOdds != null && awayOdds != null ? (homeOdds + awayOdds) / 2 : null;

  const selectedOdds =
    betType === "HOME_WIN"
      ? homeOdds
      : betType === "AWAY_WIN"
      ? awayOdds
      : betType === "DRAW"
      ? drawOdds
      : null;
 

  const stakeNumber = Number(stake);
  const canSubmit =
    match &&
    stake.trim() !== "" &&
    !Number.isNaN(stakeNumber) &&
    stakeNumber > 0 &&
    (currency === "PLN" || currency === "EUR") &&
    (betType === "HOME_WIN" || betType === "DRAW" || betType === "AWAY_WIN");

  const betTypeLabel = (type) => {
    if (!match) return type;
    switch (type) {
      case "HOME_WIN":
        return `${match.country1} ${t("matchBetMenu.win") || "win"}`;
      case "DRAW":
        return t("matchBetMenu.draw") || "Draw";
      case "AWAY_WIN":
        return `${match.country2} ${t("matchBetMenu.win") || "win"}`;
      default:
        return type;
    }
  };

  const handlePlaceBet = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      showNotification(t("matchBetMenu.fillCorrectly") || "Fill the form correctly", "warning");
      return;
    }

    const payload = {
      matchId: Number(id),
      betType,
      stake: stakeNumber,
      currency,
      // odds: TBD
    };

    console.log("PLACE BET payload:", payload);

    showNotification(t("matchBetMenu.betPlacedMock") || "Bet placed (mock)!", "success");
  };

  if (loading) {
    return <p>{t("incomingMatches.loading")}</p>;
  }

  if (!match) {
    return (
      <section className="match-bet-page">
        <Notification
          message={notif.message}
          type={notif.type}
          visible={notif.visible}
          onClose={handleNotificationClose}
        />
        <div className="match-bet-wrapper">
          <h2 className="match-bet-header">{t("matchDetails.notFound") || "Match not found"}</h2>
          <button className="bet-back-button" onClick={() => navigate(-1)}>
            {t("matchDetails.back") || "Back"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="match-bet-page">
      <Notification
        message={notif.message}
        type={notif.type}
        visible={notif.visible}
        onClose={handleNotificationClose}
      />

      <div className="match-bet-wrapper">
        <h2 className="match-bet-header">{t("matchBetMenu.title") || "Place a bet"}</h2>

        <div className="match-bet-card">
          <div className="bet-match-summary">
            <div className="bet-teams">
              <span className="bet-team">{match.country1}</span>
              <span className="bet-vs">vs</span>
              <span className="bet-team">{match.country2}</span>
            </div>

            <div className="bet-date-row">
              <span className="bet-label">{t("matchDetails.date") || "Match date"}:</span>
              <span className="bet-value">{formattedDate}</span>
            </div>
          </div>

          <form className="bet-form" onSubmit={handlePlaceBet}>
            <div className="bet-row">
              <label className="bet-label" htmlFor="betType">
                {t("matchBetMenu.betType") || "Bet type"}:
              </label>

              <select
                id="betType"
                className="bet-input"
                value={betType}
                onChange={(e) => setBetType(e.target.value)}
              >
                <option value="HOME_WIN">{betTypeLabel("HOME_WIN")}</option>
                <option value="DRAW">{betTypeLabel("DRAW")}</option>
                <option value="AWAY_WIN">{betTypeLabel("AWAY_WIN")}</option>
              </select>
            </div>

            <div className="bet-row">
              <label className="bet-label" htmlFor="currency">
                {t("matchBetMenu.currency") || "Currency"}:
              </label>

              <select
                id="currency"
                className="bet-input"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="bet-row">
              <label className="bet-label" htmlFor="stake">
                {t("matchBetMenu.stake") || "Stake"}:
              </label>

              <input
                id="stake"
                className="bet-input"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder={t("matchBetMenu.stakePlaceholder") || "Enter amount"}
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
            </div>

            <div className="bet-odds-hint">
              {(t("matchBetMenu.odds") || "Odds") + ": "}
              <strong>
                {selectedOdds != null ? selectedOdds.toFixed(2) : "-"}
             </strong>
            </div>


            <div className="bet-actions">
              <button type="button" className="bet-back-button" onClick={() => navigate(-1)}>
                {t("matchDetails.back") || "Back"}
              </button>

              <button type="submit" className="bet-submit-button" disabled={!canSubmit}>
                {t("matchDetails.placeABet") || "Place a Bet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
