import React from "react";
import "./MatchList.css";
import { t } from "../i18n";

//Todo, we will be fetching that from B.E.
export default function MatchList() {
  const matches = [
    { id: 1, teamA: "Country 1", teamB: "Country 2" },
    { id: 2, teamA: "Country 3", teamB: "Country 4" },
    { id: 3, teamA: "Country 5", teamB: "Country 6" },
    { id: 4, teamA: "Country 7", teamB: "Country 8" },
  ];

  return (
    <div className="match-list-wrapper">
      <h2 className="match-list-header">{t("incomingMatches.title")}</h2>
      <ul className="match-list">
        {matches.map((match) => (
          <li key={match.id} className="match-item">
            <div className="match-details">
              <img src="images/question_mark.png" alt={`${match.teamA} flag`} />
              <span>{match.teamA}</span>
              <span>-</span>
              <span>{match.teamB}</span>
              <img src="images/question_mark.png" alt={`${match.teamB} flag`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
